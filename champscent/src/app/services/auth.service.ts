import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.API}/login`, { email, password });
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.API}/registrar`, data);
  }

  recuperar(email: string, pregunta: string, respuesta: string, nuevaPassword: string) {
    return this.http.post<any>('http://localhost:3000/auth/recuperar', {
      email,
      pregunta,
      respuesta,
      nuevaPassword
    });
  }
  
  obtenerIdDesdeToken(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id || '';
  }


}
