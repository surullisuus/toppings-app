import { Component } from '@angular/core';
import { ThingspeakService } from '../services/thingspeak.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.component.html',
  styleUrl: './temperatura.component.css'
})
export class TemperaturaComponent {
  title = 'toppings-app';
  feeds: any[] = [];

  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor(private thingspeakService: ThingspeakService) { }

  ngOnInit(): void {
    this.createSvg();
    //this.drawBars(this.data);
    this.loadData();
  }

  loadData(): void {
    this.thingspeakService.getData().subscribe(
      data => {
        const feeds = data.feeds.map((feed: { created_at: any, field1: any }) => {
          return {
            date: new Date(feed.created_at),
            value: feed.field1
          };
        });
        this.feeds = feeds;
        this.drawLineChart(feeds);
      },
      error => {
        console.error('Error fetching data:', error);
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

  private drawLineChart(data: any[]): void {
    // Clear previous lines and text
    this.svg.selectAll("path").remove();
    this.svg.selectAll("text").remove();

    // Create the X-axis band scale
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([0, this.width]);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", `translate(0, ${this.height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([d3.min(data, d => d.value) as number, d3.max(data, d => d.value) as number])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Define the line
    const line = d3.line<any>()
      .x(d => x(d.date))
      .y(d => y(d.value));

    // Draw the line
    this.svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    // Add labels
    this.svg.selectAll("text.label")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", (d: any) => x(d.date))
    .attr("y", (d: any) => y(d.value) - 5)
    .attr("text-anchor", "middle")
    .text(() => '');
    //.text((d: any, i: number) => i % 20 === 0 ? d.value : ''); // Muestra cada 10 puntos
  }
}
