import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDto, RegisterDto, ForgotPasswordDto, ResetPasswordDto, VerifyOtpDto } from '../../../shared/Model/auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://localhost:7126';
  private readonly endpoint = '/api/User';
  authService: any;

  constructor(private http: HttpClient, private router: Router) { }
  // register , login , resetpassword, forgotpassword, emailverify(otp) , resetpassword link , gettoken , resetOTP, 
  login(data: LoginDto): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}${this.endpoint}/login`, data);
  }

  register(data: RegisterDto): Observable<{ message: string; userId: string }> {
    return this.http.post<{ message: string; userId: string }>(`${this.baseUrl}${this.endpoint}/register`, data);
  }

  forgotPassword(data: ForgotPasswordDto): Observable<{ token: string, message: string }> {
    return this.http.post<{ token: string, message: string }>(`${this.baseUrl}${this.endpoint}/forgot-password`, data);
  }

  resetPassword(data: ResetPasswordDto): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}${this.endpoint}/reset-password`, data);
  }

  verifyOtp(data: VerifyOtpDto): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}${this.endpoint}/otp-verify`, data);
  }
  resendOtp(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}${this.endpoint}/resend-otp`, { email });
  }

  uploadProfileImage(userId: string, file: File): Observable<{ message: string, imagePath: string }> {
    const formData = new FormData();
    formData.append('file', file);
    // formData.append('UserId', userId);                  // if needed by backend

    return this.http.post<{ message: string, imagePath: string }>(
      `${this.baseUrl}${this.endpoint}/upload/${userId}`,
      formData
    );
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
