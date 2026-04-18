import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inscription, InscriptionRequest, CheckInscriptionResponse } from '../models/inscription';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  private apiUrl = '/api/inscriptions';

  constructor(private http: HttpClient) {}

  // S'inscrire à un événement
  inscrire(request: InscriptionRequest): Observable<Inscription> {
    const headers = this.getHeaders();
    return this.http.post<Inscription>(this.apiUrl, request, { headers });
  }

  // Mes inscriptions
  mesInscriptions(): Observable<Inscription[]> {
    const headers = this.getHeaders();
    return this.http.get<Inscription[]>(`${this.apiUrl}/me`, { headers });
  }

  // Vérifier si inscrit à un événement
  checkInscription(evenementId: number): Observable<CheckInscriptionResponse> {
    const headers = this.getHeaders();
    return this.http.get<CheckInscriptionResponse>(`${this.apiUrl}/check/${evenementId}`, { headers });
  }

  // ADMIN : Toutes les inscriptions
  toutesLesInscriptions(): Observable<Inscription[]> {
    const headers = this.getHeaders();
    return this.http.get<Inscription[]>(`${this.apiUrl}/admin/all`, { headers });
  }

  // ADMIN : Valider une inscription
  validerInscription(id: number): Observable<Inscription> {
    const headers = this.getHeaders();
    return this.http.put<Inscription>(`${this.apiUrl}/admin/${id}/validate`, {}, { headers });
  }

  // ADMIN : Refuser une inscription
  refuserInscription(id: number): Observable<Inscription> {
    const headers = this.getHeaders();
    return this.http.put<Inscription>(`${this.apiUrl}/admin/${id}/reject`, {}, { headers });
  }

  // Helper pour les headers avec JWT
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}