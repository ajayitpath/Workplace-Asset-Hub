import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]]
    });
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const { email, password } = this.loginForm.value;
    console.log('Login data:', email, password);
    this.router.navigate(['/dashboard'])

    setTimeout(() => {
      this.isSubmitting = false;
    }, 1500);

    // For real implementation:
    // this.authService.login(this.loginForm.value).subscribe({
    //   next: (response) => { ... },
    //   error: (err) => { this.errorMessage = err.error.message; },
    //   complete: () => { this.isSubmitting = false; }
    // });
  }
}
