import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-opciones-clase',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule],
  templateUrl: './opciones-clase.component.html',
  styleUrl: './opciones-clase.component.css'
})
export class OpcionesClaseComponent {

  constructor(private router: Router) { }

  loggedInUser = {
    avatar: 'https://img.freepik.com/foto-gratis/personaje-dibujos-animados-3d_23-2151021922.jpg?t=st=1721966561~exp=1721970161~hmac=5cb656f12016ffd4cd3412f6a0e7a21701bc51621c09a1f91678bc94fc3ef449&w=740', // Reemplaza con la URL real del avatar
    username: 'Almendra'
  };


  activities1 = { name: 'Vocabulary', description: 'Descripción breve de la actividad 1', image: 'https://img.freepik.com/foto-gratis/personaje-dibujos-animados-3d_23-2151021951.jpg?w=740&t=st=1721970629~exp=1721971229~hmac=34636ad2e1c093c5ea2e4f8d607497a9a38ac1da229a7d21359135735b3eda43' }
  activities2 = { name: 'Activity 1', description: 'Descripción breve de la actividad 2', image: 'https://img.freepik.com/foto-gratis/personaje-dibujos-animados-3d_23-2151021951.jpg?w=740&t=st=1721970629~exp=1721971229~hmac=34636ad2e1c093c5ea2e4f8d607497a9a38ac1da229a7d21359135735b3eda43' }
  activities3 = { name: 'Activity 2', description: 'Descripción breve de la actividad 3', image: 'https://img.freepik.com/foto-gratis/personaje-dibujos-animados-3d_23-2151021951.jpg?w=740&t=st=1721970629~exp=1721971229~hmac=34636ad2e1c093c5ea2e4f8d607497a9a38ac1da229a7d21359135735b3eda43' }
  activities4 = { name: 'Activity 3', description: 'Descripción breve de la actividad 4', image: 'https://img.freepik.com/foto-gratis/personaje-dibujos-animados-3d_23-2151021951.jpg?w=740&t=st=1721970629~exp=1721971229~hmac=34636ad2e1c093c5ea2e4f8d607497a9a38ac1da229a7d21359135735b3eda43' }

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    infinite: true
  };

  ngOnInit(): void {
  }

  volverHome(): void {
    this.router.navigateByUrl('/home');
  }

  actividadSonidos(): void {
    this.router.navigateByUrl('/home/actividad1');
  }

  actividadCanva(): void {
    this.router.navigateByUrl('/home/actividad4');
  }
}
