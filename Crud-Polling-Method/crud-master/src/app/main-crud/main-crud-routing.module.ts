import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductlistComponent } from './productlist/productlist.component';
import { CategorylistComponent } from './categorylist/categorylist.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"/",
    pathMatch:"full"
  }
  ,{
    path:"product",
    component:ProductlistComponent
  },
  {
    path:"category",
    component:CategorylistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainCrudRoutingModule { }
