import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditComponent } from './add-edit/add-edit.component';
import { CategoryComponent } from './category/category.component';
import { roleGuard } from '../../Guards/role.guard';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
    {
        path:"add-product",
        component:AddEditComponent,
        canActivate: [roleGuard],
        data: {role:['seller']}
      },
      {
        path:"edit-product",
        component:AddEditComponent,
        canActivate: [roleGuard],
        data: {role:['seller']}
      },
      {
        path:"category",
        canActivate: [roleGuard],
        component:CategoryComponent,
        data: {role:['seller']}
      },
      {
        path:"product",
        component:ProductListComponent
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerDashboardRoutingModule {}
