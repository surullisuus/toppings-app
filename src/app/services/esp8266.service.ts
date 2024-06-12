import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Esp8266Service {

  private apiUrl: string = 'http://192.168.0.13'; // Reemplaza con la IP de tu ESP8266

  constructor(private http: HttpClient) { }

  getContador(): Observable<string> {
    return this.http.get(`${this.apiUrl}/contador`, { responseType: 'text' });
  }

  turnOn(): Observable<string> {
    return this.http.get(`${this.apiUrl}/on`, { responseType: 'text' });
  }

  turnOff(): Observable<string> {
    return this.http.get(`${this.apiUrl}/off`, { responseType: 'text' });
  }
  getEstado(): Observable<string> {
    return this.http.get(`${this.apiUrl}/estado`, { responseType: 'text' });
  }
  getTemperatura(): Observable<string> {
    return this.http.get(`${this.apiUrl}/temperatura`, { responseType: 'text' });
  }
}
