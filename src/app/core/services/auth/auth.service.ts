import { Router } from '@angular/router';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  private readonly router = inject(Router);

  userData: any;

  sendRegegisterForm(data: object):Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data);
  }

  sendLoginForm(data: object):Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data);
  }

  getUserData() {
    this.userData = jwtDecode(localStorage.getItem('token')!);
    console.log(this.userData);
    return this.userData;
  }

  logoutUser():void {
    localStorage.removeItem('token');
    this.userData = null;
    this.router.navigate(['/login']);
  }

  setEmailVerifay(data:object):Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, data);
  }

  setCodeVerifay(data:object):Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, data);
  }

  setResetPass(data:object):Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, data);
  }
}
