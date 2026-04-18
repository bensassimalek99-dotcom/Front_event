export interface ContactRequest {
  nom: string;
  email: string;
  telephone?: string;
  sujet: string;
  message: string;
}