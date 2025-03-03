import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TokenExpirationService} from "./services/guard/token-expiration.service";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})
export class AppComponent{
  private readonly tokenExpirationService = inject(TokenExpirationService);

  ngOnInit() {
    this.tokenExpirationService.startExpirationCheck();
  }
}
