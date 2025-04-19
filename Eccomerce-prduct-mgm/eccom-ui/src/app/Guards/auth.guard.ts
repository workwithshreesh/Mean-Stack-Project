import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { inject } from '@angular/core';

const authService = inject(AuthService);
const router = inject(Router);

export const authGuard: CanActivateFn = (route, state) => {
  if(!authService.isLoggedIn()){
    router.navigateByUrl("/login");
    return false
  }
  return true;
};
