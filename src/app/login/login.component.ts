import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Esp8266Service } from '../services/esp8266.service';
import bootstrap from 'bootstrap';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private router: Router,private esp8266Service: Esp8266Service) { }


  onSubmit() {
    console.log(this.email,"emaaaail")
    console.log(this.password,"paswooasasd")
    if (this.email === 'ricoletto@yopmail.com' && this.password === '12345') {
      console.log('Login successful');
      this.router.navigate(['/home']);
      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        text: '¡Bienvenido! Has iniciado sesión correctamente.',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirigir al dashboard o página principal
         
        }
      });
    } else {
      // Simula el inicio de sesión fallido
      console.error('Invalid login credentials');
      Swal.fire({
        icon: 'error',
        title: 'Inicio de sesión fallido',
        text: 'Las credenciales ingresadas son inválidas.',
        confirmButtonText: 'Aceptar'
      });
    }
    
  }


//esto es lo de los botones

turnOn() {
  this.esp8266Service.turnOn().subscribe(response => {
    console.log(response);
  });
}

turnOff() {
  this.esp8266Service.turnOff().subscribe(response => {
    console.log(response);
  });
}
}
