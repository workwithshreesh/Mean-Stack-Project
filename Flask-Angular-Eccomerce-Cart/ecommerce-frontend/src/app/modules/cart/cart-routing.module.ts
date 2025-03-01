import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudCartComponent } from './crud-cart/crud-cart.component';

const routes: Routes = [
  {
    path:"",
    component:CrudCartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }


