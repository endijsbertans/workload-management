import {inject, Injectable} from '@angular/core';
import {TokenService} from "../token/token.service";
import {Subscription, timer} from "rxjs";
import {Router, NavigationEnd} from "@angular/router";
import {filter, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenExpirationService {
  private readonly tokenService = inject(TokenService);
  private readonly tokenCheckInterval = 30000;
  private readonly router = inject(Router);
  private checking = false;
  private subscription: Subscription | undefined;
  private routerSubscription: Subscription | undefined;

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      take(1)
    ).subscribe((event: NavigationEnd) => {
      console.log('First navigation completed to:', event.url);
      this.setupNavigationHandling();
    });
  }

  private setupNavigationHandling(): void {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      console.log('Navigation completed to:', event.url);

      if (event.url.includes('/activate-account') || event.url.startsWith('/auth')) {
        console.log('On auth route - stopping checks');
        this.stopExpirationCheck();
      } else {
        console.log('On protected route - starting checks');
        this.startExpirationCheck();
      }
    });
  }

  startExpirationCheck(): void {
    if (this.checking) return;
    this.checking = true;
    this.subscription = timer(500, this.tokenCheckInterval).subscribe(() => {
      this.checkTokenExpiration();
    });
  }

  stopExpirationCheck(): void {
    if (!this.checking) return;
    this.subscription?.unsubscribe();
    this.checking = false;
  }

  private checkTokenExpiration(): void {
    const currentUrl = this.router.url;
    console.log('Current URL in check:', currentUrl);

    if (currentUrl.includes('/activate-account') || currentUrl.startsWith('/auth')) {
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
