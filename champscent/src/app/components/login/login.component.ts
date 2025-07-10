import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, RouterModule]
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(res => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('rol', res.rol);
        this.router.navigate(['/catalogo']);
      } else {
        alert(res.error || 'Credenciales incorrectas');
      }
    });
  }
}
