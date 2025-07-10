import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {
  producto: any;

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productosService.obtenerProductoPorId(id).subscribe({
        next: data => this.producto = data,
        error: err => console.error('Error al obtener producto', err)
      });
    }
  }

  agregarAlCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const idx = carrito.findIndex((p: any) => p.id === this.producto._id);

    if (idx !== -1) {
      carrito[idx].cantidad += 1;
    } else {
      carrito.push({
        id: this.producto._id,
        nombre: this.producto.nombre,
        precio: this.producto.precio,
        cantidad: 1
      });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`${this.producto.nombre} añadido al carrito`);
  }

  volver() {
    this.router.navigate(['/catalogo']);
  }
}
