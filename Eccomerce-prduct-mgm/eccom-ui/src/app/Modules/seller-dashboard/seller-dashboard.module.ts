import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerDashboardRoutingModule } from './seller-dashboard-routing.module';
import { AddEditComponent } from './add-edit/add-edit.component';
import { CategoryComponent } from './category/category.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductReportComponent } from './product-report/product-report.component';
import { ProductUploadComponent } from './product-upload/product-upload.component';

@NgModule({
  declarations: [
    AddEditComponent,
    CategoryComponent,
    ProductListComponent,
    ProductReportComponent,
    ProductUploadComponent,
  ],
  imports: [
    CommonModule,
    SellerDashboardRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    RouterLink
  ]
})
export class SellerDashboardModule {}
