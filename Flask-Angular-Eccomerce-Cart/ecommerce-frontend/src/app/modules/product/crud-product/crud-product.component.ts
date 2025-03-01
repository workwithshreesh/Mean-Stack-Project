import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-crud-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './crud-product.component.html',
  styleUrls: ['./crud-product.component.css'] // ✅ Fixed typo: "styleUrl" → "styleUrls"
})
export class CrudProductComponent implements OnInit {

  addProductDataSubscribe!: Subscription;
  editProductDataSubscribe!: Subscription;
  deleteProductDataSubscribe!: Subscription;
  retriveProductDataSubscribe!: Subscription;

  allProductData: any;
  formData!: FormGroup;
  selectedFile: File | null = null;
  productEditId: any;
  Image_Url:any
  isEdit:boolean=false;

  @ViewChild('productModal', { static: false }) productModal!: ElementRef;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private cartService:CartService
  ) {}

  ngOnInit(): void {

    this.Image_Url = this.cartService.Image_Url
    this.getAllData();

    this.formData = this.fb.group({
      id: [''],
      name: ["", [Validators.required, Validators.minLength(3)]],  
      description: ["", [Validators.required, Validators.minLength(20), Validators.maxLength(200)]], 
      price: ["", [Validators.required]],  
      image: ["", [Validators.required]] 
    });
  }

  getAllData() {
    this.addProductDataSubscribe = this.productService.getProductdata().subscribe(data => {
      this.allProductData = data;
      console.log(this.allProductData);
    });
  }

  onFileSelect(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
  
      this.selectedFile = file;
  
      this.formData.patchValue({ image: file.name });
  
      this.formData.get('image')?.updateValueAndValidity();
    }
  }
  

  oneditClick(productdata: any) {
    console.log("res", productdata);
    this.isEdit = true
    this.retriveProductDataSubscribe = this.productService.getProductdataById(productdata).subscribe(data => {
      console.log(data);
      if (data) { 
        this.formData.patchValue({
          name: data.name || '',
          description: data.description || '',
          price: data.price || ''
        });
        this.productEditId = data.id || null;
      }
    });
  }


  deleteProduct(productdata:any){
    this.deleteProductDataSubscribe = this.productService.deleteProductData(productdata.id).subscribe(data=>{
      console.log(data);
      window.location.reload();
    });
  }



  editProduct() {
    const productdata = new FormData();
  
    productdata.append('name', this.formData.get('name')?.value);
    productdata.append('price', this.formData.get('price')?.value);
    productdata.append('description', this.formData.get('description')?.value);
  
    if (this.selectedFile) {
      productdata.append('image', this.selectedFile);
    }
  
    this.editProductDataSubscribe = this.productService
      .putProductdata(this.productEditId, productdata)
      .subscribe(
        (data) => {
          console.log('Product updated:', data);
          this.formData.reset();
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
      window.location.reload()
  }
  





  saveProduct(): void {
    const formDataToSend = new FormData();
  
    formDataToSend.append('name', this.formData.get('name')?.value);
    formDataToSend.append('price', this.formData.get('price')?.value);
    formDataToSend.append('description', this.formData.get('description')?.value);
  
    if (this.selectedFile) {
      formDataToSend.append('image', this.selectedFile);
    }
  
    this.editProductDataSubscribe = this.productService.postProductdata(formDataToSend).subscribe(data => {
      console.log(data);
    });

    window.location.reload()
  }
  

  addNew(){
    this.isEdit = false;
    this.formData.reset();
  }
}
