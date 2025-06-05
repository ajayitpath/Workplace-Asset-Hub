export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  gender: number;
  deskNo: string;
  roleId: string;
  dob: string; // Use 'yyyy-MM-dd' format
}


export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  email: string;
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface VerifyOtpDto {
  email: string;
  otp: string;
}

export interface UserProfile {
  userId?: string;
  file: File;
}