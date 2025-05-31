import { forwardRef, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CommonsettingService } from './commonsetting.service';
import { WebSocketService } from './web-socket.service';

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
  private readonly userKey = 'userDetail';


  private currentUserSubject: BehaviorSubject<any>;
  public currentUser$: Observable<any>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private commonSetting: CommonsettingService,
   private WebSocketService: WebSocketService
  ) {
    const token = this.commonSetting.getSessionItem(this.tokenKey);
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
        this.commonSetting.setSessionItem(this.tokenKey, response.token);
        const user = this.decodeToken(response.token);
        this.commonSetting.setSessionItem(this.userKey, JSON.stringify(user))
        this.currentUserSubject.next(user);
        this.WebSocketService.connect(response.token);
        console.log('token',user?.['userId'])
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    this.commonSetting.removeSessionItem(this.tokenKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
    this.http.post(`${this.baseUrl}logout`,'xyz').subscribe(()=> {
      console.log("logout api is called");
    })
  }

  // --- Token Methods ---

  getToken(): string | null {
    return this.commonSetting.getSessionItem(this.tokenKey);
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
    const token = this.commonSetting.getSessionItem(this.tokenKey);
    return token
      ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
      : new HttpHeaders();
  }

  // --- Error Handler ---

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('AuthService Error:', error);
    const errorMsg = error.error.error || 'An unknown error occurred';
    return throwError(() => errorMsg);
  }
}
