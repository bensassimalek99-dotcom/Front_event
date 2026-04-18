 export interface Event {
  id?: number;
  titre: string;
  description: string;
  dateDebut: string;
  dateFin: string;
  lieu: string;
  latitude: number;
  longitude: number;
  nbPlaces: number;
  imagePath?: string;
}

export interface EventRequest {
  titre: string;
  description: string;
  dateDebut: string;
  dateFin: string;
  lieu: string;
  latitude: number;
  longitude: number;
  nbPlaces: number;
  imagePath?: string;
}