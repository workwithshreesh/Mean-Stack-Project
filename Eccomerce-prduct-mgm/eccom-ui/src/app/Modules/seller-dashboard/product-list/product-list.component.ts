import { Component } from '@angular/core';
import { environment } from '../../../../environments/envirnoments';
import { ProductService } from '../../../Services/product.service';
import { ProductDataService } from '../../../Services/product-data.service';
import { Router } from '@angular/router';
import { Product } from '../../../Interface/Product.interface';
 
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  allProducts: any[] = [];  
  filteredCategories: Product[] = [];
  baseUrl: string = environment.baseUrl + "/uploads/";
  totalCount!:number;
  isLoading: boolean = false;
  errorMessage: string = '';

  // pagination
  currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 10;

  // Search
  searchTerm = '';
  suggestions:string[] = [];

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

    this.productService.getProductByUserId(this.currentPage, this.limit, this.searchTerm).subscribe({
      next: (response: any) => {
        this.allProducts = response.products; 
        this.totalCount = response.totalCount;
        this.totalPages = response.totalPages;
        console.log("pages",this.totalPages)
        this.filteredCategories = [...this.allProducts];
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
    this.router.navigate(['/seller-dashboard/edit-product']);
  }

  addNew() {
    this.productDataService.clearProductData();
    this.router.navigate(['/seller-dashboard/add-product']);
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


  // On search changes
  onSearchChange(value:string): void{
    this.currentPage = 1;
    this.fetchProducts();

    if(value.trim()){
      this.productService.getSuggestions(value).subscribe({
        next: (res:any) => {
          console.log(res)
          this.suggestions = res.map((prod:any)=>prod.name);
        },
        error: (err) => {
          console.error("Suggestions error", err);
          this.suggestions = [];
        }
      })
    }else{
      this.suggestions = [];
    }

  }


  onSuggestionSelect(suggestion: string){
    this.searchTerm = suggestion;
    this.suggestions = [];
    this.currentPage = 1;
    this.fetchProducts();
  }

  onSearchFillter(searchValue: string){
    this.searchTerm = searchValue.toLowerCase();
    this.filteredCategories = this.allProducts.filter(category => 
      category.name.toLowerCase().includes(this.searchTerm)
    );
  }

  ngOnDestroy(): void {}
}
