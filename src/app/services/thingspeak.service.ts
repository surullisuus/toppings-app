import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThingspeakService {
  private apiKey = 'FUZ3V069YNYI0HPS'; // Reemplaza con tu API Key
  private channelID = '2562683'; // Reemplaza con tu Channel ID

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    const url = `https://api.thingspeak.com/channels/${this.channelID}/feeds.json?api_key=${this.apiKey}`;
    return this.http.get<any>(url);
  }
}
