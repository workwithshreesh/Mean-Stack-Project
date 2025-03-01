import { Routes } from '@angular/router';
import { HomeComponent } from './layouts/home/home.component';

export const routes: Routes = [
    {
        path:"",
        component:HomeComponent
    },
    { 
        path: 'cart', 
        loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule)
 
    },
    { 
        path: 'product', 
        loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule) 
    }

];

