import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {NavigationComponent} from "./navigation/navigation.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
