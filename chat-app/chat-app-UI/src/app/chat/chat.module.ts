import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OneToOneComponent } from './one-to-one/one-to-one.component';
import { GroupComponent } from './group/group.component';


@NgModule({
  declarations: [
    OneToOneComponent,
    GroupComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ChatModule { }
