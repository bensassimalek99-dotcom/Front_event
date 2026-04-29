 import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';

interface JwtPayload {
  sub: string;
  exp: number;
  roles: string[];
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  adresse: string;
}

interface AuthResponse {
  token: string;
  email?: string;
  nom?: string;
  prenom?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  constructor(private http: HttpClient) {}

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

 getToken(): string | null {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
}
  isAuthenticated(): boolean {
  const token = localStorage.getItem('token');
  console.log('isAuthenticated - token:', token ? 'présent' : 'null');
  if (!token) return false;
  
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const now = Date.now() / 1000;
    console.log('decoded:', decoded);
    console.log('exp:', decoded.exp, 'now:', now, 'valid:', decoded.exp > now);
    
    if (decoded.exp < now) {
      this.logout();
      return false;
    }
    return true;
  } catch (error) {
    console.log('decode error:', error);
    return false;
  }
}
  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.roles?.includes('ADMIN') || false;
    } catch (error) {
      return false;
    }
  }

  getCurrentUser(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.sub;
    } catch (error) {
      return null;
    }
  }
}