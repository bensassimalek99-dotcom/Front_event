import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ContactRequest } from '../../models/contact';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  contactData: ContactRequest = {
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: ''
  };

  loading = false;

  constructor(
    private contactService: ContactService,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    // Validation
    if (!this.contactData.nom || !this.contactData.email || !this.contactData.message) {
      this.toastr.error('Veuillez remplir tous les champs obligatoires', 'Erreur');
      return;
    }

    // Validation email basique
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.contactData.email)) {
      this.toastr.error('Veuillez entrer un email valide', 'Erreur');
      return;
    }

    this.loading = true;

    this.contactService.sendMessage(this.contactData).subscribe({
      next: (response) => {
        this.loading = false;
        this.toastr.success('Votre message a été envoyé avec succès !', 'Succès');
        
        // Réinitialise le formulaire
        this.contactData = {
          nom: '',
          email: '',
          telephone: '',
          sujet: '',
          message: ''
        };
      },
      error: (err) => {
        this.loading = false;
        console.error('Erreur envoi message:', err);
        this.toastr.error('Impossible d\'envoyer le message', 'Erreur');
      }
    });
  }
}