import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private API = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.API);
  }

  obtenerProductoPorId(id: string): Observable<any> {
    return this.http.get(`${this.API}/${id}`);
  }

  agregarProducto(producto: any): Observable<any> {
    return this.http.post(this.API, producto, this.getAuthHeaders());
  }

  editarProducto(id: string, campo: string, valor: any): Observable<any> {
    return this.http.put(`${this.API}/${id}`, { [campo]: valor }, this.getAuthHeaders());
  }

  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(`${this.API}/${id}`, this.getAuthHeaders());
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
  }
}
