import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventario',
  standalone: true,
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
  imports: [CommonModule, FormsModule,]
})
export class InventarioComponent implements OnInit {
  productos: any[] = [];
  nuevo = {
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    imagen: ''
  };

  constructor(private productosService: ProductosService, private router: Router) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productosService.obtenerProductos().subscribe(res => this.productos = res);
  }

  editar(id: string, campo: string, valor: any) {
    this.productosService.editarProducto(id, campo, valor).subscribe(() => this.cargarProductos());
  }

  eliminar(id: string) {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      this.productosService.eliminarProducto(id).subscribe(() => this.cargarProductos());
    }
  }

  agregarProducto() {
    this.productosService.agregarProducto(this.nuevo).subscribe(() => {
      this.nuevo = { nombre: '', descripcion: '', precio: 0, stock: 0, imagen: '' };
      this.cargarProductos();
    });
  }

  irACatalogo() {
    this.router.navigate(['/catalogo']);
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['/login']);
  }
}
