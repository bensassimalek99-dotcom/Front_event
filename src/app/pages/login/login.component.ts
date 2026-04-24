import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { email: '', password: '' };
  errorMessage = '';
  loading = false;
  showPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    if (!this.loginData.email || !this.loginData.password) {
      this.toastr.error('Veuillez remplir tous les champs', 'Erreur');
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.toastr.success('Connexion réussie !', 'Bienvenue');
          this.router.navigate(['/listing']);
        } else {
          this.errorMessage = 'Token manquant dans la réponse';
          this.toastr.error(this.errorMessage, 'Erreur');
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'Email ou mot de passe incorrect';
        this.toastr.error(this.errorMessage, 'Erreur de connexion');
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  
}