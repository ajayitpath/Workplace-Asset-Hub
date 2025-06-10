import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormdataService } from '../Services/formdata.service';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  submitted = false;
  errorMessage = '';
  successMessage = '';
  isSubmitting = false;
  profileImage: File | null = null;
  imageRequired = false;

  genderOptions = [
    { label: 'Male', value: 0 },
    { label: 'Female', value: 1 },
    { label: 'Other', value: 2 }
  ];
  roleOptions = [
    { label: 'Admin', value: 0 },
    { label: 'User', value: 1 },
    { label: 'Manager', value: 2 }
  ];
  constructor(private formBuilder: FormBuilder, private router: Router, private formDataService: FormdataService, private authService: AuthService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100), Validators.pattern(/^(?=.*@)(?=.*\.).+$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,100}$/)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,100}$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      gender: ['', Validators.required],
      dob: ['', [Validators.required, dobValidator()]], // date of birth
      deskNo: ['', [Validators.pattern(/^[0-9]{1,4}$/), Validators.maxLength(20)]], // 1-4 digit desk number
      // roleId: ['', Validators.required], // Assuming roleId is a string
      profileImage: [null],
    }, { validators: this.passwordMatchValidator });

    const savedData = this.formDataService.getFormData();
    if (savedData) {
      this.registerForm.patchValue(savedData);
    }
  }
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }
  onImageUpload(event: any) {
    const file = event.files?.[0];
    if (file) {
      this.profileImage = file; 
      this.imageRequired = false;
    }
  }
  allowOnlyNumbers(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    // Allow only 10 digits
    if (input.value.length >= 10) {
      event.preventDefault();
      return;
    }
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  onNavigateAway(): void {
    this.formDataService.setFormData(this.registerForm.value);
    this.router.navigate(['/auth/emailverify']);
  }
  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.imageRequired = false;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;

    const formValue = this.registerForm.value;
    const registerData: any = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      password: formValue.password,
      confirmPassword: formValue.confirmPassword,
      phoneNumber: formValue.phoneNumber,
      gender: formValue.gender.value,
      dob: this.formatDateOnly(formValue.dob),
      deskNo: formValue.deskNo,
      // roleId: formValue.roleId,
    };

    this.authService.register(registerData).subscribe({
      next: (res) => {
        const userId = res.userId;
        if (this.profileImage && userId) {
          this.authService.uploadProfileImage(userId, this.profileImage).subscribe({
            next: () => {
              localStorage.setItem('email', formValue.email);
              this.messageService.add({
                severity: 'success',
                summary: 'Registration Successful',
                detail: 'Your account has been registered successfully.',
                life: 3000
              });
              this.isSubmitting = false;
              this.registerForm.reset();
              this.profileImage = null;
              this.submitted = false;
              setTimeout(() => {
                this.router.navigate(['/auth/emailverify'], {
                  queryParams: { email: formValue.email }
                });
              }, 3000);
            },
            error: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to upload profile image.',
                life: 3000
              });
              this.isSubmitting = false;
            }
          });
        } else {
          this.messageService.add({
            severity: 'success',
            summary: 'Registration Successful',
            detail: 'Your account has been registered successfully.',
            life: 3000
          });
          this.isSubmitting = false;
          this.registerForm.reset();
          this.profileImage = null;
          this.submitted = false;
          setTimeout(() => {
            this.router.navigate(['/auth/emailverify'], {
              queryParams: { email: formValue.email }
            });
          }, 3000);
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Registration Failed',
          detail: 'Registration failed. Please try again.',
          life: 3000
        });
        this.isSubmitting = false;
      }
    });
  }
  private formatDateOnly(date: any): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // "YYYY-MM-DD"
  }

}
export function dobValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dob = new Date(control.value);
    const today = new Date();

    if (!control.value || isNaN(dob.getTime())) return null;

    if (dob > today) {
      return { futureDate: true };
    }

    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    if (age < 18) {
      return { underage: true };
    }

    if (age > 60) {
      return { overage: true };
    }

    return null;
  };
}

