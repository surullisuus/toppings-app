import { Component, OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { ThingspeakService } from '../services/thingspeak.service';
import * as d3 from 'd3';
import { interval, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.component.html',
  styleUrls: ['./temperatura.component.css']
})
export class TemperaturaComponent implements OnInit, OnDestroy {

  title = 'toppings-app';
  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  private data: { date: Date, value: number }[] = [];
  private dataSubscription: Subscription | null = null;
  private updateInterval: number = 1000; // Intervalo en milisegundos para actualización
  private maxDataPoints: number = 40; // Máximo número de puntos de datos en el gráfico
  alertMessage: string = '';
  showAlert: boolean = false;

  constructor(private thingspeakService: ThingspeakService) { }

  ngOnInit(): void {
    this.createSvg();
    this.startDataFetch();
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  private startDataFetch(): void {
    this.dataSubscription = interval(this.updateInterval).subscribe(() => {
      this.fetchData();
    });
  }

  private fetchData(): void {
    this.thingspeakService.getData().subscribe(
      (data: { feeds: any[] }) => {
        if (Array.isArray(data.feeds)) {
          const feeds = data.feeds.map(feed => ({
            date: new Date(feed.created_at),
            value: parseFloat(feed.field1)
          }));

          this.data.push(...feeds);

          // Limitar el número de feeds en el gráfico
          if (this.data.length > this.maxDataPoints) {
            this.data.splice(0, this.data.length - this.maxDataPoints);
          }

          this.drawLineChart(this.data);

          // Verificar si la temperatura es mayor que 30
          const latestValue = 30;
          //const latestValue = this.data[this.data.length - 1].value;
          console.log("Último valor de temperatura:", latestValue);
          if (latestValue >= 30) {
            Swal.fire({
              icon: 'warning',
              title: '¡Alerta!',
              text: 'La temperatura superó los 30°C.',
            });
          }
        } else {
          console.error('Los datos recibidos no contienen un array de feeds:', data);
        }
      },
      error => {
        console.error('Error fetching data from ThingSpeak:', error);
      }
    );
  }

    // Método para cerrar la alerta desde el componente principal
    closeAlert(): void {
      this.showAlert = false;
    }

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawLineChart(data: any[]): void {
    // Verificar si los datos están vacíos o indefinidos
    if (!data || data.length === 0) {
      console.error("No hay datos para dibujar");
      return;
    }

    // Crear la escala de banda del eje X
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([0, this.width]);

    // Dibujar el eje X en el DOM
    let xAxis = this.svg.selectAll(".x-axis")
      .data([null]); // Vincular los datos a un único elemento
    xAxis = xAxis.enter().append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${this.height})`)
      .merge(xAxis); // Fusionar selecciones de entrada y actualización
    xAxis.call(d3.axisBottom(x)
      .tickFormat(d => d3.timeFormat("%H:%M")(d as Date)) // Formato de tiempo de las etiquetas
      .ticks(10) // Número de etiquetas deseadas
    )
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)"); // Rotación de las etiquetas para mejor legibilidad

    // Crear la escala de banda del eje Y
    const y = d3.scaleLinear()
      .domain([d3.min(data, d => d.value) as number, d3.max(data, d => d.value) as number])
      .range([this.height, 0]);

    // Dibujar el eje Y en el DOM
    let yAxis = this.svg.selectAll(".y-axis")
      .data([null]); // Vincular los datos a un único elemento
    yAxis = yAxis.enter().append("g")
      .attr("class", "y-axis")
      .merge(yAxis); // Fusionar selecciones de entrada y actualización
    yAxis.call(d3.axisLeft(y));

  // Añadir el nombre del eje Y
  this.svg.append("text")
    .attr("class", "y-axis-label")
    .attr("text-anchor", "middle")
    .attr("x", -this.height / 2)
    .attr("y", -this.margin + 10)
    .attr("transform", "rotate(-90)")
    .style("font-size", "12px") // Ajustar el tamaño de la letra
    .text("Temperatura (°C)");

    // Definir la línea
    const line = d3.line<any>()
      .x(d => x(d.date))
      .y(d => y(d.value));

    // Seleccionar la ruta de la línea
    let linePath = this.svg.selectAll(".line")
      .data([data]); // Vincular los datos a un único elemento
    linePath = linePath.enter().append("path")
      .attr("class", "line")
      .merge(linePath); // Fusionar selecciones de entrada y actualización
    linePath
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }
}
