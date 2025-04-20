import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudProductComponent } from './crud-product/crud-product.component';

const routes: Routes = [
  {
    path:"",
    component:CrudProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
