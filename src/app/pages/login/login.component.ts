import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
    private router: Router
  ) {}

  onSubmit() {
  this.loading = true;
  this.errorMessage = '';

  this.authService.login(this.loginData).subscribe({
    next: (response) => {
      // Le token est déjà sauvegardé automatiquement par tap() dans AuthService
      this.loading = false;
      this.router.navigate(['/']);
    },
    error: (error) => {
      this.loading = false;
      this.errorMessage = 'Email ou mot de passe incorrect';
      console.error('Erreur login:', error);
    }
  });
}
onLogin() {
  this.authService.login(this.loginData).subscribe({
    next: (response) => {
      // Le token est automatiquement sauvegardé par tap() dans AuthService
      alert('Connexion réussie !');
      this.router.navigate(['/']);
    },
    error: (error) => {
      console.error('Erreur de connexion:', error);
      alert('Email ou mot de passe incorrect');
    }
  });
}
}