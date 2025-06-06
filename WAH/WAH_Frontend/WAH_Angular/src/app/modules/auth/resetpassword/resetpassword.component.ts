import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { ResetPasswordDto } from '../../../shared/Model/auth.model';
import { MessageService } from 'primeng/api';

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
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
      this.email = params['email'] || '';
    });
    if (!this.token || !this.email) {
      this.messageService.add({
        severity: 'error',
        summary: 'Missing Information',
        detail: 'Reset token or email is missing.',
        life: 3000
      });
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
      this.messageService.add({
        severity: 'error',
        summary: 'Missing Data',
        detail: 'Reset token or email is missing.',
        life: 3000
      });
      return;
    }
    this.isSubmitting = true;

    const dto: ResetPasswordDto = {
      email: this.email,
      token: this.token,
      newPassword: this.resetPasswordForm.value.newPassword,
      confirmPassword: this.resetPasswordForm.value.confirmPassword
    };

    this.authService.resetPassword(dto).subscribe({
      next: (res) => {
        // console.log(res);
        this.isSubmitting = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message || 'Password reset successful. Please login.',
          life: 3000
        });

        // Delay navigation so user sees the toast
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 3000); // Matches the toast duration
      },
      error: (err) => {
        // console.error(err);
        this.isSubmitting = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error?.message || 'Something went wrong. Please try again.',
          life: 3000
        });
      }
    });
  }
}
