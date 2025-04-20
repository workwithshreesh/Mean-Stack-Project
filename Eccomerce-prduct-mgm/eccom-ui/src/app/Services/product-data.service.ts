import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  private productSource = new BehaviorSubject<any>(null);
  currentProduct = this.productSource.asObservable();

  constructor() {}

  // Set product data for editing
  setProductData(product: any) {
    this.productSource.next(product);
  }

  // Clear product data (for new product)
  clearProductData() {
    this.productSource.next(null);
  }
}