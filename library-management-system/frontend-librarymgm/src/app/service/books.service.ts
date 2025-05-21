import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  Base_Url = "http://localhost:8000/books/book/"

  constructor(
    private http:HttpClient
  ) { }

  getAllBookData(userId:string):Observable<any>{
    return this.http.get<any>(`${this.Base_Url}${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  postBookData(data:any):Observable<any>{
    return this.http.post(this.Base_Url, data).pipe(
      catchError(this.handleError)
    );
  }

  updateBook(id:any, data:any):Observable<any>{
    return this.http.put(this.Base_Url+id,data).pipe(
      catchError(this.handleError)
    );
  }

  getBookById(id:any):Observable<any>{
    return this.http.get(this.Base_Url+id).pipe(
      catchError(this.handleError)
    );
  }

  DeleteBook(id:any):Observable<any>{
    return this.http.delete<any>(this.Base_Url+id).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse): Observable<never>{
    let errorMsg = error.error.error || "An unknown error occurred";
    return throwError(()=> errorMsg);
  }

}
