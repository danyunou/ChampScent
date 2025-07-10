import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recuperar',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent {
  email = '';
  pregunta = '¿Cuántos años tienes?';
  respuesta = '';
  nuevaPassword = '';

  constructor(private auth: AuthService, private router: Router) {}

  recuperar() {
    this.auth.recuperar(this.email, this.pregunta, this.respuesta, this.nuevaPassword).subscribe(res => {
      if (res.success) {
        alert('Contraseña actualizada con éxito');
        this.router.navigate(['/login']);
      } else {
        alert(res.error || 'Datos incorrectos');
      }
    });
  }
}
