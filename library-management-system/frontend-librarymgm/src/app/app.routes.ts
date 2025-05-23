import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { PathNotFoundComponent } from './component/path-not-found/path-not-found.component';
import { authGuard } from './AuthGurds/auth.guard';
import { unauthMatchGuard } from './AuthGurds/unauth-match.guard';
import { authMatchGuard } from './AuthGurds/auth-match.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path:'',
        canActivate: [authGuard],
        // canMatch: [authMatchGuard],
        loadChildren: () => 
            import('./library/library.module').then(m => m.LibraryModule)
    },
    {
        path:'',
        // canMatch: [unauthMatchGuard],
        loadChildren: () => 
            import('./authentication/authentication.module').then(m => m.AuthenticationModule)
    },
    {
        path:'**',
        component:PathNotFoundComponent
    }
];
