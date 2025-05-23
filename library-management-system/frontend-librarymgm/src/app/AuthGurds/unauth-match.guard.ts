import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';

export const unauthMatchGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(!authService.isAuthenticated()){
    return true;
  }
  router.navigate(['/']);
  return false;
};
