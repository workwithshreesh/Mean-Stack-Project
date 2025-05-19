import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonsettingService {

  private isBrowser!: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { 
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  setLocalItem(key: string, value: string): void {
    if(this.isBrowser){
      localStorage.setItem(key, value);
    }
  }


  getLocalItem(key: string): string | null {
    if(this.isBrowser){
      return localStorage.getItem(key);
    }
    return null;
  }


  getSessionItem(key: string): string | null {
    if(this.isBrowser){
      return sessionStorage.getItem(key);
    }
    return null;
  }


  setSessionItem(key: string, value: string): void {
    if(this.isBrowser){
      sessionStorage.setItem(key, value);
    }
  }

}
