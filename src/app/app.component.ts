import { Component, OnInit } from '@angular/core';
import { ThingspeakService } from './services/thingspeak.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent implements OnInit {
  title = 'toppings-app';
  feeds: any[] = [];

  constructor(private thingspeakService: ThingspeakService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.thingspeakService.getData().subscribe(
      data => {
        this.feeds = data.feeds;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
