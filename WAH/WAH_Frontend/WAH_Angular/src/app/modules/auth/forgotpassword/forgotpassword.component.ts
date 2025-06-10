import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../Services/auth.service';
import { MessageService } from 'primeng/api';

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
  successMessage: string = '';

  constructor(
    private fb: FormBuilder, private router: Router, private authService: AuthService, private messageService: MessageService) { }

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
    this.successMessage = '';

    const email = this.forgotPasswordForm.value.email;

    this.authService.forgotPassword({ email }).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${response.message}\n (Sent to: ${email})`,
          life: 4000,
        });
      },
      error: (err) => {
        this.isSubmitting = false;
        const backendMessage = err.error?.message || 'Failed to send reset link.';
        const statusCode = err.status || 'Unknown';
        this.messageService.add({
          severity: 'error',
          summary: `Error ${statusCode}`,
          detail: `${backendMessage}\n (Email: ${email})`,
          life: 4000,
        });
      }
    });
  }
}
