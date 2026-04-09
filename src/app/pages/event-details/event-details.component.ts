import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';
import * as L from 'leaflet';

@Component({
    selector: 'app-event-details',
    imports: [CommonModule, RouterModule],
    templateUrl: './event-details.component.html',
    styleUrl: './event-details.component.css'
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  event: Event | null = null;
  loading = true;
  errorMessage = '';
  private miniMap: L.Map | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) { this.router.navigate(['/listing']); return; }

    this.eventService.getEventById(id).subscribe({
      next: (data) => {
        this.event = data;
        this.loading = false;
        if (data.latitude && data.longitude) {
          setTimeout(() => this.initMiniMap(data.latitude, data.longitude), 80);
        }
      },
      error: () => {
        this.errorMessage = "Événement introuvable ou erreur réseau.";
        this.loading = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.miniMap) { this.miniMap.remove(); this.miniMap = null; }
  }

  private initMiniMap(lat: number, lng: number) {
    const el = document.getElementById('mini-map');
    if (!el) return;

    this.miniMap = L.map('mini-map', { center: [lat, lng], zoom: 14, zoomControl: false, dragging: false, scrollWheelZoom: false });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.miniMap);

    const icon = L.divIcon({
      className: '',
      html: `<svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.16 0 0 7.16 0 16C0 28 16 42 16 42C16 42 32 28 32 16C32 7.16 24.84 0 16 0Z" fill="url(#g)"/>
        <circle cx="16" cy="16" r="7" fill="white" opacity="0.95"/>
        <circle cx="16" cy="16" r="3.5" fill="#667eea"/>
        <defs><linearGradient id="g" x1="0" y1="0" x2="32" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#667eea"/><stop offset="100%" stop-color="#764ba2"/>
        </linearGradient></defs>
      </svg>`,
      iconSize: [32, 42], iconAnchor: [16, 42], popupAnchor: [0, -44]
    });

    L.marker([lat, lng], { icon }).addTo(this.miniMap);
  }

  goBack() { this.router.navigate(['/listing']); }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
    });
  }
}
