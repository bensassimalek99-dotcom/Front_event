 import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';
import * as L from 'leaflet';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  event: Event | null = null;
  loading = true;
  errorMessage = '';
  private map: L.Map | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {}

  ngOnInit() {
    // Récupère l'ID depuis l'URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    if (!id || isNaN(id)) {
      this.errorMessage = 'ID d\'événement invalide';
      this.loading = false;
      return;
    }

    // Charge l'événement
    this.eventService.getEventById(id).subscribe({
      next: (data) => {
        this.event = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement:', err);
        this.errorMessage = 'Impossible de charger cet événement';
        this.loading = false;
      }
    });
  }

  ngAfterViewInit() {
    // Attend un peu que l'événement soit chargé, puis initialise la carte
    setTimeout(() => {
      if (this.event && this.event.latitude && this.event.longitude) {
        this.initMap();
      }
    }, 100);
  }

  ngOnDestroy() {
    // Nettoie la carte quand on quitte la page
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }

  private initMap() {
    if (!this.event || !this.event.latitude || !this.event.longitude) return;

    // Crée la carte centrée sur l'événement
    this.map = L.map('detail-map').setView(
      [this.event.latitude, this.event.longitude], 
      14
    );

    // Ajoute la couche de tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    // Crée un marqueur violet personnalisé
    const violetIcon = L.divIcon({
      className: '',
      html: `
        <div style="width:36px; height:44px; filter: drop-shadow(0 3px 6px rgba(102,126,234,0.5));">
          <svg width="36" height="44" viewBox="0 0 36 44" fill="none">
            <path d="M18 0C8.06 0 0 8.06 0 18C0 31.5 18 44 18 44C18 44 36 31.5 36 18C36 8.06 27.94 0 18 0Z" fill="#667eea"/>
            <circle cx="18" cy="18" r="8" fill="white" opacity="0.95"/>
            <circle cx="18" cy="18" r="4" fill="#667eea"/>
          </svg>
        </div>`,
      iconSize: [36, 44],
      iconAnchor: [18, 44],
      popupAnchor: [0, -46]
    });

    // Ajoute le marqueur sur la carte
    L.marker([this.event.latitude, this.event.longitude], { icon: violetIcon })
      .addTo(this.map)
      .bindPopup(`
        <div style="text-align: center;">
          <strong>${this.event.titre}</strong><br>
          ${this.event.lieu}
        </div>
      `);
  }

  formatDate(date: string): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  goBack() {
    this.router.navigate(['/listing']);
  }

  register() {
    alert('Fonctionnalité d\'inscription à venir !');
  }
}