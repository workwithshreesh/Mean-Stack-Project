import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/chat']);
    }

    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill all fields.';
      return;
    }
  
    const credentials = this.loginForm.value;
  
    this.authService.login(credentials).subscribe({
      next: (response: any) => {
        const authData = {
          token: response.token,
          id: response.user.id       // Fixed
        };
        console.log("auth data", authData);
        localStorage.setItem('auth', JSON.stringify(authData));
        this.router.navigate(['/']);
      },
      error: (err:any) => {
        console.error("Login error:", err);
        this.errorMessage =  'Login failed. Try again.';
      }
    });
  }
  

}
