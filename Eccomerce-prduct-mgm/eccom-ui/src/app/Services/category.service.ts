import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/envirnoments';
import { catchError, Observable, throwError } from 'rxjs';
import { Category } from '../Interface/Category.interface';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private Base_URL = environment.baseUrl+"/categories";
  
    constructor(
      private http: HttpClient,
      private authService:AuthService
    ) { }
  
    // GET all Categorys
    getCategorysAll(): Observable<Category[]> {
      return this.http.get<Category[]>(this.Base_URL).pipe(
        catchError(this.handleError)
      );
    }


    // GET all suggestions
    getSuggestions(searchSuggestions:string): Observable<any>{
      const params = new HttpParams()
                .set('search', searchSuggestions.toString());
      return this.http.get(this.Base_URL+'/suggestion', { params }).pipe(
        catchError(this.handleError)
      );
    }

    // GET all Categorys Pagination
    getCategorys(page: number, limit: number, search: string): Observable<Category[]> {
      const params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString())
            .set('search',search.toString());

          return this.http.get<Category[]>(this.Base_URL, { params }).pipe(
            catchError(this.handleError)
          );
    }


    getCategoryByUserId(page: number, limit: number, search: string):Observable<Category[]>{
      const params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString())
            .set('search',search.toString());
            const userId = this.authService.getUserId() || '';

         return this.http.get<Category[]>(this.Base_URL+'/getall/'+userId,{ params }).pipe(
          catchError(this.handleError)
         );
    }


    getCategoryByUserIdForm():Observable<Category[]>{
      const userId = this.authService.getUserId() || ''
         return this.http.get<Category[]>(this.Base_URL+'/getall/'+userId).pipe(
          catchError(this.handleError)
         );
    }
  
    // GET Category by ID
    getCategoryById(id: number): Observable<Category> {
      return this.http.get<Category>(`${this.Base_URL}/${id}`).pipe(
        catchError(this.handleError)
      );
    }
  
    // POST create a new Category
    createCategory(Category: any): Observable<any> {
      return this.http.post<any>(this.Base_URL, Category).pipe(
        catchError(this.handleError)
      );
    }
  
  
    // PUT update an existing Category
    updateCategory(id: number, Category: any ): Observable<any> {
      return this.http.put<any>(`${this.Base_URL}/${id}`, Category).pipe(
        catchError(this.handleError)
      );
    }
  
  
    // DELETE a Category
    deleteCategory(id: number): Observable<void> {
      return this.http.delete<void>(`${this.Base_URL}/${id}`).pipe(
        catchError(this.handleError)
      );
    }
  
    // Error handling method
    private handleError(error: HttpErrorResponse) {
      console.error('API Error:', error);
      return throwError(() => new Error(error.message || 'Something went wrong'));
    }

}
