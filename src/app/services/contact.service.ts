import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactRequest } from '../models/contact';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://eventura-backend-hfa0g8f7cvcfhmce.italynorth-01.azurewebsites.net/api/contact';
  constructor(private http: HttpClient) {}

  sendMessage(contact: ContactRequest): Observable<any> {
    return this.http.post(this.apiUrl, contact);
  }
}