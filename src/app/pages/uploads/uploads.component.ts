import { PrescriptionService } from './../../core/services/prescription/prescription.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IPrescription } from '../../shared/interfaces/Iprescription';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-uploads',
  imports: [CommonModule],
  templateUrl: './uploads.component.html',
})
export class UploadsComponent implements OnInit {
  prescriptions: IPrescription[] = [];

  constructor(
    private prescriptionService: PrescriptionService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadPrescriptions();
  }

  loadPrescriptions(): void {
    this.prescriptionService.getPrescriptions().subscribe({
      next: (prescriptions) => {
        this.prescriptions = prescriptions;
      },
      error: (err) => {
        this.toastr.error(err.error.message || 'Failed to load prescriptions');
      }
    });
  }

  deletePrescription(id: number): void {
    if (confirm('Are you sure you want to delete this prescription?')) {
      this.prescriptionService.deletePrescription(id).subscribe({
        next: () => {
          this.toastr.success('Prescription deleted successfully');
          this.loadPrescriptions();
        },
        error: (err) => {
          this.toastr.error(err.error.message || 'Failed to delete prescription');
        }
      });
    }
  }
}