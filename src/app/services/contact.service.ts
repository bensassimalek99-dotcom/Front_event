import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactRequest } from '../models/contact';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = `${environment.apiUrl}/contact`;
  constructor(private http: HttpClient) {}

  sendMessage(contact: ContactRequest): Observable<any> {
    return this.http.post(this.apiUrl, contact);
  }
}