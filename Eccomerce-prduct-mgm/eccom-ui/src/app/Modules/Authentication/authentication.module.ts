import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginAuthComponent } from './login-auth/login-auth.component';
import { RegisterAuthComponent } from './register-auth/register-auth.component';


@NgModule({
  declarations: [
    LoginAuthComponent,
    RegisterAuthComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    CommonModule, 
    ReactiveFormsModule, 
    FormsModule, 
    RouterLink
  ]
})
export class AuthenticationModule { }
