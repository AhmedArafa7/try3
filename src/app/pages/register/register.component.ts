import { AuthService } from './../../core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink], // تأكد من استيرادها
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.signupForm.invalid) return;

    const { fullName, email, password, confirmPassword } = this.signupForm.value;

    if (password !== confirmPassword) {
      this.toastr.error('Passwords do not match');
      return;
    }

    const user = { fullName, email, password };

    this.authService.sendRegegisterForm(user).subscribe({
      next: (response) => {
        this.authService.setToken(response.token);
        this.toastr.success('Registration successful');
        this.router.navigate(['/home2']);
      },
      error: (err) => {
        this.toastr.error(err.error.message || 'Registration failed');
      }
    });
  }
}
