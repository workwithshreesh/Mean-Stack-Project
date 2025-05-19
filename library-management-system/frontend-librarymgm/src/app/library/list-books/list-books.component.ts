import { Component, OnInit, OnDestroy } from '@angular/core';
import { BooksService } from '../../service/books.service';

@Component({
  selector: 'app-list-books',
  imports: [],
  templateUrl: './list-books.component.html',
  styleUrl: './list-books.component.css'
})
export class ListBooksComponent implements OnInit, OnDestroy {

  constructor(
    private bookService: BooksService
  ){}

  ngOnInit(): void {

  }


  ngOnDestroy(): void {

  }

}
