import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {jwtDecode} from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient,private toastr: ToastrService,@Inject(PLATFORM_ID) private platformId: any) { }

  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService);
  private apiUrl = environment.baseUrl + '/api/v1/auth';



  userData: any;

  sendRegegisterForm(user: { fullName: string; email: string; password: string; }):Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/register`, user);
  }

  sendLoginForm(credentials: { email: string; password: string }):Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/signin`, credentials);
  }

  getUserData(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.toastr.success('Logged out successfully');
    this.userData = null;
    this.router.navigate(['/login']);

  }

  setEmailVerifay(data:object):Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/forgotPasswords`, data);
  }

  setCodeVerifay(data:object):Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/verifyResetCode`, data);
  }

  setResetPass(data:object):Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/resetPassword`, data);
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
    return localStorage.getItem('token');
  }
  return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  
}
