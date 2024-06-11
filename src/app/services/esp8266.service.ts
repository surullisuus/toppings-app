import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Esp8266Service {

  private baseUrl: string = 'http://192.168.0.18'; // Reemplaza con la IP de tu ESP8266

  constructor(private http: HttpClient) { }

  turnOn(): Observable<any> {
    return this.http.get(`${this.baseUrl}/on`);
  }

  turnOff(): Observable<any> {
    return this.http.get(`${this.baseUrl}/off`);
  }
}
