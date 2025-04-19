import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-register-auth',
  templateUrl: './register-auth.component.html',
  styleUrl: './register-auth.component.css'
})
export class RegisterAuthComponent {
  registerForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  roles: string[] = ['seller', 'user'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill all fields correctly.';
      return;
    }

    const data = this.registerForm.value;

    this.authService.register(data).subscribe({
      next: () => {
        this.successMessage = 'Registration successful! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 500);
      },
      error: (err) => {
        this.errorMessage =  'Registration failed. Try again.';
      }
    });
  }

}
