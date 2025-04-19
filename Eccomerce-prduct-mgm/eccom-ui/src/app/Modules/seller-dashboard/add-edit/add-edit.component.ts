import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductDataService } from '../../../Services/product-data.service';
import { ProductService } from '../../../Services/product.service';
import { environment } from '../../../../environments/envirnoments';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../../Services/category.service';
import { Category } from '../../../Interface/Category.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.css'
})
export class AddEditComponent {
  productForm!: FormGroup;
  imagePreviews: string[] = [];
  selectedFiles: File[] = [];
  productSubscription!: Subscription;
  categorySubscribtion!: Subscription;
  categoryData!:Category[]
  productId: number | null = null;
  skuExistError: boolean = false;
  baseUrl: string = environment.baseUrl + "/uploads/";

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private productDataService: ProductDataService,
    private categoryService:CategoryService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.productSubscription = this.productDataService.currentProduct.subscribe(product => {
      if (product) {
        this.productId = product.id;
        this.populateForm(product);
      } else {
        this.productId = null;
        this.resetForm();
      }
    });

    this.getCategorys();
  }

  initializeForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      categoryId:['', Validators.required],
      Images: [[]]
    });
  }

  populateForm(product: any) {
    this.productForm.patchValue({
      name: product.name,
      price: product.price,
      categoryId:product.Category.id
    });
    this.imagePreviews = product.Images ? product.Images.map((img: any) => this.baseUrl + img.url) : [];
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFiles = Array.from(fileInput.files);
      this.imagePreviews = [];

      this.selectedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }


  // Retrive all category 

  getCategorys(){
    this.categorySubscribtion = this.categoryService.getCategorysAll().subscribe((data:any)=>{
      this.categoryData = data.category;
    });
  }



  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('name', this.productForm.get('name')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('categoryId', this.productForm.value.categoryId);

    if (this.selectedFiles.length > 0) {
      this.selectedFiles.forEach(file => {
        formData.append('images', file, file.name);
      });
    }

    if (this.productId) {
      this.productService.updateProduct(this.productId, formData).subscribe(
        () => {
          alert('Product updated successfully!');
          this.productDataService.clearProductData();
          this.resetForm();
        },
        error => {
          console.error('Update failed:', error);
        }
      );
    } else {
      this.productService.createProduct(formData).subscribe(
        () => {
          alert('Product added successfully!');
          this.resetForm();
        },
        error => {
          console.error('Creation failed:', error);
        }
      );
    }
  }

  closeModal() {
    const conf = confirm("Are you sure you want to close the form?")
    if(conf){
      this.productDataService.clearProductData();
    this.router.navigateByUrl("/product");
    }else{
      return
    }
  }

  resetForm() {
    this.productForm.reset();
    this.imagePreviews = [];
    this.selectedFiles = [];
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }
}
