import {Component, inject} from '@angular/core';
import { Router, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-auth-wrapper',
  imports: [
    RouterOutlet
  ],
  templateUrl: './auth-wrapper.component.html',
  standalone: true,
  styleUrl: './auth-wrapper.component.scss'
})
export class AuthWrapperComponent {
  private readonly router = inject(Router);

  redirectToHome() {
    this.router.navigate(['auth/login']);
  }
}
