import { Component, inject, input } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-blanklayer',
  imports: [ RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './Blanklayout.component.html',
  styleUrl: './Blanklayout.component.scss'
})
export class BlanklayoutComponent {
  readonly authService = inject(AuthService);
  isLogin = input<boolean>(true);
}
