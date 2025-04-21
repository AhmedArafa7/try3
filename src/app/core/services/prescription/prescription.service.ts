import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IPrescription } from '../../../shared/interfaces/Iprescription';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private apiUrl = `${environment.baseUrl}/prescriptions`;

  constructor(private http: HttpClient) {}

  uploadPrescription(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  getPrescriptions(): Observable<IPrescription[]> {
    return this.http.get<IPrescription[]>(this.apiUrl);
  }

  deletePrescription(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}