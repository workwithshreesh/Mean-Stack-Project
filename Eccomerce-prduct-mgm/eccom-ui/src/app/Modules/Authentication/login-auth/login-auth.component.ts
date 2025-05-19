import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-login-auth',
  templateUrl: './login-auth.component.html',
  styleUrl: './login-auth.component.css'
})
export class LoginAuthComponent {

  loginForm!: FormGroup;
  errorMessage: string = '';
  roles: string[] = ['seller', 'user'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]
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
          role: response.role,  // Fixed
          id: response.id        // Fixed
        };
        console.log("auth data", authData);
        localStorage.setItem('auth', JSON.stringify(authData));
        this.router.navigate(['/']);
      },
      error: (err:any) => {
        console.error("Login error:", err);
        this.errorMessage = err?.error?.message || 'Login failed. Try again.';
      }
    });
  }
  
}
