import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, signal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  Base_Url = "http://localhost:8000/books/book/";
  readonly isLoading = signal(false)

  constructor(
    private http:HttpClient
  ) { }

  getAllBookData(userId:string):Observable<any>{
    this.isLoading.set(true);
    return this.http.get<any>(`${this.Base_Url}${userId}`).pipe(
      tap(() => {
        this.isLoading.set(false);
      }),
      catchError(this.handleError)
    );
  }

  postBookData(data:any):Observable<any>{
    this.isLoading.set(true);
    return this.http.post(this.Base_Url, data).pipe(
      tap(() => {
        this.isLoading.set(false);
      }),
      catchError(this.handleError)
    );
  }

  updateBook(id:any, data:any):Observable<any>{
    this.isLoading.set(true);
    return this.http.put(this.Base_Url+id,data).pipe(
      tap(() => {
        this.isLoading.set(false);
      }),
      catchError(this.handleError)
    );
  }

  getBookById(id:any):Observable<any>{
    this.isLoading.set(true);
    return this.http.get(this.Base_Url+id).pipe(
      tap(() => {
        this.isLoading.set(false);
      }),
      catchError(this.handleError)
    );
  }

  DeleteBook(id:any):Observable<any>{
    this.isLoading.set(true);
    return this.http.delete<any>(this.Base_Url+id).pipe(
      tap(() => {
        this.isLoading.set(false);
      }),
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse): Observable<never>{
    let errorMsg = error.error.error || "An unknown error occurred";
    return throwError(()=> errorMsg);
  }

}
