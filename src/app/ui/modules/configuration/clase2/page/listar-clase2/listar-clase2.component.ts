import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Clase2Model } from '../../../../../../domain/models/clase2/clase2.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../../infraestructure/driven-adapter/login/auth.service';
import { Clase2Service } from '../../../../../../infraestructure/driven-adapter/clase2/clase2.service';

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

  private audiosSubscription: Subscription | undefined;

  constructor(
    private _getAudiosUseCase: Clase2Service,
    private router: Router,
    private _login: AuthService
  ) {}

  ngOnInit(): void {
    this.listarAudios();
  }

  listarAudios() {
    this.audiosSubscription = this._getAudiosUseCase.getAllClase2().subscribe((response: Clase2Model[]) => {
      this.datosAudioslista = response;
      console.log(this.datosAudioslista);
    });
  }

  reproducirAudio(audioUrl: string): void {
    // Asegúrate de que el enlace de Dropbox esté en formato de descarga directa
    const directDownloadUrl = audioUrl.replace('dl=0', 'dl=1');
    this.audioSource = directDownloadUrl;
    const audioElement = this.audioPlayer.nativeElement;
    audioElement.src = this.audioSource;
    audioElement.load();
    audioElement.play();
  }

  volverOpcionesClase(): void {
    this.router.navigateByUrl('/home/opcionesClase');
  }
}
