import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { Event, EventRequest } from '../../../models/event';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  eventId!: number;
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

  loading = true;
  saving = false;

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // Récupère l'ID depuis l'URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    if (!id || isNaN(id)) {
      this.toastr.error('ID d\'événement invalide', 'Erreur');
      this.router.navigate(['/listing']);
      return;
    }

    this.eventId = id;

    // Charge l'événement
    this.eventService.getEventById(id).subscribe({
      next: (event) => {
        // Convertit les dates au format datetime-local
        this.eventData = {
          titre: event.titre,
          description: event.description || '',
          dateDebut: this.formatDateForInput(event.dateDebut),
          dateFin: event.dateFin ? this.formatDateForInput(event.dateFin) : '',
          lieu: event.lieu,
          latitude: event.latitude,
          longitude: event.longitude,
          nbPlaces: event.nbPlaces,
          imagePath: event.imagePath || ''
        };
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement:', err);
        this.toastr.error('Impossible de charger l\'événement', 'Erreur');
        this.loading = false;
        this.router.navigate(['/listing']);
      }
    });
  }

  formatDateForInput(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  }

  onSubmit() {
    // Validation
    if (!this.eventData.titre || !this.eventData.dateDebut || !this.eventData.lieu) {
      this.toastr.error('Veuillez remplir tous les champs obligatoires', 'Erreur');
      return;
    }

    this.saving = true;

    this.eventService.updateEvent(this.eventId, this.eventData).subscribe({
      next: (updatedEvent) => {
        this.saving = false;
        this.toastr.success('Événement modifié avec succès !', 'Succès');
        this.router.navigate(['/listing']);
      },
      error: (err) => {
        this.saving = false;
        console.error('Erreur modification:', err);
        this.toastr.error('Impossible de modifier l\'événement', 'Erreur');
      }
    });
  }

  cancel() {
    this.router.navigate(['/listing']);
  }
}