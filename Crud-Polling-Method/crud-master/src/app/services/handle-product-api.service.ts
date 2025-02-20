import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleProductApiService {

  private BaseCat_URL = "http://localhost:8000/category/get-all-category"
  private Base_URL = "http://localhost:8000/product/get-all-product"
  private Edit_URL = "http://localhost:8000/product/edit-product/"
  private Delete_URL = "http://localhost:8000/product/delete-product/"
  private Add_URL = "http://localhost:8000/product/post-product"
  private Truncate_URL = "http://localhost:8000/product/delete-all-product"

  constructor(private http:HttpClient) { }

  getProductData(page:number):Observable<any>{
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<any>(this.Base_URL,{ params })
  }

  postProductData(data:any):Observable<any>{
    return this.http.post<any>(this.Add_URL,data)
  }

  putProductData(id:number,data:any):Observable<any>{
    return this.http.put<any>(this.Edit_URL+id,data);
  }

  deleteProductData(id:number):Observable<any>{
    return this.http.delete<any>(this.Delete_URL+id)
  }

  truncateProductData():Observable<any>{
    return this.http.delete<any>(this.Truncate_URL)
  }



  getCategoryData():Observable<any>{
    return this.http.get<any>(this.BaseCat_URL);
  }


}
