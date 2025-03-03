import {inject, Injectable} from '@angular/core';
import {TokenService} from "../token/token.service";
import {BehaviorSubject, Subscription, timer} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class TokenExpirationService {


  private readonly tokenService = inject(TokenService);

  private readonly tokenCheckInterval = 30000;
  private readonly destroy$ = new BehaviorSubject<boolean>(false);
  private checking = false;
  private readonly router = inject(Router);

  private subscription: Subscription | undefined;
  startExpirationCheck(): void {
    if (this.checking) return;
    this.checking = true;
    this.subscription = timer(0, this.tokenCheckInterval).subscribe(() => {
        this.checkTokenExpiration();

    });
  }
  stopExpirationCheck(): void {
    if (!this.checking) return;
    this.subscription?.unsubscribe();
    this.checking = false;
  }
  private checkTokenExpiration(): void {
    console.log('checkTokenExpiration called');
    const currentUrl = this.router.url;
    if (currentUrl.startsWith('/auth')) {
      this.stopExpirationCheck();
      return;
    }
    if (this.tokenService.isTokenNotValid()) {
      console.log('Token is not valid');
      this.stopExpirationCheck();
      localStorage.removeItem('token');
      this.router.navigate(['/auth/login']);
    }
  }
}
