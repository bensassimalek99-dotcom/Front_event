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
    // Validation basique
    if (!this.loginData.email || !this.loginData.password) {
      this.toastr.error('Veuillez remplir tous les champs', 'Erreur');
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.loading = false;
        this.toastr.success('Connexion réussie !', 'Bienvenue');
        setTimeout(() => {
          this.router.navigate(['/listing']);
        }, 1000);
      },
      error: (err) => {
        this.loading = false;
        console.error('Erreur login:', err);
        
        if (err.status === 401) {
          this.errorMessage = 'Email ou mot de passe incorrect';
          this.toastr.error('Email ou mot de passe incorrect', 'Erreur');
        } else {
          this.errorMessage = 'Une erreur est survenue';
          this.toastr.error('Impossible de se connecter', 'Erreur');
        }
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}