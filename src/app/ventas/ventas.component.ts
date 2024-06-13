import { Component } from '@angular/core';
import * as d3 from 'd3';
import { Esp8266Service } from '../services/esp8266.service';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'] // Cambio 'styleUrl' a 'styleUrls'
})
export class VentasComponent {
  private data = [
    { month: 'Enero', value: 65 },
    { moth: 'Febrero', value: 59 },
    { moth: 'Marzo', value: 80 },
    { moth: 'Abril', value: 81 },
    { moth: 'Mayo', value: 56 },
    { moth: 'Junio', value: 55 },
    { moth: 'Agosto', value: 40 },
    { moth: 'Septiembre', value: 40 },
    { moth: 'Octubre', value: 40 },
    { moth: 'Noviembre', value: 40 },
    { moth: 'Diciembre', value: 40 }
  ];

  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  public contador: string = ''; 
  private contadorSubscription!: Subscription;
  public suma: number=0;
  private contadorNum:number =0 ;

  constructor(private contadorService: Esp8266Service) { 
    this.updateContador();
  }

  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.data);
    this.getContador();
    this.sumVentasMes();
  }

  ngOnDestroy(): void {
    if (this.contadorSubscription) {
      this.contadorSubscription.unsubscribe();
    }
  }

  private updateContador(): void {
    this.contadorSubscription = interval(1000)
      .pipe(
        switchMap(() => this.contadorService.getContador())
      )
      .subscribe(
        data => {
          console.log('Contador:', data); 
          this.contador = data;
          this.suma = parseInt(this.contador) * 500;
          this.contadorNum = parseInt(this.contador);
          this.sumVentasMes(); // Actualiza el gráfico cuando cambia el contador
        },
        error => {
          console.error('Error fetching contador:', error);
        }
      );
  }

  getContador(): void {
    this.contadorService.getContador().subscribe(
      data => {
        console.log('Contador:', data); 
        this.contador = data;
      },
      error => {
        console.error('Error fetching contador:', error);
      }
    );
  }
  

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  sumVentasMes() {
    // Actualiza el valor de las barras con el nuevo valor del contador
    this.data = [
    { month: 'Enero', value: 0 },
    { month: 'Febrero', value: 0 },
    { month: 'Marzo', value: 0 },
    { month: 'Abril', value: 0 },
    { month: 'Mayo', value: 0 },
    { month: 'Junio', value: this.contadorNum },
    { month: 'Agosto', value: 0 },
    { month: 'Septiembre', value: 0 },
    { month: 'Octubre', value: 0 },
    { month: 'Noviembre', value: 0 },
    { month: 'Diciembre', value: 0 }];
    // Redibuja las barras con los nuevos datos
    this.drawBars(this.data);
  }

  private drawBars(data: any[]): void {
    // Elimina las barras existentes antes de dibujar las nuevas
    this.svg.selectAll("rect").remove();
    this.svg.selectAll("text.bar").remove();

    // Código para dibujar las barras, similar al que ya tienes
    // ...
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.month))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: any) => x(d.month)) // Aquí corregido de d.moth a d.month
      .attr("y", (d: any) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => this.height - y(d.value))
      .attr("fill", "#d04a35");
      

      this.svg.selectAll("text.bar")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "bar")
      .attr("x", (d: any) => x(d.month)! + x.bandwidth() / 2) // Aquí corregido de d.moth a d.month
      .attr("y", (d: any) => y(d.value)! - 5)
      .attr("text-anchor", "middle")
      .text((d: any) => (d.value*500));
      //se debe multiplicar el numero de acciones x el precio
  }
}

 
  

  
 
