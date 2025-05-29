import { Routes } from '@angular/router';
import { HomeComponent } from './Layouts/home/home.component';
import { NotFoundComponent } from './Layouts/not-found/not-found.component';
import { authGuard } from './Guards/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => 
            import('./auth/auth.module').then(m=>m.AuthModule)
        
    },
    {
        path:'chat',
        canActivate: [authGuard],
        loadChildren: () => import('./chat/chat.module').then(m=>m.ChatModule)
    }, 
    {
        path: '',
        component: HomeComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
