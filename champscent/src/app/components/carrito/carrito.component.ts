import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../services/auth.service';

declare var paypal: any;

@Component({
  selector: 'app-carrito',
  standalone: true,
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  imports: [CommonModule, FormsModule]
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];
  total: number = 0;
  mostrarPayPal = false;

  constructor(private router: Router, private carritoService: CarritoService, private authService: AuthService) {}

  ngOnInit() {
    this.carrito = this.carritoService.obtenerCarrito();
    this.total = this.carritoService.calcularTotal(this.carrito);
    if (this.carrito.length > 0) {
      this.iniciarPago();  // ⬅️ Aquí se activa el botón de PayPal
    }
  }

  aumentar(item: any) {
    if (item.cantidad < item.stock) {
      item.cantidad++;
      this.actualizar();
    }
    console.log(item.stock)
  }

  disminuir(item: any) {
    if (item.cantidad > 1) {
      item.cantidad--;
      this.actualizar();
    }
  }

  eliminar(item: any) {
    this.carrito = this.carrito.filter(p => p.id !== item.id);
    this.actualizar();
  }

  vaciarCarrito() {
    this.carrito = [];
    this.actualizar();
  }

  actualizar() {
    this.carritoService.guardarCarrito(this.carrito);
    this.total = this.carritoService.calcularTotal(this.carrito);
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  volver() {
    this.router.navigate(['/catalogo']);
  }

  iniciarPago() {
    this.mostrarPayPal = true;

    setTimeout(() => {
      paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return fetch('http://localhost:3000/api/paypal/create-order', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ total: this.total })
          })
          .then(res => res.json())
          .then(data => data.id);
        },

        onApprove: (data: any, actions: any) => {
          const userId = this.authService.obtenerIdDesdeToken();  // Este método lo debes tener definido

          return fetch('http://localhost:3000/api/paypal/capture-order', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderID: data.orderID,
              cart: this.carrito,
              userId: userId
            })
          })
          .then(res => res.json())
          .then(response => {
            alert('✅ Pago exitoso y factura generada');
            console.log('Factura:', response.factura);
            this.carrito = [];
            localStorage.removeItem('carrito');
            this.actualizar();

            const url = `http://localhost:3000/facturas/${response.factura}`;
            const a = document.createElement('a');
            a.href = url;
            a.download = response.factura;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          });
        }
      }).render('#paypal-button-container');
    }, 200);
  }

}