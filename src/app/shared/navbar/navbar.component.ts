import { AuthService } from './../../core/services/auth/auth.service';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  @Output() sidebarToggled = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  toggleSidebar(): void {
    this.sidebarToggled.emit();
  }

  logout(): void {
    this.authService.logout();
  }
}