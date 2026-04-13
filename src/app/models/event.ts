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
  title: string;
  description: string;
  date: string;
  location: string;
  latitude: number;
  longitude: number;
  imageUrl?: string;
  category?: string;
}
