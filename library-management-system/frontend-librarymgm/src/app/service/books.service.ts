import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  Base_Url = "http://localhost:8000/books/book/"

  constructor(
    private http:HttpClient
  ) { }

  getAllBookData():Observable<any>{
    return this.http.get<any>(this.Base_Url);
  }

  postBookData(data:any):Observable<any>{
    return this.http.post(this.Base_Url, data)
  }

  updateBook(id:any, data:any):Observable<any>{
    return this.http.put(this.Base_Url+id,data)
  }

  getBookById(id:any):Observable<any>{
    return this.http.get(this.Base_Url+id);
  }

  DeleteBook(id:any):Observable<any>{
    return this.http.delete<any>(this.Base_Url+id);
  }

}
