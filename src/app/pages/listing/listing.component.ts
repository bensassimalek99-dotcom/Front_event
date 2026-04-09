import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';
import * as L from 'leaflet';

@Component({
    selector: 'app-listing',
    imports: [RouterModule, CommonModule],
    templateUrl: './listing.component.html',
    styleUrl: './listing.component.css'
})
export class ListingComponent implements OnInit, AfterViewInit, OnDestroy {
  events: Event[] = [];
  loading = true;
  errorMessage = '';
  private map: L.Map | null = null;
  private mapReady = false;

  /** Skeleton placeholder array for loading state */
  skeletons = Array(6);

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit() {
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.loading = false;
        if (this.mapReady) this.addMarkers();
      },
      error: () => {
        this.errorMessage = 'Impossible de charger les événements. Vérifiez votre connexion.';
        this.loading = false;
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => this.initMap(), 50);
  }

  ngOnDestroy() {
    if (this.map) { this.map.remove(); this.map = null; }
  }

  retry() {
    this.errorMessage = '';
    this.loading = true;
    this.ngOnInit();
  }

  private initMap() {
    this.map = L.map('events-map', { center: [36.8065, 10.1815], zoom: 11 });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    this.mapReady = true;
    if (this.events.length > 0) this.addMarkers();
  }

  private createMarkerIcon() {
    return L.divIcon({
      className: '',
      html: `
        <div style="
          width:36px; height:44px; position:relative; cursor:pointer;
          filter: drop-shadow(0 3px 6px rgba(102,126,234,0.5));
        ">
          <svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 0C8.06 0 0 8.06 0 18C0 31.5 18 44 18 44C18 44 36 31.5 36 18C36 8.06 27.94 0 18 0Z"
              fill="url(#markerGrad)"/>
            <circle cx="18" cy="18" r="8" fill="white" opacity="0.95"/>
            <circle cx="18" cy="18" r="4" fill="#667eea"/>
            <defs>
              <linearGradient id="markerGrad" x1="0" y1="0" x2="36" y2="44" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#667eea"/>
                <stop offset="100%" stop-color="#764ba2"/>
              </linearGradient>
            </defs>
          </svg>
        </div>`,
      iconSize: [36, 44],
      iconAnchor: [18, 44],
      popupAnchor: [0, -46]
    });
  }

  private addMarkers() {
    if (!this.map) return;

    // Clear existing markers
    this.map.eachLayer(layer => {
      if (layer instanceof L.Marker) this.map!.removeLayer(layer);
    });

    const bounds: L.LatLng[] = [];

    this.events.forEach(event => {
      if (event.latitude && event.longitude) {
        const lat = event.latitude;
        const lng = event.longitude;
        const dateStr = event.date
          ? new Date(event.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
          : '';

        const popup = `
          <div style="min-width:200px; font-family:Inter,sans-serif;">
            <div style="font-weight:700; font-size:0.92rem; color:#1f2937; margin-bottom:6px; line-height:1.3;">
              ${this.escapeHtml(event.title)}
            </div>
            ${dateStr ? `<div style="font-size:0.8rem; color:#6b7280; margin-bottom:4px;">📅 ${dateStr}</div>` : ''}
            ${event.location ? `<div style="font-size:0.8rem; color:#6b7280; margin-bottom:10px;">📍 ${this.escapeHtml(event.location)}</div>` : ''}
            <a href="/event/${event.id}"
               style="display:inline-block; background:linear-gradient(135deg,#667eea,#764ba2);
                      color:#fff; padding:6px 14px; border-radius:6px; font-size:0.8rem;
                      font-weight:600; text-decoration:none;">
              Voir les détails →
            </a>
          </div>`;

        L.marker([lat, lng], { icon: this.createMarkerIcon() })
          .addTo(this.map!)
          .bindPopup(popup, { maxWidth: 260, className: 'ev-popup' });

        bounds.push(L.latLng(lat, lng));
      }
    });

    if (bounds.length > 1) {
      this.map.fitBounds(L.latLngBounds(bounds), { padding: [40, 40] });
    }
  }

  private escapeHtml(str: string): string {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  goToDetails(id: number) {
    this.router.navigate(['/event', id]);
  }
}
