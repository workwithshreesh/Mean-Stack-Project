import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBooksComponent } from './list-books/list-books.component';
import { ReadBookComponent } from './read-book/read-book.component';

const routes: Routes = [
  {
    path:'list-book',
    component:ListBooksComponent
  },
  {
    path:'read-book',
    component:ReadBookComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
