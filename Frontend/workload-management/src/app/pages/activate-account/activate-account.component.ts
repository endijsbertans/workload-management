import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {CodeInputModule} from "angular-code-input";

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [
    CodeInputModule
  ],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent {
  message = '';
  codeOk = true;
  submitted = false;
  submittedCode = '';

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ){}

  onCodeCompleted(submittedCode: string) {
    this.confirmAccount(submittedCode);
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  private confirmAccount(token: string) {
    this.authService.confirm({
      token
    }).subscribe({
      next: () =>{
       this.message = 'Your account has been activated\n Now you can proceed to login'
       this.submitted = true;
       this.codeOk = true;
      },
      error:(err) =>{
          const errorResponse = JSON.parse(err.error);
          this.message = errorResponse.errorMsg;
          this.submitted = true;
          this.codeOk = false;

      }
      }
    )
  }
  onTryAgain() {
    this.submitted = false;
    this.codeOk = true;
  }
}
