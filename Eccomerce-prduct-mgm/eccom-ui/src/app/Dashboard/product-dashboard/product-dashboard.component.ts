import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { environment } from '../../../environments/envirnoments';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-dashboard.component.html',
  styleUrl: './product-dashboard.component.css'
})
export class ProductDashboardComponent {
  retriveCartDataSubscribe!: Subscription;
  allDataProduct: any[] = [];
  Base_url: string = environment.baseUrl + "/uploads/";
  selectedProduct: any;
  isLoading: boolean = false;
  hasError: boolean = false;

  // pagination
  currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 10;
  searchTerm:string = '';


  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProduct();
  }

  ngOnDestroy(): void {
    if (this.retriveCartDataSubscribe) {
      this.retriveCartDataSubscribe.unsubscribe();
    }
  }

  getAllProduct(): void {
    this.isLoading = true;
    this.hasError = false;

    this.productService.getProducts(this.currentPage, this.limit, this.searchTerm).subscribe({
      next: (response: any) => {
            this.isLoading = false;
            this.allDataProduct = response.products; 
            this.totalPages = response.totalPages;
          },
          error: (err) => {
            console.error('Error fetching products:', err);
            this.hasError = true;
            this.isLoading = false;
          }
        });
  }

  addToCart(name:string){
    alert(`${name} has been added to the cart.`);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getAllProduct();
    }
  }

  openModal(product: any): void {
    this.selectedProduct = product;
  }
}
