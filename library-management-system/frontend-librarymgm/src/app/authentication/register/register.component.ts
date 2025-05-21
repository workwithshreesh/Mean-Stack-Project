import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm!:FormGroup;
  errorMsg!:string;
  showAlert:boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit() :void {
    // form intialization
    this.formInit();
  }

  ngOnDestroy() : void {
    
  }


  formInit(): void {
    this.registerForm = this.fb.group({
      fullName: ['',[Validators.required, Validators.minLength(4)]],
      username: ['',[Validators.required, Validators.minLength(4)]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',Validators.required]
    });
  }


  closeAlert(){
    if(this.showAlert){
      this.showAlert = false;
    }
  }


  onRegister(){
    this.authService.register(this.registerForm.value).subscribe(
      (res:any)=> {
        this.showAlert = true;
        this.errorMsg = res.error || "User has been successfully registered"

        setTimeout(()=>{
          this.router.navigate(['/login']);
        },2000);

      },
      (error:any)=> {
        this.showAlert = true;
        this.errorMsg = error || "Something went wrong";
      },
      ()=>{
        console.log("Observable is completed")
      }
    )
  }

}
