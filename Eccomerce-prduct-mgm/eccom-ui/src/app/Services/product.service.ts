import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/envirnoments';
import { catchError, Observable, throwError } from 'rxjs';
import { Product } from '../Interface/Product.interface';
import { AuthService } from './auth.service';
import { Category } from '../Interface/Category.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private Base_URL = environment.baseUrl+"/products";

  constructor(private http: HttpClient,
              private authService: AuthService
  ) { }


  // pagination
  getProducts(page: number, limit: number, search: string): Observable<Product[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('search',search.toString());

    return this.http.get<Product[]>(this.Base_URL, { params }).pipe(
      catchError(this.handleError)
    );
  }


  getProductByUserId(page: number, limit: number, search: string):Observable<Product[]>{
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('search',search.toString());

    const userId = this.authService.getUserId() || '';
         return this.http.get<Product[]>(this.Base_URL+'/getall/'+userId, { params }).pipe(
          catchError(this.handleError)
         );
  }


  // suggestions
  getSuggestions(searchSuggestions:string):Observable<any>{
    const params = new HttpParams()
      .set('search', searchSuggestions.toString());

    return this.http.get<any>(this.Base_URL+'/suggestion', { params }).pipe(
      catchError(this.handleError)
    );
  }


  // GET product by ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.Base_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // POST create a new product
  createProduct(product: any): Observable<any> {
    return this.http.post<any>(this.Base_URL+"/upload", product).pipe(
      catchError(this.handleError)
    );
  }


  // PUT update an existing product
  updateProduct(id: number, product: any ): Observable<any> {
    return this.http.put<any>(`${this.Base_URL}/${id}`, product).pipe(
      catchError(this.handleError)
    );
  }


  // DELETE a product
  deleteProduct(id: number): Observable<void> {
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
