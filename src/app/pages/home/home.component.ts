import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';

declare var $: any;

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit {
  upcomingEvents: Event[] = [];
  loading = true;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    // Charge les événements à venir
    this.eventService.getAllEvents().subscribe({
      next: (events) => {
        // Trie par date et prend les 4 prochains
        const now = new Date();
        this.upcomingEvents = events
          .filter(e => new Date(e.dateDebut) >= now) // Événements futurs
          .sort((a, b) => new Date(a.dateDebut).getTime() - new Date(b.dateDebut).getTime()) // Trie par date
          .slice(0, 4); // Prend les 4 premiers
        
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement événements:', err);
        this.loading = false;
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (typeof $ !== 'undefined') {
        $(window).trigger('resize');
      }
    }, 200);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}