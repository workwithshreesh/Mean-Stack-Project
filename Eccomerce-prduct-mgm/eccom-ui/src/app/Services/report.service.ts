import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/envirnoments';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  Base_url = environment.baseUrl + '/api/report/';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // Get report of seller
  getReportData():Observable<any>{
    const userId = this.authService.getAuth() || '';
    return this.http.get<any>(this.Base_url + userId ).pipe(
      catchError(this.handleError)
    );
  }


  
  // Error handler
  private handleError(error: HttpErrorResponse) {
    console.error('API Error', error);
    return throwError(() => new Error(error.message || "Something went wrong"));
  }

}
