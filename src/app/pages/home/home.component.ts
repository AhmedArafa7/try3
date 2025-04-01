import { Component, inject } from '@angular/core';
import { IprescInfo } from '../../shared/interfaces/Ipresc';
import { AuthService } from '../../core/services/auth/auth.service';
import { ImagesService } from '../../core/services/images/images.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private readonly authService = inject(AuthService);
  private readonly imagesService = inject(ImagesService);
  images: IprescInfo[] = [] as IprescInfo[];
  show: boolean = false;
  userName: string = this.authService.getUserData().name;

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
  

  constructor() {
    console.log(this.authService.userData);
    console.log(this.authService.userData?.email);
    console.log('userData', this.authService.userData);
    console.log('test',this.authService.getUserData().name);
    this.authService.getUserData();
  }
  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          this.imagesService.uploadImage(e.target?.result as string)
          this.images.push({
            file: file,
            src: e.target?.result as string,
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: new Date(file.lastModified)
          });
        };
        reader.readAsDataURL(file);
        this.show = true;
      }
    }
  }

  hide() {
    this.show = false;
  }




}
