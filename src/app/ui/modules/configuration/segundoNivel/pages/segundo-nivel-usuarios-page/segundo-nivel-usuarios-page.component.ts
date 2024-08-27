import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-segundo-nivel-usuarios-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './segundo-nivel-usuarios-page.component.html',
  styleUrl: './segundo-nivel-usuarios-page.component.css'
})
export class SegundoNivelUsuariosPageComponent {
  items: { image: string; word: string; matched: number | null }[] = [
    { image: 'https://img.freepik.com/foto-gratis/personaje-dibujos-animados-3d_23-2151021922.jpg?t=st=1721966561~exp=1721970161~hmac=5cb656f12016ffd4cd3412f6a0e7a21701bc51621c09a1f91678bc94fc3ef449&w=740', word: 'Palabra 1', matched: null },
    { image: 'https://img.freepik.com/foto-gratis/personaje-dibujos-animados-3d_23-2151021901.jpg?t=st=1721966497~exp=1721970097~hmac=8b195f1d3c978b1bc9d722f7ab296cf4af39111bd1e4641a6bc666606c7572cd&w=740', word: 'Palabra 2', matched: null },
    { image: 'https://img.freepik.com/foto-gratis/personaje-dibujos-animados-3d_23-2151021938.jpg?t=st=1721966522~exp=1721970122~hmac=f103093972db8bbe4a8bb56d3f4597a3bb86a694e3b6870f629c12e92da3e064&w=740', word: 'Palabra 3', matched: null },
    { image: 'https://img.freepik.com/foto-gratis/personaje-dibujos-animados-3d_23-2151021915.jpg?t=st=1721966540~exp=1721970140~hmac=fecedb663c3ee0443b3ac7730a794b19c766e3f8bc5506d0dc9c06272dc437e2&w=740', word: 'Palabra 4', matched: null }
  ];

  onDragStart(event: DragEvent) {
    if (event.dataTransfer) {
      const target = event.target as HTMLElement;
      const id = target.dataset['id'] || '';
      event.dataTransfer.setData('text/plain', id);

      const dragSound = new Audio('assets/sounds/drag-sound.mp3');
      dragSound.play();
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    (event.target as HTMLElement).classList.add('over');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const id = event.dataTransfer?.getData('text/plain');
    const dropZone = event.target as HTMLElement;

    if (id) {
      const imageIndex = parseInt(id, 10);
      const dropZoneId = dropZone.dataset['id'];

      if (dropZoneId) {
        const dropIndex = parseInt(dropZoneId, 10);

        if (imageIndex === dropIndex) {
          this.items[imageIndex].matched = dropIndex;
          dropZone.classList.add('correct-match');
          const successSound = new Audio('assets/sounds/success-sound.mp3');
          successSound.play();
        } else {
          const errorSound = new Audio('assets/sounds/error-sound.mp3');
          errorSound.play();
          dropZone.classList.remove('correct-match');
          alert('Emparejamiento incorrecto. Inténtalo de nuevo.');
        }
      }
    }
  }

  checkAnswers() {
    const allMatched = this.items.every(item => item.matched !== null);
    if (allMatched) {
      const finalSuccessSound = new Audio('assets/sounds/final-success-sound.mp3');
      finalSuccessSound.play();
      alert('¡Todos los pares están correctos!');
    } else {
      const finalErrorSound = new Audio('assets/sounds/final-error-sound.mp3');
      finalErrorSound.play();
      alert('Algunos pares son incorrectos. Inténtalo de nuevo.');
    }

    // Limpiar el estado de los bordes y las imágenes
    document.querySelectorAll('.drop-zone').forEach(element => {
      element.classList.remove('correct-match');
    });
  }
}
