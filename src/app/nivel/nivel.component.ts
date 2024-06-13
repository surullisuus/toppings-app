import { Component } from '@angular/core';
import { Esp8266Service } from '../services/esp8266.service';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nivel',
  templateUrl: './nivel.component.html',
  styleUrl: './nivel.component.css'
})
export class NivelComponent {

  estado:number = 0;
  banderaEstado:string = "";
  private contadorSubscription!: Subscription;
  constructor(private nivelService: Esp8266Service){
    this.getContador();
    this.updateContador();
  }
 

  getContador(): void {
    this.nivelService.getEstado().subscribe(
      data => {
        console.log('nivel: ', data); 
        

      },
      error => {
        console.error('Error fetching contador:', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.contadorSubscription) {
      this.contadorSubscription.unsubscribe();
    }
  }

  private updateContador(): void {
    this.contadorSubscription = interval(1000)
      .pipe(
        switchMap(() => this.nivelService.getEstado())
      )
      .subscribe(
        data => {
          console.log('Contador:', data); 
          this.banderaEstado = data;
          this.estado = parseInt(this.banderaEstado);
          if(this.estado==1){
            Swal.fire({
              icon: 'warning',
              title: '¡Alerta!',
              text: 'El tanque está vacío',
            });
          }
        },
        error => {
          console.error('Error fetching contador:', error);
        }
      );
  }
}
