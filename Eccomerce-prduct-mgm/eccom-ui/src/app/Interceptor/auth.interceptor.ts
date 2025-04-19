import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../Services/auth.service';
import { inject } from '@angular/core';

const authService = inject(AuthService)

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = authService.getToken();

  if(token){
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned)
  }
  return next(req);
};
