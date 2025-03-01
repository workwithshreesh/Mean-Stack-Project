import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private BaseProduct_Url = "http://127.0.0.1:5000/product/"

  constructor(private http:HttpClient) { }

  getProductdata():Observable<any>{
    return this.http.get<any>(this.BaseProduct_Url)
  }


  getProductdataById(id:any):Observable<any>{
    return this.http.get<any>(this.BaseProduct_Url+`${id}`)
  }


  postProductdata(Data:any):Observable<any>{
    return this.http.post<any>(this.BaseProduct_Url,Data)
  }

  putProductdata(id:any,data:any):Observable<any>{
    return this.http.put<any>(this.BaseProduct_Url+`${id}`,data)
  }

  deleteProductData(id:any){
    return this.http.delete<any>(this.BaseProduct_Url+`${id}`)
  }

}
