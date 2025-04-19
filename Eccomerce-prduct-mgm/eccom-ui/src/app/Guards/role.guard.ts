import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { inject } from '@angular/core';

const authService = inject(AuthService);
const router = inject(Router);

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {

  const expectedRole = route.data['seller'];
  const userRole = authService.getUserRole();

  if(userRole !== expectedRole){
    router.navigateByUrl("/login");
    return false;
  }
  return true;
};
