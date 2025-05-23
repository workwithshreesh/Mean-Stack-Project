import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './Interceptors/auth.interceptor';

import { ToastrModule } from 'ngx-toastr'
import { provideAnimations } from '@angular/platform-browser/animations'; // ✅ Import this

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideHttpClient(
      withFetch(), 
    withInterceptors([AuthInterceptor])
  ),
  provideRouter(routes), 
  provideClientHydration(withEventReplay()),
  provideAnimations(),
  importProvidersFrom(
    ToastrModule.forRoot({
      positionClass: 'toast-top-right', // or 'toast-bottom-left', etc.
      preventDuplicates: true,
      timeOut: 3000, 
      closeButton: true, 
      progressBar: true
    }),
  )
  
  ]
};
