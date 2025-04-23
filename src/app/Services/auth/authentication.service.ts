// services/authentication.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loginUrl = 'http://13.51.48.201:3000/api/v1/auth/login';
  private registerUrl = 'http://13.51.48.201:3000/api/v1/auth/register';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.loginUrl, { email, password },{ withCredentials: true } );
  }

  register(data: any): Observable<any> {
    return this.http.post(this.registerUrl, data, { withCredentials: true });
  }

  logout(): void {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserRole(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role_name : null;
  }
}
