export interface Inscription {
  id?: number;
  evenementId: number;
  evenementTitre?: string;
  evenementLieu?: string;
  evenementDateDebut?: string;
  utilisateurId?: number;
  utilisateurNom?: string;
  utilisateurEmail?: string;
  statut: StatutInscription;
  dateInscription?: string;
  dateValidation?: string;
}

export interface InscriptionRequest {
  evenementId: number;
}

export enum StatutInscription {
  EN_ATTENTE = 'EN_ATTENTE',
  VALIDEE = 'VALIDEE',
  REFUSEE = 'REFUSEE'
}

export interface CheckInscriptionResponse {
  inscrit: boolean;
  statut?: StatutInscription;
  inscriptionId?: number;
}