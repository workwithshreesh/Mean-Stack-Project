import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { PathNotFoundComponent } from './component/path-not-found/path-not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path:'',
        loadChildren: () => 
            import('./library/library.module').then(m => m.LibraryModule)
    },
    {
        path:'',
        loadChildren: () => 
            import('./authentication/authentication.module').then(m => m.AuthenticationModule)
    },
    {
        path:'**',
        component:PathNotFoundComponent
    }
];
