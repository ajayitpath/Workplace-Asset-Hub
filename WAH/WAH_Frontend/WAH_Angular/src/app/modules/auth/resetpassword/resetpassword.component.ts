import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { ResetPasswordDto } from '../../../shared/Model/auth.model';

@Component({
  selector: 'app-resetpassword',
  standalone: false,
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {
  resetPasswordForm!: FormGroup;
  isSubmitting = false;
  errorMessage: string = '';
  token: string = ''; // assuming you receive a reset token in the query
  email: string = '';
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
      this.email = params['email'] || '';
    });
    if (!this.token || !this.email) {
      this.errorMessage = 'Reset token or email is missing.';
      return;
    }
  }

  passwordMatchValidator(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.resetPasswordForm.invalid) {

      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    if (!this.token || !this.email) {
      this.errorMessage = 'Reset token or email is missing.';
      return;
    }
    this.isSubmitting = true;
    this.errorMessage = '';

    const dto: ResetPasswordDto = {
      email: this.email,
      token: this.token,
      newPassword: this.resetPasswordForm.value.newPassword,
      confirmPassword: this.resetPasswordForm.value.confirmPassword
    };

    this.authService.resetPassword(dto).subscribe({
      next: (res) => {
        console.log(res);
        this.isSubmitting = false;
        alert(res.message || 'Password reset successful. Please login.');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error(err);
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || 'Something went wrong. Please try again.';
      }
    });
  }
}
