import { Component } from '@angular/core';
import {DataRowOutlet} from "@angular/cdk/table";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-new-user',
  imports: [
    RouterLink
  ],
  templateUrl: './new-user.component.html',
  standalone: true,
  styleUrl: './new-user.component.scss'
})
export class NewUserComponent {

}
