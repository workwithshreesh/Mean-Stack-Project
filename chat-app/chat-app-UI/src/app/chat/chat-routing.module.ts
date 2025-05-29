import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OneToOneComponent } from './one-to-one/one-to-one.component';
import { GroupComponent } from './group/group.component';

const routes: Routes = [
  {
    path:'one-to-one',
    component: OneToOneComponent
  },
  {
    path: 'group',
    component: GroupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
