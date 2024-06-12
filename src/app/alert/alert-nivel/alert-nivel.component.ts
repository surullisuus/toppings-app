import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-nivel',
  // standalone: true,
  // imports: [],
  templateUrl: './alert-nivel.component.html',
  styleUrl: './alert-nivel.component.css'
})
export class AlertNivelComponent {
  @Input() message: string = '¡Alerta!';
  isVisible: boolean = false;

  showAlert(): void {
    this.isVisible = true;
  }

  closeAlert(): void {
    this.isVisible = false;
  }
}
