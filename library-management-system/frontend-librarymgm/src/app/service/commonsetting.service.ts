import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CommonsettingService {

  private isBrowser!: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private toastrService: ToastrService
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

  removeSessionItem(key: string){
    if(this.isBrowser){
      sessionStorage.removeItem(key);
    }
  }


  // ======= toaster ===============

  toasterSuccess(msg:string){
    this.toastrService.success(msg, 'Success');
  }

  toasterWarning(msg:string){
    this.toastrService.warning(msg,'Warning');
  }

  toasterError(msg:string){
    this.toastrService.error(msg, 'Error');
  }

  toasterInfo(msg:string){
    this.toastrService.info(msg, 'Info');
  }

  
  // ========= Sweet Alert =====================

  sweetSuccsess(message: string, title: string = 'Success'){
    Swal.fire(title, message);
  }

  sweetError(message: string, title: string = 'Error'){
    Swal.fire(title, message);
  }

  sweetInfo(message:string, title: string = 'Info'){
    Swal.fire(title, message);
  }

  sweetWarning(message:string, title: string = 'Warning'){
    Swal.fire(title, message);
  }


  question(message:string, title: string = 'Are you sure?') {
    return Swal.fire({
      title,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    });
  }

}
