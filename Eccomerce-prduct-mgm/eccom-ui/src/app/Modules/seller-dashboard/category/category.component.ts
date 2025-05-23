import { Component } from '@angular/core';
import { Category } from '../../../Interface/Category.interface';
import { CategoryService } from '../../../Services/category.service';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  isLoading = false;
  errorMessage = '';

  // Modal state
  modalTitle = 'Add Category';
  modalCategoryName = '';
  editingCategoryId: number | null = null;
  isSaving = false;

   // pagination
   currentPage: number = 1;
   totalPages: number = 1;
   limit: number = 10;
   totalCount!:number;


  //  Search
  searchTerm: string = '';
  suggestions: string[] = [];


  constructor(
    private categoryService: CategoryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading = true;
    this.categoryService.getCategoryByUserId(this.currentPage, this.limit, this.searchTerm).subscribe({
      next: (data:any) => {
        this.categories = data.category;
        this.filteredCategories = [...this.categories];
        this.totalPages = data.totalPages;
        this.totalCount = data.totalCount;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });
  }

  openModal(category?: Category): void {
    if (category) {
      this.modalTitle = 'Edit Category';
      this.modalCategoryName = category.name;
      this.editingCategoryId = category.id;
    } else {
      this.modalTitle = 'Add Category';
      this.modalCategoryName = '';
      this.editingCategoryId = null;
    }

    // Open modal via Bootstrap JS
    const modal = new (window as any).bootstrap.Modal(document.getElementById('categoryModal'));
    modal.show();
  }

  saveCategory(): void {
    if (!this.modalCategoryName.trim()) {
      alert('Category name is required!');
      return;
    }

    this.isSaving = true;
    const userId = this.authService.getUserId() || '';

    const categoryData = { name: this.modalCategoryName.trim(), userId: userId };

    const request = this.editingCategoryId
      ? this.categoryService.updateCategory(this.editingCategoryId, categoryData)
      : this.categoryService.createCategory(categoryData);

    request.subscribe({
      next: () => {
        this.loadCategories();
        this.closeModal();
        this.isSaving = false;
      },
      error: (err) => {
        alert('Error saving category: ' + err.message);
        this.isSaving = false;
      }
    });
  }

  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => this.loadCategories(),
        error: (err) => alert('Failed to delete: ' + err.message)
      });
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadCategories();
    }
  }

  closeModal(): void {
    const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('categoryModal'));
    modal.hide();
  }

  onSearchChange(value:string): void {
    this.currentPage = 1; // har search pe page 1 se shuru kar
    this.loadCategories(); // backend call karega

    // Search suggestion
    if(value.trim()){
      this.categoryService.getSuggestions(value).subscribe({
        next: (res:any) => {
          console.log(res)
          this.suggestions = res.map((cat:any)=>cat.name);
        },
        error: (err) => {
          console.error("Suggestions error",err);
          this.suggestions = [];
        }
      });
    } else{
      this.suggestions = [];
    }

  }

  onSuggestionSelect(suggestion: string) {
    this.searchTerm = suggestion;
    this.suggestions = [];
    this.currentPage = 1;
    this.loadCategories();  // Server-side search load
  }
  
  


  onSearchFilter(searchValue: string): void {
    console.log(searchValue)
    this.searchTerm = searchValue.toLowerCase();
    this.filteredCategories = this.categories.filter(category =>
      category.name.toLowerCase().includes(this.searchTerm)
    );
  }
  
  

}
