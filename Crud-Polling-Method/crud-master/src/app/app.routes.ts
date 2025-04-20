import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';

export const routes: Routes = [
    {
        path:"",
        component:HomeComponent
    },
    {
        path:"crud",
        loadChildren: () => import("./main-crud/main-crud.module").then(m=>m.MainCrudModule)
    },
    { path: '', redirectTo: '/', pathMatch: 'full' },
    {
        path:'**',
        component:NotfoundComponent
    }
];
