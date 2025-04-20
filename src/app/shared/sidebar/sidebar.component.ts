import { AuthService } from './../../core/services/auth/auth.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  @Input() isOpen: boolean = false;
  user: any;

  constructor(private authService: AuthService) {
    this.user = this.authService.getUserData();
  }

  logout(): void {
    this.authService.logout();
  }
}