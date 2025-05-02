import { Routes } from '@angular/router';
import { PagenotfoundComponent } from './Layouts/pagenotfound/pagenotfound.component';
import { ParentComponent } from './parentChiled/parent/parent.component';
import { ChiledComponent } from './parentChiled/chiled/chiled.component';


export const routes: Routes = [
    {
        path:"seller-dashboard",
        loadChildren: () => 
            import('./Modules/seller-dashboard/seller-dashboard.module').then(m=>m.SellerDashboardModule)
    },
    {
        path:"authentication",
        loadChildren: () =>
            import('./Modules/Authentication/authentication.module').then(m=>m.AuthenticationModule)
    },
    {
        path:"",
        loadChildren: () => 
            import(`./Modules/user-dashboard/user-dashboard.module`).then(m=>m.UserDashboardModule)
    },
    {
        path:"parent",
        component:ParentComponent
    },
     // Add a fallback route
  { 
    path: '**', 
    component: PagenotfoundComponent
   }
];
