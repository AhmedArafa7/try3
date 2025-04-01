import { Component, inject } from '@angular/core';
import { ImagesService } from '../../core/services/images/images.service';
import { IprescInfo } from '../../shared/interfaces/Ipresc';
import { Observable } from 'rxjs';
import { environment } from '../../core/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-uploads',
  imports: [],
  templateUrl: './uploads.component.html',
  styleUrl: './uploads.component.scss'
})
export class UploadsComponent {
    private readonly imagesService = inject(ImagesService);
    images: IprescInfo[] = [] as IprescInfo[];
  items = [1,2,3,4,5]

  constructor( private httpClient:HttpClient ) { }
  
  ngOnInit(): void {
    this.getPrescriptionsData();
  }

  getPrescriptionsData():void {
    this.imagesService.getAllPriscriptions().subscribe({
      next:(res)=>{
        console.log('test');
        console.log(res.data);
        this.images = res.data;
      },
      error:(err)=>{
        console.log(err);
      }
    });}

    removePrescription(id:string): Observable<any> {
        return this.httpClient.delete(environment.baseUrl +`/images/${id}`);
    }
}

