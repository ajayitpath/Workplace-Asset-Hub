import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private fb: FormBuilder,

    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });

    // // Get reset token from query params if applicable
    // this.route.queryParams.subscribe(params => {
    //   this.token = params['token'] || '';
    // });
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

    this.isSubmitting = true;
    this.errorMessage = '';

    const newPassword = this.resetPasswordForm.value.newPassword;

    // this.authService.resetPassword(this.token, newPassword).subscribe({
    //   next: () => {
    //     this.isSubmitting = false;
    //     alert('Password reset successful. Please login.');
    //     this.router.navigate(['/auth/login']);
    //   },
    //   error: (err) => {
    //     this.isSubmitting = false;
    //     this.errorMessage = err.error?.message || 'Something went wrong. Please try again.';
    //   }
    // });
  }
}
