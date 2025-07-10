import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../services/productos.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
  imports: [CommonModule, FormsModule]
})
export class CatalogoComponent implements OnInit {
  productos: any[] = [];
  rol: string = '';

  constructor(
    private productosService: ProductosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rol = localStorage.getItem('rol') || '';
    this.productosService.obtenerProductos().subscribe({
      next: data => {
        this.productos = data;
        console.log('Productos cargados:', this.productos);
      },
      error: err => console.error('Error al obtener productos', err)
    });
  }

  agregarAlCarrito(producto: any) {
    if (this.rol !== 'cliente') return;

    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const idx = carrito.findIndex((p: any) => p.id === producto._id);

    if (idx !== -1) {
      carrito[idx].cantidad += 1;
    } else {
      carrito.push({ id: producto._id, nombre: producto.nombre, precio: producto.precio, cantidad: 1, stock: producto.stock });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`${producto.nombre} añadido al carrito`);
  }

  irAlCarrito() {
    this.router.navigate(['/carrito']);
  }

  irAInventario() {
    this.router.navigate(['/inventario']);
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['/login']);
  }

  verMas(id: string) {
    this.router.navigate(['/producto', id]);
  }
}
