import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TokenService} from "../token/token.service";
import {MatSnackBar} from "@angular/material/snack-bar";

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if(tokenService.isTokenNotValid()){
    router.navigate(['/auth/login']);
    return false;
  }
  return true;
};
export const authAdmin: CanActivateFn = (route, state) => {
  const _snackBar = inject(MatSnackBar);
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if(tokenService.isTokenNotValid()){
    router.navigate(['/auth/login']);
    return false;
  }
  if(!tokenService.isAdmin()){
    _snackBar.open('Nav autoritāte', 'Aizvērt', { duration: 5000 });
    return false;
  }
  return true;
};
export const publicRoute: CanActivateFn = () => {
  return true;
};
