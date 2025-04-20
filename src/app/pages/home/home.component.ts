import { PrescriptionService } from './../../core/services/prescription/prescription.service';
import { AuthService } from './../../core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  user: any;

  constructor(
    private authService: AuthService,
    private prescriptionService: PrescriptionService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUserData();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.prescriptionService.uploadPrescription(file).subscribe({
        next: () => {
          this.toastr.success('Prescription uploaded successfully');
          this.router.navigate(['/uploads']);
        },
        error: (err) => {
          this.toastr.error(err.error.message || 'Upload failed');
        }
      });
    }
  }
}