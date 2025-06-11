import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { VerifyOtpDto } from '../../../shared/Model/auth.model';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-email-verify',
  standalone: false,
  templateUrl: './email-verify.component.html',
  styleUrl: './email-verify.component.css'
})
export class EmailVerifyComponent {
  otpForm!: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  email = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private route: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit(): void {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]]
    });
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  onVerify(): void {
    if (!this.email) {
      this.email = localStorage.getItem('email') || '';
    }
    if (this.otpForm.invalid || !this.email) {
      this.otpForm.markAllAsTouched();
      if (this.otpForm.get('otp')?.errors?.['pattern']) {
        this.messageService.add({
          severity: 'error',
          summary: 'Invalid OTP',
          detail: 'OTP must be exactly 6 digits and contain numbers only.',
          life: 4000
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Validation Error',
          detail: 'Email or OTP is missing.',
          life: 4000
        });
      }
      return;
    }
    this.isSubmitting = true;
    this.errorMessage = '';
    const dto: VerifyOtpDto = {
      email: this.email,
      otp: this.otpForm.value.otp
    };
    this.authService.verifyOtp(dto).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message || 'OTP verified successfully.',
          life: 2000
        });
        setTimeout(() => {
          this.router.navigate(['auth/login'], {
            queryParams: { email: this.email }
          });
        }, 2000); // Navigate to login after 2 seconds
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error?.message || 'OTP verification failed.',
        });
      }
    });
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  resendOtp(): void {
    if (!this.email) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Email is missing. Cannot resend OTP.',
      });
      return;
    }
    this.isSubmitting = true;
    this.errorMessage = '';
    this.authService.resendOtp(this.email).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message || 'OTP has been resent to your email.',
        });
      },
      error: (err) => {
        this.isSubmitting = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error?.message || 'Failed to resend OTP.',
        });
      }
    });
  }
}
