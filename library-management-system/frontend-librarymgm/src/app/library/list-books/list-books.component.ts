import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { BooksService } from '../../service/books.service';
import { CommonsettingService } from '../../service/commonsetting.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validateHeaderName } from 'http';
import { Router, RouterLink } from '@angular/router';
import { MainServiceService } from '../../service/main-service.service';

@Component({
  selector: 'app-list-books',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit, OnDestroy {

  @ViewChild('addNewRecord') addNewRecord!: TemplateRef<any>;
  addNewRecordInstence: any;
  bookForm!: FormGroup
  booklist: any[] = [];
  errorMsg!: string;
  showAlert: boolean = false;
  isEdit:boolean = false;


  constructor(
    private bookService: BooksService,
    private commonSetting: CommonsettingService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private mainService: MainServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // intilize forms in frontend
    this.formInit();

    // fetch book list from backend
    this.fectchBook();
  }

  ngOnDestroy(): void {
    // Cleanup logic if needed
  }


  // Form intilization
  formInit() {
    this.bookForm = this.fb.group({
      bookname: ['', [Validators.required, Validators.minLength(8)]],
      bookAuthor: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(50)]],
      id: ['']
    })
  }

  formPatchValue(book: any) {
    this.isEdit = true;
    this.openModal();
    this.bookForm.patchValue({
      id: book._id,
      bookname: book.bookname,
      bookAuthor: book.bookAuthor,
      description: book.description
    });
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
          this.closeModal();
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
    const user = this.commonSetting.getSessionItem('userDetail');
    if (user) {
      const userData = JSON.parse(user);

      // Spread bookForm values, then add userId explicitly
      const postData = {
        ...this.bookForm.value,
        userId: userData.userId
      };

      console.log("post data", postData)

      this.bookService.postBookData(postData).subscribe(
        (res: any) => {
          this.commonSetting.sweetSuccsess(res.message);
          this.fectchBook();
        },
        (error: any) => {
          this.commonSetting.toasterError(error)
        },
        () => {
          console.log("Completed observable");
          this.closeModal();
        }
      );
    }
  }


  // Edit book
  onEdit() {
    console.log(this.bookForm.value)
    this.bookService.updateBook(this.bookForm.value.id, this.bookForm.value).subscribe({
      next: (res) => {
        this.commonSetting.toasterSuccess(res.message);
        this.fectchBook();
      },
      error: (error: any) => {
        this.commonSetting.toasterError(error)
      },
      complete: () => {
        console.log("Observable is completed.");
        this.closeModal();
      }
    });
  }


  // Delete book
  Delete(bookId: any) {
    console.log(bookId);
    this.bookService.DeleteBook(bookId).subscribe({
      next: (res:any) => {
        this.commonSetting.sweetSuccsess(res.message);
        this.fectchBook();
      },
      error: (error:any) => {
        console.log(error);
        this.commonSetting.sweetError(error)
      },
      complete: () => {
        console.log('Observable is completed');
      }
    })
  }


  onRead(book:any){
    console.log(book)
    this.mainService.bookData.set(book);
    this.router.navigate(['/read-book']);
  }


}
