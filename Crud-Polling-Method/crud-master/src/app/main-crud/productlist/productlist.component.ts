import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { HandleCategoryApiService } from '../../services/handle-category-api.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HandleProductApiService } from '../../services/handle-product-api.service';

@Component({
  selector: 'app-productlist',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.css'
})
export class ProductlistComponent implements OnInit, OnDestroy{

  @ViewChild('modalContent') modalContent:any;

  AlldataSubscribe!:Subscription;
  AllCatdataSubscribe!:Subscription;
  PostDataSubscribe!:Subscription;
  PutDataSubscribe!:Subscription;
  deleteDataSubscribe!:Subscription;
  FormsData!:FormGroup;
  modalRefrence:any;

  AllData:any;
  CatData:any;
  EditData:boolean = false;
  editId:any;
  totalPages:any;
  currentPage = 1;
  headers: string[] = [];
  
  constructor(
    private fb:FormBuilder,
    private apiData:HandleProductApiService,
    private apiCatData:HandleCategoryApiService,
    private modalService: NgbModal,
    ){}

  ngOnInit(): void {

    this.FormsData = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      category_id: ['', [Validators.required]] 
    });

    this.getProductApiData(this.currentPage)
    this.getCategoryApiData();

  }

  ngOnDestroy() {
    if (this.AlldataSubscribe) {
      this.AlldataSubscribe.unsubscribe(); 
    }
    if(this.PostDataSubscribe){
      this.PostDataSubscribe.unsubscribe();
    }
    if(this.PutDataSubscribe){
      this.PutDataSubscribe.unsubscribe();
    }
    if(this.deleteDataSubscribe){
      this.deleteDataSubscribe.unsubscribe();
    }
    if(this.AllCatdataSubscribe){
      this.AllCatdataSubscribe.unsubscribe();
    }
  }

  open(): void {
   this.EditData = false;
   this.FormsData.reset();
   this.modalRefrence =  this.modalService.open(this.modalContent);
  }

  openEdit(data:any): void {
    this.modalRefrence = this.modalService.open(this.modalContent)
    this.EditData = true;
    if(this.EditData){
      this.FormsData.patchValue({
        name: data.name,
        price: data.price,
        category_id: data.category_id
      });
      this.editId = data.id
    }
  }


  openDelete(data:any){
    this.apiData.deleteProductData(data.id).subscribe(data=>{
      console.log(data)
    });
    window.location.reload()
  }
  

  saveChanges(): void {
    console.log(this.FormsData.value);
    const data = this.FormsData.value
    this.PostDataSubscribe = this.apiData.postProductData(data).subscribe(data=>{
      console.log(data)
    });
    
    this.modalRefrence.close()
    this.FormsData.reset();
    window.location.reload()

  }

  editChanges(): void {
    const formValue = this.FormsData.value
    this.PutDataSubscribe = this.apiData.putProductData(this.editId,formValue).subscribe(data=>{
      console.log(data);
    });
    this.modalRefrence.close()
    this.FormsData.reset()
    this.EditData = false;
    this.editId = null;
    window.location.reload()

  }


  async getProductApiData(page:number){
    this.AlldataSubscribe = await this.apiData.getProductData(page).subscribe(data=>{
      console.log(data)
      this.AllData = data;
      this.totalPages = this.AllData?.totalCount;
      this.headers = Object.keys(this.AllData?.Products[0])
      console.log(this.AllData, this.totalPages,this.headers)
    })
  }



  async getCategoryApiData(){
    this.AllCatdataSubscribe = this.apiData.getCategoryData().subscribe(data=>{
      console.log(data)
      this.CatData = data
    });
  }


  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getProductApiData(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getProductApiData(this.currentPage);
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.getProductApiData(this.currentPage);
  }


}
