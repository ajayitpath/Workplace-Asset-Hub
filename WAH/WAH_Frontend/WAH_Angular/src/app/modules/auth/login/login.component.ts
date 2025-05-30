import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
        Validators.pattern(/^(?=.*@)(?=.*\.).+$/) // Must contain '@' and '.'
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,100}$/
        ) // Complex password rule
      ]]
    });
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    // const { email, password } = this.loginForm.value;
    // console.log('Login data:', email, password);
    // this.router.navigate(['/dashboard'])

    // setTimeout(() => {
    //   this.isSubmitting = false;
    // }, 1500);

    // Call the login service
    const loginData = this.loginForm.value;
    this.authService.login(loginData).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token); // Store token
        this.router.navigate(['/dashboard']);           // Navigate to dashboard
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Login failed. Please try again.';
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
