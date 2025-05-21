import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { BooksService } from '../../service/books.service';
import { CommonsettingService } from '../../service/commonsetting.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { validateHeaderName } from 'http';

@Component({
  selector: 'app-list-books',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit, OnDestroy {

  @ViewChild('addNewRecord') addNewRecord!: TemplateRef<any>;
  addNewRecordInstence: any;

  booklist: any[] = [];
  errorMsg!: string;
  showAlert: boolean = false;

  constructor(
    private bookService: BooksService,
    private commonSetting: CommonsettingService,
    private modalService: NgbModal,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.fectchBook();
  }

  ngOnDestroy(): void {
    // Cleanup logic if needed
  }


  // Form intilization
  formInit(){
    this.fb.group({
      bookName: ['',[Validators.required, Validators.minLength(8)]],
      bookAuthor: ['',Validators.required, Validators.minLength(9)],
      description: ['',[Validators.required, Validators.minLength(50)]]
    })
  }

  // Open modal method
  openModal() {
    const modalRef = this.modalService.open(this.addNewRecord, {
      size: 'lg',
      backdrop: 'static',
      centered: true
    });

    // Storing the modal reference for later use
    this.addNewRecordInstence = modalRef;
  }

  // Close modal method
  closeModal() {
    if (this.addNewRecordInstence) {
      this.addNewRecordInstence.close();
    }
  }

  // Fetch books from the service
  fectchBook() {
    const user = this.commonSetting.getSessionItem('userDetail');
    if (user) {
      const userData = JSON.parse(user);
      this.bookService.getAllBookData(userData.userId).subscribe(
        (res: any) => {
          this.booklist = res;
        },
        (error: any) => {
          this.showAlert = true;
          this.errorMsg = error;
        },
        () => {
          console.log("Observable is completed");
        }
      );
    }
  }

  // Close alert message
  closeAlert() {
    if (this.showAlert) {
      this.showAlert = false;
    }
  }

  // Trigger modal opening from the button
  onAddBook() {
    this.openModal();
    // this.bookService.postBookData()
  }
}
