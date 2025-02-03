import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatFabAnchor} from "@angular/material/button";

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

}
