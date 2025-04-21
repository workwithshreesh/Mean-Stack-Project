import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/envirnoments';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl + '/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string; role: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials).pipe(
      tap(user => {
        const authData = {
          token: user.token,
          role: user.role,
          id: user.id
        };
        localStorage.setItem('auth', JSON.stringify(authData));
      })
    );
  }

  register(data: { name: string; email: string; password: string; role: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, data);
  }

  getAuth(): { token: string; role: string; id: number } | null {
    const raw = localStorage.getItem('auth');
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  getToken(): string | null {
    const auth = this.getAuth();
    return auth?.token || null;
  }

  getUserId(): number | null {
    const auth = this.getAuth();
    return auth?.id || null;
  }

  getUserRole(): string | null {
    const auth = this.getAuth();
    return auth?.role || null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isSeller(): boolean {
    return this.getUserRole() === 'seller';
  }

  logout(): void {
    localStorage.removeItem('auth');
  }
}
