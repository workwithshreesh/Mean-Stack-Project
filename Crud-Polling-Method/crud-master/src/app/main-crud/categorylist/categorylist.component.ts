import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { HandleCategoryApiService } from '../../services/handle-category-api.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-categorylist',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categorylist.component.html',
  styleUrl: './categorylist.component.css'
})
export class CategorylistComponent implements OnInit, OnDestroy {

  @ViewChild('modalContent') modalContent:any;

  AlldataSubscribe!:Subscription;
  PostDataSubscribe!:Subscription;
  PutDataSubscribe!:Subscription;
  deleteDataSubscribe!:Subscription;
  FormsData!:FormGroup;
  modalRefrence:any;

  AllData:any;
  EditData:boolean = false;
  editId:any;
  totalPages:any;
  currentPage = 1;
  headers: string[] = [];
  
  constructor(
    private fb:FormBuilder,
    private apiData:HandleCategoryApiService,
    private modalService: NgbModal,
    ){}

  ngOnInit(): void {

    this.FormsData = this.fb.group({
      name: ['', Validators.required]
    });

    this.getCategoryApiData(this.currentPage)
    console.log(this.AllData?.categories[0])

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
        name: data.name
      });
      this.editId = data.id
    }
  }


  openDelete(data:any){
    this.apiData.deleteDataCategory(data.id).subscribe(data=>{
      console.log(data)
    });
    window.location.reload()
  }
  

  saveChanges(): void {
    console.log(this.FormsData.value);
    const data = this.FormsData.value
    this.PostDataSubscribe = this.apiData.postCategoryData(data).subscribe(data=>{
      console.log(data)
    });
    
    this.modalRefrence.close()
    this.FormsData.reset();
    window.location.reload()

  }

  editChanges(): void {
    const formValue = this.FormsData.value
    this.PutDataSubscribe = this.apiData.putCategoryData(this.editId,formValue).subscribe(data=>{
      console.log(data);
    });
    this.modalRefrence.close()
    this.FormsData.reset()
    this.EditData = false;
    this.editId = null;
    window.location.reload()

  }


  async getCategoryApiData(page:number){
    this.AlldataSubscribe = this.apiData.getCategoryData(page).subscribe(data=>{
      this.AllData = data;
      this.totalPages = this.AllData?.totalCount;
      this.headers = Object.keys(this.AllData?.categories[0])
      console.log(this.AllData, this.totalPages,this.headers)
    })
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getCategoryApiData(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getCategoryApiData(this.currentPage);
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.getCategoryApiData(this.currentPage);
  }

}
