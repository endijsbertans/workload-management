import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

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

}
