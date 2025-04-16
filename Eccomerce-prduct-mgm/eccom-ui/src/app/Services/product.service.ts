import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/envirnoments';
import { catchError, Observable, throwError } from 'rxjs';
import { Product } from '../Interface/Product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private Base_URL = environment.baseUrl+"/products";

  constructor(private http: HttpClient) { }

  // GET all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.Base_URL).pipe(
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
    return this.http.post<any>(this.Base_URL+"upload", product).pipe(
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
