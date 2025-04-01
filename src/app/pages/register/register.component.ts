import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router)
  isLoading: boolean = false;
  msgError: string = '';

  register: FormGroup = new FormGroup({
    name: new FormControl(null , [Validators.required ,Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null , [Validators.required , Validators.email]),
    password: new FormControl(null , [Validators.required ,Validators.minLength(7), Validators.maxLength(20), Validators.pattern(/^[A-Z] $/)]),//password must contain at least one uppercase letter, one lowercase letter, one number, and one special character
    rePassword: new FormControl(null , [Validators.required ]),
  }, { validators: this.rePassword });

  submitForm():void {
    if(this.register.valid) {
      this.isLoading = true;
      this.authService.sendRegegisterForm(this.register.value).subscribe({
        next: (res) => {
          console.log(res)
          if (res.message === 'success') {
            this.isLoading = false;
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
    }else {
      this.register.markAllAsTouched();
    }
  }

  rePassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    return password === rePassword ? null : { notSame: true };
  }
}
