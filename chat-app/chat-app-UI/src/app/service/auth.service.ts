import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonsettingService } from './commonsetting.service';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private baseUrl = 'http://localhost:5000/api/auth';

  constructor(
    private http: HttpClient, 
    private commonSetting: CommonsettingService,
    private router: Router
  ) {}

  login(credentials: { email: string; password: string; role: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials).pipe(
      tap(user => {
        const authData = {
          token: user.token,
          id: user.user.id,
          username: user.user.username
        };
        this.commonSetting.setSessionItem('auth', JSON.stringify(authData));
      })
    );
  }

  register(data: { name: string; email: string; password: string; role: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, data);
  }

  getAuth(): { token: string; role: string; id: number } | null {
    const raw = this.commonSetting.getSessionItem('auth');
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

  logout(): void {
    this.commonSetting.removeSessionItem('auth');
    this.router.navigate(['/auth/login'])
  }


}
