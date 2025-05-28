import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { FormdataService } from '../Services/formdata.service';
import { AuthService } from '../Services/auth.service';

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
  constructor(private formBuilder: FormBuilder, private router: Router, private formDataService: FormdataService, private authService: AuthService) { }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]], // 10-digit phone number
      gender: ['', Validators.required], // assuming a dropdown or radio
      dob: [''], // date of birth
      deskNo: ['', [Validators.required, Validators.pattern(/^[0-9]{1,4}$/)]], // 1-4 digit desk number
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

  onNavigateAway(): void {
    debugger
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
      // if (!this.profileImage) {
      //   this.imageRequired = true;
      // }
      return;
    }
    // if (this.profileImage) {
    //   this.imageRequired = true;
    //   return;
    // }
    this.isSubmitting = true;

    const formValue = this.registerForm.value;
    // Prepare data to send (exclude profileImage)
    const registerData: any = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      password: formValue.password,
      confirmPassword: formValue.confirmPassword,
      phoneNumber: formValue.phoneNumber,
      gender: formValue.gender.value,
      dob: this.formatDateOnly(formValue.dob), // backend expects DateOnly (adjust if needed)
      deskNo: formValue.deskNo,
      roleId: formValue.roleId,
    };

    // Register the user first
    this.authService.register(registerData).subscribe({
      next: (res) => {
        const userId = res.userId;
        if (this.profileImage && userId) {
          // Upload image with real userId
          this.authService.uploadProfileImage(userId, this.profileImage).subscribe({
            next: (uploadRes) => {
              this.successMessage = 'Registration successful!';
              this.isSubmitting = false;
              this.registerForm.reset();
              this.profileImage = null;
              this.submitted = false;
              this.router.navigate(['/auth/emailverify']);
            },
            error: () => {
              this.errorMessage = 'Failed to upload profile image.';
              this.isSubmitting = false;
            }
          });
        } else {
          // No profile image, just finish registration
          this.successMessage = 'Registration successful!';
          this.isSubmitting = false;
          this.registerForm.reset();
          this.profileImage = null;
          this.submitted = false;
          this.router.navigate(['/auth/emailverify']);
        }
      },
      error: () => {
        this.errorMessage = 'Registration failed. Please try again.';
        this.isSubmitting = false;
      }
    });
  }
  private formatDateOnly(date: any): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // "YYYY-MM-DD"
  }

}
