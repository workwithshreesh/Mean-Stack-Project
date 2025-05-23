import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';
import { CommonsettingService } from '../../service/commonsetting.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  // Login Form
  loginForm!:FormGroup

  errorMsg:any;
  showAlert:boolean = false;

  constructor(
    private authService: AuthService,
    private fb:FormBuilder,
    private router: Router,
    private commonSetting: CommonsettingService
  ){}

  ngOnInit(): void {

    this.formInit()


  }

  ngOnDestroy(): void {
    
  }

  // Form intilize
  formInit(){
    this.loginForm = this.fb.group({
      username: ['',[Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      agreeTerms: [false, Validators.requiredTrue]
    });
  }


  onLogin(){

    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (res:any) => {
        this.router.navigate(['/']);
        this.commonSetting.toasterSuccess(res.message);
      },
      error: (error:any) => {
        this.showAlert = true;
        this.errorMsg = error || 'Something went wrong';
        this.commonSetting.toasterError(this.errorMsg);
      },
      complete: () => {
        console.log("Observable is completed")
      }
    })

  }


  closeAlert(){
    if(this.showAlert){
      this.showAlert = false;
    }
  }

}
