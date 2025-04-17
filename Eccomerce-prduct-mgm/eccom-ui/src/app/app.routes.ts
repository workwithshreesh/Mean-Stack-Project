import { Routes } from '@angular/router';
import { ProductDashboardComponent } from './Dashboard/product-dashboard/product-dashboard.component';
import { ProductListComponent } from './Dashboard/product-list/product-list.component';
import { AddEditComponent } from './Dashboard/add-edit/add-edit.component';
import { CategoryComponent } from './Dashboard/category/category.component';

export const routes: Routes = [
    {
        path:"",
        component:ProductDashboardComponent
      },
      {
        path:"product",
        component:ProductListComponent
      },
      {
        path:"add-product",
        component:AddEditComponent
      },
      {
        path:"edit-product",
        component:AddEditComponent
      },
      {
        path:"category",
        component:CategoryComponent
      }
];
