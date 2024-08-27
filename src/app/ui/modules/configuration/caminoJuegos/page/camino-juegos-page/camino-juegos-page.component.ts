import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camino-juegos-page',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './camino-juegos-page.component.html',
  styleUrl: './camino-juegos-page.component.css'
})
export class CaminoJuegosPageComponent {

  username: string = 'Almendra'

  constructor(
    private router: Router,
  ) {}

  levels = [
    { name: "Level 1", x: 20, y: 30, icon: "https://img.freepik.com/foto-gratis/personaje-dibujos-animados-3d_23-2151021951.jpg?w=740&t=st=1721970629~exp=1721971229~hmac=34636ad2e1c093c5ea2e4f8d607497a9a38ac1da229a7d21359135735b3eda43", available: true },
    { name: "Level 2", x: 40, y: 50, icon: "https://img.freepik.com/foto-gratis/personaje-dibujos-animados-3d_23-2151021951.jpg?w=740&t=st=1721970629~exp=1721971229~hmac=34636ad2e1c093c5ea2e4f8d607497a9a38ac1da229a7d21359135735b3eda43", available: false },
    { name: "Level 3", x: 80, y: 30, icon: "https://img.freepik.com/foto-gratis/personaje-dibujos-animados-3d_23-2151021951.jpg?w=740&t=st=1721970629~exp=1721971229~hmac=34636ad2e1c093c5ea2e4f8d607497a9a38ac1da229a7d21359135735b3eda43", available: true },
    { name: "Level 4", x: 60, y: 70, icon: "https://img.freepik.com/foto-gratis/personaje-dibujos-animados-3d_23-2151021951.jpg?w=740&t=st=1721970629~exp=1721971229~hmac=34636ad2e1c093c5ea2e4f8d607497a9a38ac1da229a7d21359135735b3eda43", available: true }
  ];

  navigateToLevel(level: any) {
    if (level.available) {
      console.log('Navegar al nivel:', level.name);
      // Implementar la lógica de navegación aquí
    } else {
      console.log('Nivel bloqueado:', level.name);
      // Opcional: mostrar un mensaje o una ventana emergente indicando que el nivel está bloqueado
    }
  }

  volverHome(): void {
    this.router.navigateByUrl('/home');
  }
}
