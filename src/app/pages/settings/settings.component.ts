import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { PharmacistService } from '../../core/services/pharmacist/pharmacist.service';
import { Pharmacist } from '../../shared/interfaces/Ipharmacist';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  pharmacist: Pharmacist = {
    id: 0,
    fullName: '',
    email: '',
    createdAt: '',
    updatedAt: ''
  };

  constructor(
    private pharmacistService: PharmacistService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.pharmacistService.getProfile().subscribe({
      next: (pharmacist) => {
        this.pharmacist = pharmacist;
      },
      error: (err) => {
        this.toastr.error(err.error.message || 'Failed to load profile');
      }
    });
  }

  onSubmit(): void {
    this.pharmacistService.updateProfile({
      fullName: this.pharmacist.fullName,
      email: this.pharmacist.email
    }).subscribe({
      next: () => {
        this.toastr.success('Profile updated successfully');
      },
      error: (err) => {
        this.toastr.error(err.error.message || 'Failed to update profile');
      }
    });
  }
}
