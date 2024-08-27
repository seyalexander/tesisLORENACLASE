import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../../../../../infraestructure/driven-adapter/login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-segundo-nivel-usuarios-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './segundo-nivel-usuarios-page.component.html',
  styleUrl: './segundo-nivel-usuarios-page.component.css'
})
export class SegundoNivelUsuariosPageComponent {

  loggedInUser = {
    username: 'Almendra',
    avatar: 'https://img.freepik.com/foto-gratis/personaje-dibujos-animados-3d_23-2151021951.jpg?w=740&t=st=1721970629~exp=1721971229~hmac=34636ad2e1c093c5ea2e4f8d607497a9a38ac1da229a7d21359135735b3eda43'
  };

  items: { image: string; word: string; matchedIndex: number | null }[] = [
    { image: 'https://img.freepik.com/foto-gratis/personaje-dibujos-animados-3d_23-2151021922.jpg', word: 'Palabra 1', matchedIndex: null },
    { image: 'https://img.freepik.com/foto-gratis/personaje-dibujos-animados-3d_23-2151021901.jpg', word: 'Palabra 2', matchedIndex: null },
    { image: 'https://img.freepik.com/foto-gratis/personaje-dibujos-animados-3d_23-2151021938.jpg', word: 'Palabra 3', matchedIndex: null },
    { image: 'https://img.freepik.com/foto-gratis/personaje-dibujos-animados-3d_23-2151021915.jpg', word: 'Palabra 4', matchedIndex: null }
  ];

  draggedItemIndex: number | null = null;

  onDragStart(event: DragEvent, index: number) {
    this.draggedItemIndex = index;
    const dragSound = new Audio('assets/sounds/drag-sound.mp3');
    dragSound.play();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault(); // Necesario para permitir el drop
  }

  onDrop(event: DragEvent, index: number) {
    event.preventDefault();

    if (this.draggedItemIndex !== null) {
      this.items[index].matchedIndex = this.draggedItemIndex;
      const successSound = new Audio('assets/sounds/success-sound.mp3');
      successSound.play();
    }

    this.draggedItemIndex = null; // Resetear el índice arrastrado
  }

  constructor(
    private router: Router,
    private _login: AuthService
  ) {}

  checkAnswers() {
    let correctCount = 0;

    this.items.forEach((item, index) => {
      if (item.matchedIndex === index) {
        correctCount++;
      }
    });

    const finalSuccessSound = new Audio('assets/sounds/final-success-sound.mp3');
    finalSuccessSound.play();

    alert(`¡Has emparejado correctamente ${correctCount} de ${this.items.length} pares!`);
  }

  volverOpcionesClase(): void {
    this.router.navigateByUrl('/home/opcionesClase');
  }
}
