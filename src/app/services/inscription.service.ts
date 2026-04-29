import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inscription, InscriptionRequest, CheckInscriptionResponse } from '../models/inscription';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  private apiUrl = `${environment.apiUrl}/inscriptions`;
  constructor(private http: HttpClient) {}

  inscrire(request: InscriptionRequest): Observable<Inscription> {
    return this.http.post<Inscription>(this.apiUrl, request, { headers: this.getHeaders() });
  }

  mesInscriptions(): Observable<Inscription[]> {
    return this.http.get<Inscription[]>(`${this.apiUrl}/me`, { headers: this.getHeaders() });
  }

  checkInscription(evenementId: number): Observable<CheckInscriptionResponse> {
    return this.http.get<CheckInscriptionResponse>(`${this.apiUrl}/check/${evenementId}`, { headers: this.getHeaders() });
  }

  toutesLesInscriptions(): Observable<Inscription[]> {
    return this.http.get<Inscription[]>(`${this.apiUrl}/admin/all`, { headers: this.getHeaders() });
  }

  validerInscription(id: number): Observable<Inscription> {
    return this.http.put<Inscription>(`${this.apiUrl}/admin/${id}/validate`, {}, { headers: this.getHeaders() });
  }

  refuserInscription(id: number): Observable<Inscription> {
    return this.http.put<Inscription>(`${this.apiUrl}/admin/${id}/reject`, {}, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }
}