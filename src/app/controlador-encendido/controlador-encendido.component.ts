import { Component } from '@angular/core';
import { Esp8266Service } from '../services/esp8266.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-controlador-encendido',
  templateUrl: './controlador-encendido.component.html',
  styleUrl: './controlador-encendido.component.css'
})
export class ControladorEncendidoComponent {
  constructor(private esp8266Service: Esp8266Service) { }
  estado:boolean = false;

  turnOn() {
    this.esp8266Service.turnOn().subscribe(response => {
      console.log(response);
      this.estado = true;
      
    });
  }
  
  turnOff() {
    this.esp8266Service.turnOff().subscribe(response => {
      console.log(response);
      this.estado = false;
    });
  }

  
}
