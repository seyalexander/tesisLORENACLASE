import { Router, RouterModule } from '@angular/router';
import { Component, HostListener, inject } from '@angular/core';
import { avatarModel } from '../../../../../../domain/models/avatares/avatar.model';
import { AuthService } from '../../../../../../infraestructure/driven-adapter/login/auth.service';
import { AvataresService } from '../../../../../../infraestructure/driven-adapter/avatares/avatares.service';
import { TokenService } from '../../../../../../infraestructure/driven-adapter/login/token.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Clase4Service } from '../../../../../../infraestructure/driven-adapter/clase4/clase4.service';
import { clase4Model } from '../../../../../../domain/models/clase4/clase4.model';
import { audioModel } from '../../../../../../domain/models/audio/audio.model';

@Component({
  selector: 'app-nivel4',
  standalone: true,
  imports: [],
  templateUrl: './nivel4.component.html',
  styleUrl: './nivel4.component.css'
})
export class Nivel4Component {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private drawing: boolean = false;

  userNombre: String = ''
  userLoginOn : boolean = false;
  userLoginId : number  = 0 ;

  private loginService = inject(AuthService);

  ngOnInit() {
    this.canvas = document.getElementById('drawingCanvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;

    this.datosLogin()
    this.obtenerAudios()

    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {

        this.userLoginOn = userLoginOn;
        this.loginService.currentUserIdClient.subscribe({
          next: (userLoginId) => {
            this.userLoginId = userLoginId;

            if (userLoginId != 0 || userLoginId != null) {

            }
          }
        })
      }
    })
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.drawing = true;
    this.ctx.beginPath();
    this.ctx.moveTo(event.offsetX, event.offsetY);
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.drawing = false;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.drawing) {
      this.ctx.lineTo(event.offsetX, event.offsetY);
      this.ctx.stroke();
    }
  }

  // =================================================================================================

  username: string = 'Usuario';
  currentIndex: number = 0;
  listaAvatares: Array<avatarModel> = []
  constructor(
    private router: Router,
    private _avatares: AvataresService,
    private token: TokenService,
    private http: HttpClient,
    private _clase4: Clase4Service
  ) {}

  avatars = [
    { name: "Avatar 1", img: "https://img.freepik.com/foto-gratis/personaje-dibujos-animados-3d_23-2151021922.jpg?t=st=1721966561~exp=1721970161~hmac=5cb656f12016ffd4cd3412f6a0e7a21701bc51621c09a1f91678bc94fc3ef449&w=740" },
    { name: "Avatar 2", img: "https://img.freepik.com/foto-gratis/personaje-dibujos-animados-3d_23-2151021901.jpg?t=st=1721966497~exp=1721970097~hmac=8b195f1d3c978b1bc9d722f7ab296cf4af39111bd1e4641a6bc666606c7572cd&w=740" },
    { name: "Avatar 3", img: "https://img.freepik.com/foto-gratis/personaje-dibujos-animados-3d_23-2151021938.jpg?t=st=1721966522~exp=1721970122~hmac=f103093972db8bbe4a8bb56d3f4597a3bb86a694e3b6870f629c12e92da3e064&w=740" },
    { name: "Avatar 4", img: "https://img.freepik.com/foto-gratis/personaje-dibujos-animados-3d_23-2151021915.jpg?t=st=1721966540~exp=1721970140~hmac=fecedb663c3ee0443b3ac7730a794b19c766e3f8bc5506d0dc9c06272dc437e2&w=740" }
  ];

  datosLogin() {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn = userLoginOn;
        console.log(this.userLoginOn);
        if(this.userLoginOn) {
          console.log(this.userLoginOn);

          this.obtenerAvatares()
        }

      }
    })
  }

  listaAudios: Array<audioModel> = []
  private ausdiosSubscribe: Subscription | undefined
  obtenerAudios(): void {
    this.ausdiosSubscribe = this._clase4.audios().subscribe((response: audioModel[]) => {
        this.listaAudios = response;
        console.log('Lista de audios recibida:', this.listaAudios);
        if (this.listaAudios.length > 0) {
            const ultimoAudio = this.listaAudios[this.listaAudios.length - 1];
            console.log('Último audio recibido:', ultimoAudio);
            this.renderizarUltimoAudio(ultimoAudio);
        }
    });
  }

  currentAudioId: number | undefined;
  renderizarUltimoAudio(audio: audioModel): void {
    const audioElement = document.getElementById('audioPlayer') as HTMLAudioElement;
    if (audioElement) {
        // Modificar el enlace para que sea un enlace de descarga directa
        const enlaceModificado = audio.audio.replace(/dl=0$/, 'dl=1');

        console.log('Configurando el audio con URL:', enlaceModificado); // Log de la URL del audio
        console.log('ID del audio:', audio.idclaseActividad3); // Log del ID del audio
        this.currentAudioId = audio.idclaseActividad3
        audioElement.src = enlaceModificado;
    }
}

  private avataresSubscribe: Subscription | undefined
  obtenerAvatares(): void {
    this.avataresSubscribe = this._avatares.listAvatares().
      subscribe((Response: avatarModel[]) => {
        this.listaAvatares = Response;
      })
  }

  ngOnDestroy(): void {
    if (this.avataresSubscribe) {
      this.avataresSubscribe.unsubscribe();
    }
  }

  prevAvatar() {
    this.currentIndex = (this.currentIndex - 1 + this.avatars.length) % this.avatars.length;
    this.updateAvatar('slide-in-left');
  }

  nextAvatar() {
    this.currentIndex = (this.currentIndex + 1) % this.avatars.length;
    this.updateAvatar('slide-in-right');
  }

  updateAvatar(animationClass: string) {
    const avatarContainer = document.getElementById('avatar-container');
    if (avatarContainer) {
      avatarContainer.classList.remove('slide-in-left', 'slide-in-right');
      void avatarContainer.offsetWidth; // Trigger reflow
      avatarContainer.classList.add(animationClass);
    }
  }

  selectAvatar() {
    console.log('Avatar seleccionado:', this.listaAvatares[this.currentIndex]);
  }

  userData : any = ""

  logout(): void {
    this.loginService.logout();
    this.userLoginOn = false;
    this.userLoginId = 0;
    this.userNombre = '';
    this.userData = '';
    this.router.navigateByUrl('/');
    console.log("Logged out, current user data:", {
      userLoginOn: this.userLoginOn,
      userLoginId: this.userLoginId,
      userNombre: this.userNombre,
      userData: this.userData
    });

  }

  volverHome(): void {
    this.router.navigateByUrl('/home');
  }

  mapa(): void {
    this.router.navigateByUrl('/home/mapa');
  }

  async saveDrawing() {
    try {
        const canvas = this.canvas;
        const context = canvas.getContext('2d');

        if (!context) {
            throw new Error('No se pudo obtener el contexto del canvas.');
        }

        const imageDataUrl = canvas.toDataURL('image/png');

        // Extraer la parte base64 del DataURL
        const base64Data = imageDataUrl.split(',')[1]; // Esto elimina el prefijo

        if (this.currentAudioId === undefined) {
            throw new Error('El ID del audio no está definido.');
        }

        // Agregar un log para verificar el ID del audio que se está utilizando
        console.log('ID del audio actual:', this.currentAudioId);

        // Crear una instancia de clase4Model
        const clase4ModelInstance: clase4Model = new clase4Model('');
        clase4ModelInstance.idalumnofk.idAlumno = 1;
        clase4ModelInstance.idaudiosactividad3fk.idclaseActividad3 = this.currentAudioId;

        // Asignar la imagen en formato base64 (sin prefijo) al modelo
        clase4ModelInstance.imagen = base64Data;

        // Agregar console.log para ver el objeto que se va a enviar
        console.log('Datos enviados a la API:', clase4ModelInstance);

        // Guardar en la base de datos usando el método saveClase4
        this._clase4.saveClase4(clase4ModelInstance).subscribe(
          response => {
            alert("Registro correcto");

            // Limpiar el canvas después de guardar
            context.clearRect(0, 0, canvas.width, canvas.height);
          },
          error => {
            // Imprimir detalles del error
            console.error('Error al guardar la imagen:', error);
            if (error instanceof Error) {
                console.error('Mensaje de error:', error.message);
            } else if (typeof error === 'object') {
                console.error('Detalles del error:', JSON.stringify(error));
            }
            alert(`Error al guardar la imagen: ${error.message || 'Error desconocido'}`);
          }
        );
    } catch (error) {
        alert(`Error en saveDrawing: ${error}`);
    }
}

  loggedInUser = {
    username: 'Almendra',
    avatar: 'https://img.freepik.com/foto-gratis/personaje-dibujos-animados-3d_23-2151021951.jpg?w=740&t=st=1721970629~exp=1721971229~hmac=34636ad2e1c093c5ea2e4f8d607497a9a38ac1da229a7d21359135735b3eda43'
  };

  volverOpcionesClase(): void {
    this.router.navigateByUrl('/home/opcionesClase');
  }
}
