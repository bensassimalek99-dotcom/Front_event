export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  latitude: number;
  longitude: number;
  imageUrl?: string;
  category?: string;
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
