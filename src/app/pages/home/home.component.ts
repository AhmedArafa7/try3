import { Component } from '@angular/core';
import { IprescInfo } from '../../shared/interfaces/Ipresc';

interface ImageInfo {
  file: File;
  src: string;
  name: string;
  size: number;
  type: string;
  lastModified: Date;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  images: IprescInfo[] = [] as IprescInfo[];
  show: boolean = true;

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
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

  hiden(){
    this.show = false;
  }
}
