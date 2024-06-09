import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private router: Router) { }


  onSubmit() {
    // Aquí deberías implementar la lógica de autenticación
    // Por ejemplo, podrías hacer una llamada a un servicio de autenticación
    if (this.email === 'test@example.com' && this.password === 'password') {
      // Simula el inicio de sesión exitoso
      console.log('Login successful');
      this.router.navigate(['/dashboard']);  // Redirigir al dashboard o página principal
    } else {
      // Simula el inicio de sesión fallido
      console.error('Invalid login credentials');
    }
  }

}
