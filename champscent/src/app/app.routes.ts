import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'catalogo',
    loadComponent: () =>
        import('./components/catalogo/catalogo.component').then(m => m.CatalogoComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./components/register/register.component').then(m => m.RegisterComponent),
  },
   {
    path: 'recuperar',
    loadComponent: () =>
      import('./components/recuperar/recuperar.component').then(m => m.RecuperarComponent),
  },
  {
    path: 'carrito',
    loadComponent: () =>
      import('./components/carrito/carrito.component').then(m => m.CarritoComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'inventario',
    loadComponent: () =>
      import('./components/inventario/inventario.component').then(m => m.InventarioComponent),
    canActivate: [AdminGuard],
  },
  {
    path: 'producto/:id',
    loadComponent: () =>
        import('./components/producto-detalle/producto-detalle.component').then(m => m.ProductoDetalleComponent),
    canActivate: [AuthGuard]
  }
];
