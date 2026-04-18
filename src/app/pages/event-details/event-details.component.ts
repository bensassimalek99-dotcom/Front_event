import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { InscriptionService } from '../../services/inscription.service';
import { AuthService } from '../../services/auth.service';
import { Event } from '../../models/event';
import { StatutInscription } from '../../models/inscription';
import { ToastrService } from 'ngx-toastr';
import * as L from 'leaflet';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  event: Event | null = null;
  loading = true;
  errorMessage: string | null = null;
  map: L.Map | null = null;
  
  // Inscription
  estInscrit = false;
  statutInscription: StatutInscription | null = null;
  inscriptionEnCours = false;

  placesRestantes: number | null = null;
loadingPlaces = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private inscriptionService: InscriptionService,
    public authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    if (!id || isNaN(id)) {
      this.errorMessage = 'ID d\'événement invalide';
      this.loading = false;
      return;
    }

    this.loadEvent(id);
    this.checkInscription(id);
  }

  loadEvent(id: number) {
    this.eventService.getEventById(id).subscribe({
      next: (event) => {
        this.event = event;
        this.loadPlacesRestantes();
        this.loading = false;
        
        setTimeout(() => {
          this.initMap();
        }, 100);
      },
      error: (err) => {
        console.error('Erreur chargement événement:', err);
        this.errorMessage = 'Impossible de charger l\'événement';
        this.loading = false;
      }
    });
  }

  checkInscription(evenementId: number) {
    if (!this.authService.isAuthenticated()) {
      return;
    }

    this.inscriptionService.checkInscription(evenementId).subscribe({
      next: (response) => {
        this.estInscrit = response.inscrit;
        this.statutInscription = response.statut || null;
      },
      error: (err) => {
        console.error('Erreur vérification inscription:', err);
      }
    });
  }

  sInscrire() {
    if (!this.event) return;

    if (!this.authService.isAuthenticated()) {
      this.toastr.info('Veuillez vous connecter pour vous inscrire', 'Connexion requise');
      this.router.navigate(['/login']);
      return;
    }

    this.inscriptionEnCours = true;

    this.inscriptionService.inscrire({ evenementId: this.event.id! }).subscribe({
      next: (inscription) => {
        this.inscriptionEnCours = false;
        this.estInscrit = true;
        this.statutInscription = inscription.statut;
        this.toastr.success('Inscription enregistrée ! En attente de validation par l\'admin.', 'Succès');
      },
      error: (err) => {
        this.inscriptionEnCours = false;
        console.error('Erreur inscription:', err);
        const message = err.error?.error || 'Impossible de s\'inscrire';
        this.toastr.error(message, 'Erreur');
      }
    });
  }

  initMap() {
    if (!this.event || this.map) return;

    this.map = L.map('detail-map').setView([this.event.latitude, this.event.longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    L.marker([this.event.latitude, this.event.longitude])
      .addTo(this.map)
      .bindPopup(`<b>${this.event.titre}</b><br>${this.event.lieu}`)
      .openPopup();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getStatutText(): string {
    switch (this.statutInscription) {
      case StatutInscription.EN_ATTENTE:
        return 'En attente de validation';
      case StatutInscription.VALIDEE:
        return 'Inscription validée';
      case StatutInscription.REFUSEE:
        return 'Inscription refusée';
      default:
        return '';
    }
  }

  getStatutClass(): string {
    switch (this.statutInscription) {
      case StatutInscription.EN_ATTENTE:
        return 'statut-attente';
      case StatutInscription.VALIDEE:
        return 'statut-validee';
      case StatutInscription.REFUSEE:
        return 'statut-refusee';
      default:
        return '';
    }
  }

  goBack() {
    this.router.navigate(['/listing']);
  }

  loadPlacesRestantes() {
  if (!this.event?.id) return;
  
  this.loadingPlaces = true;
  
  this.eventService.getPlacesRestantes(this.event.id).subscribe({
    next: (places) => {
      this.placesRestantes = places;
      this.loadingPlaces = false;
    },
    error: (err) => {
      console.error('Erreur chargement places:', err);
      this.loadingPlaces = false;
    }
  });
}

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }
}