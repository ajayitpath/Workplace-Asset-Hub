import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  standalone: false, 
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {
  forgotPasswordForm!: FormGroup;
  isSubmitting = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const email = this.forgotPasswordForm.value.email;

    // this.authService.sendForgotPasswordEmail(email).subscribe({
    //   next: () => {
    //     this.isSubmitting = false;
    //     // Navigate to OTP or success page, or show a message
    //     alert('Reset instructions sent to your email.');
    //     this.router.navigate(['/auth/reset-password']);
    //   },
    //   error: (err) => {
    //     this.isSubmitting = false;
    //     this.errorMessage = err.error?.message || 'Something went wrong. Please try again.';
    //   }
    // });
  }
}
