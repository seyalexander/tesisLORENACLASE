import { Router, RouterModule } from '@angular/router';
import { Component, HostListener } from '@angular/core';
import { avatarModel } from '../../../../../../domain/models/avatares/avatar.model';
import { AuthService } from '../../../../../../infraestructure/driven-adapter/login/auth.service';
import { AvataresService } from '../../../../../../infraestructure/driven-adapter/avatares/avatares.service';
import { TokenService } from '../../../../../../infraestructure/driven-adapter/login/token.service';
import { Subscription } from 'rxjs';

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

  ngOnInit() {
    this.canvas = document.getElementById('drawingCanvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;

    this.datosLogin()
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
    private loginService: AuthService,
    private _avatares: AvataresService,
    private token: TokenService
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

  userNombre: String = ''
  userLoginOn : boolean = false;
  userLoginId : number = 0;
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
}
