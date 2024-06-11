import { Component } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent {
  private data = [
    { moth: 'Enero', value: 65 },
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

  constructor() { }

  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.data);
  }
  private createSvg(): void {
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.moth))
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
      .attr("x", (d: any) => x(d.moth))
      .attr("y", (d: any) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => this.height - y(d.value))
      .attr("fill", "#d04a35");
      

      this.svg.selectAll("text.bar")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "bar")
      .attr("x", (d: any) => x(d.moth)! + x.bandwidth() / 2)
      .attr("y", (d: any) => y(d.value)! - 5)
      .attr("text-anchor", "middle")
      .text((d: any) => (d.value*500));
      //se debe multiplicar el numero de acciones x el precio
  }
  
}
