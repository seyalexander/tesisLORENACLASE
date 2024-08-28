import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Clase2Model } from '../../../../../../domain/models/clase2/clase2.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../../infraestructure/driven-adapter/login/auth.service';
import { Clase2Service } from '../../../../../../infraestructure/driven-adapter/clase2/clase2.service';
import { clase2respuestaModel } from '../../../../../../domain/models/clase2/clase2respuesta.model';
import { alumnoModel } from '../../../../../../domain/models/alumno/alumno.model';

@Component({
  selector: 'app-listar-clase2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-clase2.component.html',
  styleUrl: './listar-clase2.component.css'
})
export class ListarClase2Component {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  loggedInUser = {
    username: 'Almendra',
    avatar: 'https://img.freepik.com/foto-gratis/personaje-dibujos-animados-3d_23-2151021951.jpg?w=740&t=st=1721970629~exp=1721971229~hmac=34636ad2e1c093c5ea2e4f8d607497a9a38ac1da229a7d21359135735b3eda43'
  };

  datosAudioslista: Clase2Model[] = [];
  audioSource: string | undefined;
  opcionesMezcladas: string[] = [];
  mostrarModal: boolean = false;
  respuestaSeleccionada: string = '';
  correcta: string = '';

  private audiosSubscription: Subscription | undefined;

  constructor(
    private _getAudiosUseCase: Clase2Service,
    private router: Router,
    private _login: AuthService
  ) {}

  ngOnInit(): void {
    this.listarAudios();
  }

  ngAfterViewInit(): void {
    // Asegúrate de que el audio se cargue después de la vista esté inicializada
    if (this.audioSource) {
      this.reproducirAudio();
    }
  }

  listarAudios() {
    this.audiosSubscription = this._getAudiosUseCase.getAllClase2().subscribe((response: Clase2Model[]) => {
      this.datosAudioslista = response;
      if (this.datosAudioslista.length > 0) {
        const item = this.datosAudioslista[this.datosAudioslista.length - 1];
        this.audioSource = this.formatDropboxUrl(item.audio);
        this.mezclarOpciones(item);
        this.reproducirAudio();
        console.log(this.audioSource);

      }
    });
  }

  mezclarOpciones(item: Clase2Model) {
    const opciones = [item.opcion1, item.opcion2, item.opcion3, item.opcion4];
    this.opcionesMezcladas = this.shuffleArray(opciones);
    this.correcta = item.correcta; // Guardar la respuesta correcta
  }

  shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  formatDropboxUrl(url: string): string {
    return url.replace('dl=0', 'dl=1');
  }

  reproducirAudio(): void {
    const audioElement = this.audioPlayer.nativeElement;
    if (this.audioSource) {
      audioElement.src = this.audioSource;
      audioElement.load();
      audioElement.play();
    }
  }

  verificarRespuesta(opcionSeleccionada: string): void {
    this.respuestaSeleccionada = opcionSeleccionada;
    const respuesta = opcionSeleccionada === this.correcta ? 'correcta' : 'incorrecta';

    // Aquí llamas a la función para guardar la respuesta
    this.saveRespuesta(respuesta);

    // Mostrar modal de respuesta enviada
    this.mostrarModal = true;
  }

  saveRespuesta(respuesta: string): void {
    const respuestaModel = new clase2respuestaModel();
    respuestaModel.idclaserespuestasctividad1 = 1; // O el ID correcto
    respuestaModel.respuesta = respuesta;
    respuestaModel.idalumnofk = {} as alumnoModel; // O el alumno correcto

    // Suponiendo que tienes un servicio para enviar la respuesta
    this._getAudiosUseCase.saveClase2(respuestaModel).subscribe(() => {
      // Redirigir a otra página o realizar cualquier otra acción después de guardar
      this.volverOpcionesClase();
    });
  }

  volverOpcionesClase(): void {
    this.router.navigateByUrl('/home/opcionesClase');
  }
}
