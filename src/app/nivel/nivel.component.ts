import { Component } from '@angular/core';

@Component({
  selector: 'app-nivel',
  templateUrl: './nivel.component.html',
  styleUrl: './nivel.component.css'
})
export class NivelComponent {
  showAlert(): void {
    alert('¡Botón clicado!');
  }
}
