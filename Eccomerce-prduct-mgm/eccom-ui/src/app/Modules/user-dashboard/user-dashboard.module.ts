import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { RouterLink } from '@angular/router';


@NgModule({
  declarations: [
    ProductDashboardComponent
  ],
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
    RouterLink
  ]
})
export class UserDashboardModule { }
