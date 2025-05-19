import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import { CommonsettingService } from './commonsetting.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8000/auth/'; // Your API base URL
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private commonSetting: CommonsettingService
  ) {
    const token = this.commonSetting.getSessionItem('jwtToken');
    this.currentUserSubject = new BehaviorSubject<any>(token ? jwtDecode(token) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  registerNewUser(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'register', data);
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'login', data).pipe(
      tap(response => {
        this.commonSetting.setSessionItem('jwtToken', response.token);  
        this.currentUserSubject.next(jwtDecode(response.token));  
      })
    );
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.currentUserSubject.next(null);  
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = this.commonSetting.getSessionItem('jwtToken');
    return token ? !this.isTokenExpired(token) : false;
  }

  private isTokenExpired(token: string): boolean {
    const decoded: any = jwtDecode(token);
    const exp = decoded.exp;
    return exp < Date.now() / 1000;
  }

  getToken() {
    return this.commonSetting.getSessionItem('jwtToken');
  }

  private getAuthHeaders() {
    const token = this.getToken();
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }

  getProtectedData(): Observable<any> {
    return this.http.get<any>('your-protected-api-url', { headers: this.getAuthHeaders() });
  }
}
