import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
        Validators.pattern(/^(?=.*@)(?=.*\.).+$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,100}$/
        )
      ]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    const loginData = this.loginForm.value;
    this.authService.login(loginData).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token); // Store token
        this.messageService.add({
          severity: 'success',
          summary: 'Login Successful',
          detail: 'Welcome back!',
          life: 3000
        });
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 3000);          // Navigate to dashboard
      },
      error: (err) => {
        const backendMessage = err?.error?.message;
        const status = err?.status;
        if (status === 401) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Unauthorized',
            detail: 'Invalid email or password.'
          });
        } else if (status === 500) {
          this.messageService.add({
            severity: 'error',
            summary: 'Server Error',
            detail: 'Please try again later.'
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: backendMessage || 'Something went wrong. Please try again.'
          });
        }
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
