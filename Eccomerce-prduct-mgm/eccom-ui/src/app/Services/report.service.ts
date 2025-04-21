import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/envirnoments';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx'

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  Base_url = environment.baseUrl + '/report/';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // Get report of seller
  getReportData():Observable<any>{
    const userId = this.authService.getUserId() || '';
    console.log("api url", userId)
    return this.http.get<any>(this.Base_url + userId ).pipe(
      catchError(this.handleError)
    );
  }


  // Download excel
  downloadAsExcel(data: any[], fileName: string){
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array'});
    FileSaver.saveAs(new Blob([excelBuffer]), `${fileName}.xlsx`)
  }


  // Download CSV
  downloadAsCSV(data: any[], fileName: string){
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([workbook], { type: 'text/csv' });
    FileSaver.saveAs(blob, `${fileName}.csv`);
  }


  
  // Error handler
  private handleError(error: HttpErrorResponse) {
    console.error('API Error', error);
    return throwError(() => new Error(error.message || "Something went wrong"));
  }

}
