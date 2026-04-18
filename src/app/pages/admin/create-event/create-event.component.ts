import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { EventRequest } from '../../../models/event';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  eventData: EventRequest = {
    titre: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    lieu: '',
    latitude: 36.8065,
    longitude: 10.1815,
    nbPlaces: 0,
    imagePath: ''
  };

  loading = false;

  constructor(
    private eventService: EventService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    // Validation
    if (!this.eventData.titre || !this.eventData.dateDebut || !this.eventData.lieu) {
      this.toastr.error('Veuillez remplir tous les champs obligatoires', 'Erreur');
      return;
    }

    this.loading = true;

    this.eventService.createEvent(this.eventData).subscribe({
      next: (createdEvent) => {
        this.loading = false;
        this.toastr.success('Événement créé avec succès !', 'Succès');
        this.router.navigate(['/listing']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Erreur création:', err);
        this.toastr.error('Impossible de créer l\'événement', 'Erreur');
      }
    });
  }

  cancel() {
    this.router.navigate(['/listing']);
  }
}