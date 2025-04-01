import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink ] ,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

   private readonly authService = inject(AuthService);
    private readonly router = inject(Router)
    isLoading: boolean = false;
    msgError: string = '';
  
    loginForm: FormGroup = new FormGroup({
      email: new FormControl(null , [Validators.required , Validators.email]),
      password: new FormControl(null , [Validators.required ]),
    });
  
    submitForm():void {
      if(this.loginForm.valid) { 
        this.isLoading = true;
        this.authService.sendLoginForm(this.loginForm.value).subscribe({
          next: (res) => {
            console.log(res)
            if (res.message === 'success') {
              this.isLoading = false;
              localStorage.setItem('token', res.token);
              console.log(this.authService.getUserData());
              this.authService.getUserData();
              this.router.navigate(['/home']);
            }
          },
          error: (err:HttpErrorResponse) => {
            console.log(err)
            this.msgError = err.error.message;
            this.isLoading = false;
          }
        }
        
        );
      }
    }
  

}
