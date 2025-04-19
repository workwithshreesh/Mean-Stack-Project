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
        data: {roles:['seller']}
      },
      {
        path:"edit-product",
        component:AddEditComponent,
        canActivate: [roleGuard],
        data: {roles:['seller']}
      },
      {
        path:"category",
        component:CategoryComponent
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
