import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private fb:FormBuilder,
    private route:Router
  ){}


  FormsData!: FormGroup;
  isRegistering: boolean = true; 


  ngOnInit(): void {
    this.FormsData = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: [''],
      fullName: ['']
    });
  }

  toggleForm(): void {
    this.isRegistering = !this.isRegistering;
    this.FormsData.reset();
  }


  onSubmit(): void {
    if (this.FormsData.valid) {
      if (this.isRegistering) {
        // Call register API
        const data = this.FormsData.value
        this.authService.registerNewUser(data).subscribe(data=>{
          console.log("data registered",data)
        })
        console.log('Registering:', this.FormsData.value);
      } else {
        // Call login API
        const data = this.FormsData.value
        this.authService.login(data).subscribe(data=>{
          console.log("login data",data)
        })
        console.log('Logging in:', this.FormsData.value);
      }
    } else {
      console.log('Form is invalid');
    }
  }


}
