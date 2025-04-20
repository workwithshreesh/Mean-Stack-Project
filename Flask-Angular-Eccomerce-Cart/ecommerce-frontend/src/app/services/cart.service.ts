import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private CartBase_Url = "http://127.0.0.1:5000/cart/"
  Image_Url = "http://127.0.0.1:5000/images/"

  constructor(private http:HttpClient) { }

  getCartData():Observable<any>{
    return this.http.get<any>(this.CartBase_Url)
  }

  postCartData(data:any):Observable<any>{
    return this.http.post<any>(this.CartBase_Url,data)
  }

  deleteCartData(id:number):Observable<any>{
    return this.http.delete<any>(this.CartBase_Url+id)
  }

}
