import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerDashboardRoutingModule } from './seller-dashboard-routing.module';
import { AddEditComponent } from './add-edit/add-edit.component';
import { CategoryComponent } from './category/category.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddEditComponent,
    CategoryComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    SellerDashboardRoutingModule,
    ReactiveFormsModule, 
    FormsModule
  ]
})
export class SellerDashboardModule {}
