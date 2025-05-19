import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  // Login Form
  loginForm!:FormGroup

  constructor(
    private authService: AuthService,
    private fb:FormBuilder
  ){}

  ngOnInit(): void {

    this.formInit()


  }

  ngOnDestroy(): void {
    
  }

  // Form intilize
  formInit(){
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      agreeTerms: [false, Validators.requiredTrue]
    });
  }


  onLogin(){

    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
    }

  }

}
