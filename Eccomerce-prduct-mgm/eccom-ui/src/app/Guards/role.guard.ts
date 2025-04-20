import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const allowedRoles: string[] = route.data['role'];
  const userRole = authService.getUserRole();
  const isLoggedIn = authService.isLoggedIn();

  if (!isLoggedIn || !userRole || !allowedRoles.includes(userRole)) {
    router.navigateByUrl("/authentication/login");
    return false;
  }

  return true;
};
