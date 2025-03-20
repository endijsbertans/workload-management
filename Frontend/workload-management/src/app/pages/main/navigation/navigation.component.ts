import {Component, inject, signal} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatFabAnchor} from "@angular/material/button";
import {TokenService} from "../../../services/token/token.service";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterLink,
    MatIcon,
    MatFabAnchor
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  private readonly tokenService = inject(TokenService);
  isAdmin = signal(this.tokenService.isAdmin());
  authDetails = this.tokenService.getAuthDetails();
  constructor() {
    console.log("AUTH: " + this.authDetails.fullName + " " + this.authDetails.authorities);
  }
  logout(){
    localStorage.removeItem('token');
    window.location.reload();
  }
}
