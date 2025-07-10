import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, RouterModule]
})
export class RegisterComponent {
  nombre = '';
  email = '';
  password = '';
  pregunta = '¿Cuántos años tienes?';
  respuesta = '';

  constructor(private authService: AuthService, private router: Router) {}

  registrar() {
    this.authService.register({
      nombre: this.nombre,
      email: this.email,
      password: this.password,
      rol: 'cliente',
      preguntaSeguridad: this.pregunta,
      respuestaSeguridad: this.respuesta
    }).subscribe(res => {
      if (!res.error) {
        alert('Usuario registrado correctamente');
        this.router.navigate(['/login']);
      } else {
        alert(res.error);
      }
    });
  }
}
