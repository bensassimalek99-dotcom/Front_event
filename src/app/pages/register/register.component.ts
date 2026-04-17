import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    adresse: ''
  };
  
  errorMessage = '';
  successMessage = '';
  loading = false;
  showPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    // Validation basique
    if (!this.registerData.nom || !this.registerData.email || !this.registerData.password) {
      this.toastr.error('Veuillez remplir tous les champs obligatoires', 'Erreur');
      return;
    }

    if (this.registerData.password.length < 6) {
      this.toastr.error('Le mot de passe doit contenir au moins 6 caractères', 'Erreur');
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(this.registerData).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success('Inscription réussie ! Vous pouvez maintenant vous connecter.', 'Succès');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        this.loading = false;
        console.error('Erreur inscription:', err);
        
        if (err.status === 409) {
          this.errorMessage = 'Cet email est déjà utilisé';
          this.toastr.error('Cet email est déjà utilisé', 'Erreur');
        } else {
          this.errorMessage = 'Une erreur est survenue lors de l\'inscription';
          this.toastr.error('Une erreur est survenue', 'Erreur');
        }
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}