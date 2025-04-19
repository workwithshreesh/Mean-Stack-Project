import { Routes } from '@angular/router';


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
     // Add a fallback route
  { path: '**', redirectTo: '' }
];
