import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { VerifyOtpDto } from '../../../shared/Model/auth.model';

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

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private route: ActivatedRoute) { }


  // this.otpForm = this.fb.group({
  //     otp: ['', Validators.required]
  //   });
  // }

  // onVerify() {
  //   if (this.otpForm.valid) {
  //     const otp = this.otpForm.value.otp;
  //     // Call API to verify OTP here
  //     console.log('Verifying OTP:', otp);
  //     // Navigate on success
  //     // this.router.navigate(['/auth/login']);
  //   }
  // }

  // resendOtp() {
  //   // Call API to resend OTP
  //   console.log('Resending OTP...');
  // }
  ngOnInit(): void {
    console.log('ngOnInit called');
    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });

    // ✅ Get email from query params
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  onVerify(): void {
    debugger;
    if (!this.email) {
      this.email = localStorage.getItem('email') || '';
      console.log('Email from localStorage:', this.email);
    }
    if (this.otpForm.invalid || !this.email) {
      this.otpForm.markAllAsTouched();
      this.errorMessage = 'Email or OTP is missing.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const dto: VerifyOtpDto = {

      email: this.email,
      Otp: this.otpForm.value.otp
    };

    this.authService.verifyOtp(dto).subscribe({
      next: (res) => {
        debugger
        this.isSubmitting = false;
        alert(res.message || 'OTP verified successfully.');

        this.router.navigate(['auth/login'], {
          state: { email: this.email }
        });
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || 'OTP verification failed.';
      }
    });
  }

  resendOtp(): void {
    if (!this.email) {
      const rawEmail = localStorage.getItem('email') || '';
      try {
        this.email = JSON.parse(rawEmail); // Remove extra quotes if needed
      } catch {
        this.email = rawEmail.replace(/^"(.*)"$/, '$1');
      }
    }
    if (!this.email) {
      alert('Email is missing. Cannot resend OTP.');
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.resendOtp(this.email).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        alert(res.message || 'OTP has been resent to your email.');
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || 'Failed to resend OTP.';
      }
    });
  }
}
