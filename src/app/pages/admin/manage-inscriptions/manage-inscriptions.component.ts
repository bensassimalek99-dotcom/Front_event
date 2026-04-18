import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionService } from '../../../services/inscription.service';
import { Inscription, StatutInscription } from '../../../models/inscription';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-inscriptions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-inscriptions.component.html',
  styleUrls: ['./manage-inscriptions.component.css']
})
export class ManageInscriptionsComponent implements OnInit {
  inscriptions: Inscription[] = [];
  filteredInscriptions: Inscription[] = [];
  loading = true;
  
  // Filtres
  filtreStatut: string = 'TOUS';
  
  // Pour le TS (éviter erreur)
  StatutInscription = StatutInscription;

  constructor(
    private inscriptionService: InscriptionService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadInscriptions();
  }

  loadInscriptions() {
    this.loading = true;
    
    this.inscriptionService.toutesLesInscriptions().subscribe({
      next: (inscriptions) => {
        this.inscriptions = inscriptions;
        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement inscriptions:', err);
        this.toastr.error('Impossible de charger les inscriptions', 'Erreur');
        this.loading = false;
      }
    });
  }

  applyFilter() {
    if (this.filtreStatut === 'TOUS') {
      this.filteredInscriptions = [...this.inscriptions];
    } else {
      this.filteredInscriptions = this.inscriptions.filter(
        i => i.statut === this.filtreStatut
      );
    }
  }

  setFilter(statut: string) {
    this.filtreStatut = statut;
    this.applyFilter();
  }

  valider(inscription: Inscription) {
    if (!inscription.id) return;

    if (!confirm(`Valider l'inscription de ${inscription.utilisateurNom} pour "${inscription.evenementTitre}" ?`)) {
      return;
    }

    this.inscriptionService.validerInscription(inscription.id).subscribe({
      next: (updated) => {
        // Met à jour dans la liste
        const index = this.inscriptions.findIndex(i => i.id === inscription.id);
        if (index !== -1) {
          this.inscriptions[index] = updated;
          this.applyFilter();
        }
        
        this.toastr.success('Inscription validée avec succès !', 'Succès');
      },
      error: (err) => {
        console.error('Erreur validation:', err);
        const message = err.error?.error || 'Impossible de valider l\'inscription';
        this.toastr.error(message, 'Erreur');
      }
    });
  }

  refuser(inscription: Inscription) {
    if (!inscription.id) return;

    if (!confirm(`Refuser l'inscription de ${inscription.utilisateurNom} pour "${inscription.evenementTitre}" ?`)) {
      return;
    }

    this.inscriptionService.refuserInscription(inscription.id).subscribe({
      next: (updated) => {
        // Met à jour dans la liste
        const index = this.inscriptions.findIndex(i => i.id === inscription.id);
        if (index !== -1) {
          this.inscriptions[index] = updated;
          this.applyFilter();
        }
        
        this.toastr.info('Inscription refusée', 'Info');
      },
      error: (err) => {
        console.error('Erreur refus:', err);
        const message = err.error?.error || 'Impossible de refuser l\'inscription';
        this.toastr.error(message, 'Erreur');
      }
    });
  }

  getStatutClass(statut: StatutInscription): string {
    switch (statut) {
      case StatutInscription.EN_ATTENTE:
        return 'badge-attente';
      case StatutInscription.VALIDEE:
        return 'badge-validee';
      case StatutInscription.REFUSEE:
        return 'badge-refusee';
      default:
        return '';
    }
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  getCountEnAttente(): number {
  return this.inscriptions.filter(i => i.statut === StatutInscription.EN_ATTENTE).length;
}

getCountValidee(): number {
  return this.inscriptions.filter(i => i.statut === StatutInscription.VALIDEE).length;
}

getCountRefusee(): number {
  return this.inscriptions.filter(i => i.statut === StatutInscription.REFUSEE).length;
}
}