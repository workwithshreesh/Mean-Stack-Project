import { Component, OnInit, OnDestroy, effect } from '@angular/core';
import { MainServiceService } from '../../service/main-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read-book',
  imports: [],
  templateUrl: './read-book.component.html',
  styleUrl: './read-book.component.css'
})
export class ReadBookComponent implements OnInit, OnDestroy {

  readBook:any;

  constructor(
    private mainService: MainServiceService,
    private router: Router
  ){

    // track effect of signals
    this.readBook = this.mainService.bookData();
    effect(() => {
      if(!this.readBook){
        this.router.navigate(['/list-book']);
      }
    });

  }

  ngOnInit(): void {
    
  }


  ngOnDestroy(): void {

  }

}
