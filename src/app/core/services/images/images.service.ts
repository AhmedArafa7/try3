import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor( private httpClient:HttpClient ) { }

  myToken:any = localStorage.getItem('token');
  

  uploadImage(image:string): Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/images`,
      {
        'imageSrc': image
      },
      {
        headers:{
          token: this.myToken
        }
  });
  }

  getImage(id: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/notauth/images/${id}`, { responseType: 'blob' });
  }

  getAllPriscriptions(): Observable<any>
  {
    return this.httpClient.get(environment.baseUrl +'/images');
  }

  getSpecificPriscriptionData(id:string):Observable<any>
  {
    return this.httpClient.get(environment.baseUrl +`/images/${id}`);
  }

    


}
