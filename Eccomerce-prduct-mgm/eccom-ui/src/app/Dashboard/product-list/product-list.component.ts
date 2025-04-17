import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/envirnoments';
import { ProductService } from '../../Services/product.service';
import { ProductDataService } from '../../Services/product-data.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  allProducts$!: Observable<any[]>;  
  baseUrl: string = environment.baseUrl + "/uploads/";
  totalCount!:number;
  isLoading: boolean = false;
  errorMessage: string = '';

  // pagination
  currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 10;

  constructor(
    private productService: ProductService,
    private productDataService: ProductDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.isLoading = true;
    this.errorMessage = '';

    this.productService.getProducts(this.currentPage, this.limit).subscribe({
      next: (response: any) => {
        this.allProducts$ = of(response.products); 
        this.totalCount = response.totalCount;
        this.totalPages = response.totalPages;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.errorMessage = 'Failed to load products. Please try again.';
        this.isLoading = false;
      }
    });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchProducts();
    }
  }

  handleImageError(event: any) {
    event.target.src = 'assets/default-image.png';
  }

  onEditClick(product: any) {
    this.productDataService.setProductData(product);
    this.router.navigate(['/edit-product']);
  }

  addNew() {
    this.productDataService.clearProductData();
    this.router.navigate(['/add-product']);
  }

  onDeleteClick(product: any) {
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      this.productService.deleteProduct(product.id).subscribe({
        next: () => this.fetchProducts(),
        error: (err) => {
          console.error('Error deleting product:', err);
          alert('Failed to delete product. Please try again.');
        }
      });
    }
  }

  ngOnDestroy(): void {}
}
