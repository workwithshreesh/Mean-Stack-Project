import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CommonsettingService } from './commonsetting.service';

interface JwtTokenPayload {
  exp: number;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:8000/auth/';
  private readonly tokenKey = 'jwtToken';

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser$: Observable<any>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private commonSetting: CommonsettingService
  ) {
    const token = this.getToken();
    const user = token ? this.decodeToken(token) : null;

    this.currentUserSubject = new BehaviorSubject<any>(user);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  // --- Auth APIs ---

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}register`, data).pipe(
      catchError(this.handleError)
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}login`, credentials).pipe(
      tap(response => {
        this.setToken(response.token);
        const user = this.decodeToken(response.token);
        this.currentUserSubject.next(user);
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    this.clearToken();
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  // --- Token Methods ---

  getToken(): string | null {
    return this.commonSetting.getSessionItem(this.tokenKey);
  }

  private setToken(token: string): void {
    this.commonSetting.setSessionItem(this.tokenKey, token);
  }

  private clearToken(): void {
    this.commonSetting.removeSessionItem(this.tokenKey); // added remove method support
  }

  private decodeToken(token: string): JwtTokenPayload | null {
    try {
      return jwtDecode<JwtTokenPayload>(token);
    } catch {
      return null;
    }
  }

  private isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    return decoded.exp < Math.floor(Date.now() / 1000);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.isTokenExpired(token) : false;
  }

  get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // --- API Example with Secret Key Header ---

  getProtectedData(): Observable<any> {
    return this.http.get<any>('your-protected-api-url', {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : new HttpHeaders();
  }

  // --- Error Handler ---

  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMsg = error.error?.message || error.message || 'An unknown error occurred';
    console.error('AuthService Error:', errorMsg);
    return throwError(() => new Error(errorMsg));
  }
}
