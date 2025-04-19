import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const authService = inject(AuthService);  
  const router = inject(Router);            

  const expectedRole = route.data['role'];
  const userRole = authService.getUserRole();

  if (userRole !== expectedRole) {
    router.navigateByUrl("/authentication/login");
    return false;
  }

  return true;
};
