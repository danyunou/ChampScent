import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private API = 'http://localhost:3000/api/cart';

  constructor(private http: HttpClient) {}

  // Obtener carrito desde localStorage
  obtenerCarrito(): any[] {
    return JSON.parse(localStorage.getItem('carrito') || '[]');
  }

  // Guardar carrito en localStorage
  guardarCarrito(carrito: any[]): void {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  // Vaciar carrito
  vaciarCarrito(): void {
    localStorage.removeItem('carrito');
  }

  // Calcular total de productos en el carrito
  calcularTotal(carrito: any[]): number {
    return carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }

  // Enviar carrito para generar XML de factura y restar stock
  pagarConXML(userId: string, carrito: any[]): Observable<any> {
    return this.http.post(`${this.API}/pagar`, { userId, cart: carrito });
  }
}
