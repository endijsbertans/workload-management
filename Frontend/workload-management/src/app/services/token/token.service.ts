import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  set token(token: string){
      localStorage.setItem('token', token);
  }
  get token(){
    return localStorage.getItem('token') as string;
  }

  isTokenNotValid(): boolean {
    return !this.isTokenValid();
  }
  getAuthDetails(){
    const token = this.token;
    const jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(token);
  }
  getAuthority(){
    const authDetails = this.getAuthDetails();
      switch (authDetails.authorities[0]){
        case 'ROLE_ADMIN':
          return 'Administrators';
        case 'ROLE_DIRECTOR':
          return 'Direktors';
        case 'ROLE_TEACHINGSTAFF':
          return 'Docētājs';
        default:
          return '';
      }
  }
  private isTokenValid(){
    const token = this.token;
    if(!token){
      return false
    }
    //decode
    const jwtHelper = new JwtHelperService();
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if(isTokenExpired){
      localStorage.removeItem('token');
      return false;
    }
    return true;
  }

  isAdmin() {
    const authDetails = this.getAuthDetails();
    return authDetails.authorities.includes('ROLE_ADMIN') ?? authDetails.authorities.includes('ROLE_DIRECTOR')
  }
}
