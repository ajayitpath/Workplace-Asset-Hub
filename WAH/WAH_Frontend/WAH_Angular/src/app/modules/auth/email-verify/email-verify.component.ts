import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-verify',
  standalone: false,
  templateUrl: './email-verify.component.html',
  styleUrl: './email-verify.component.css'
})
export class EmailVerifyComponent {

  otpForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });
  }

  onVerify() {
    if (this.otpForm.valid) {
      const otp = this.otpForm.value.otp;
      // Call API to verify OTP here
      console.log('Verifying OTP:', otp);
      // Navigate on success
      // this.router.navigate(['/auth/login']);
    }
  }

  resendOtp() {
    // Call API to resend OTP
    console.log('Resending OTP...');
  }
}
