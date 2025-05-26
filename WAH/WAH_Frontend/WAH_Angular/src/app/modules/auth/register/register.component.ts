import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { FormdataService } from '../Services/formdata.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  
  genderOptions = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Other', value: 'Other' }
];

profileImage: File | null = null;
imageRequired = false;

onImageUpload(event: any) {
  const file = event.files?.[0];
  if (file) {
    this.profileImage = file;
    this.imageRequired = false;
  }
}
   registerForm!: FormGroup;
  submitted = false;
  errorMessage = '';
  successMessage = '';
  isSubmitting = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private formDataService: FormdataService) {}

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
  onNavigateAway(): void {
    debugger
    this.formDataService.setFormData(this.registerForm.value);
    this.router.navigate(['/auth/emailverify']); 
  }
  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const formData = this.registerForm.value;
    console.log('Registration form data:', formData);

    // Simulated response
    setTimeout(() => {
      this.successMessage = 'Registration successful!';
      this.isSubmitting = false;
      this.registerForm.reset();
      this.submitted = false;
    }, 1500);

    // For real implementation:
    // this.authService.register(formData).subscribe({
    //   next: res => {
    //     this.successMessage = 'Registration successful!';
    //     this.registerForm.reset();
    //   },
    //   error: err => {
    //     this.errorMessage = 'Registration failed. Please try again.';
    //   },
    //   complete: () => {
    //     this.isSubmitting = false;
    //   }
    // });
  }

  // Optional helper to get controls in template
  get f() {
    return this.registerForm.controls;
  }
}
