import { Component, ElementRef, ViewChild } from '@angular/core';
import { Clase1Model } from '../../../../../../domain/models/clase1/clase.modul';
import { Clase1Service } from '../../../../../../infraestructure/driven-adapter/clase1/clase1.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../../infraestructure/driven-adapter/login/auth.service';

@Component({
  selector: 'app-primer-nivel-usuarios-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './primer-nivel-usuarios-page.component.html',
  styleUrls: ['./primer-nivel-usuarios-page.component.css']
})
export class PrimerNivelUsuariosPageComponent {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  loggedInUser = {
    username: 'Almendra',
    avatar: 'https://img.freepik.com/foto-gratis/personaje-dibujos-animados-3d_23-2151021951.jpg?w=740&t=st=1721970629~exp=1721971229~hmac=34636ad2e1c093c5ea2e4f8d607497a9a38ac1da229a7d21359135735b3eda43'
  };

  datosAudioslista: Clase1Model[] = [];
  audioSource: string | undefined;

  private audiosSubscription: Subscription | undefined;

  constructor(
    private _getAudiosUseCase: Clase1Service,
    private router: Router,
    private _login: AuthService
  ) {}

  ngOnInit(): void {
    this.listarAudios();
  }

  listarAudios() {
    this.audiosSubscription = this._getAudiosUseCase.listAudios().subscribe((response: Clase1Model[]) => {
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
