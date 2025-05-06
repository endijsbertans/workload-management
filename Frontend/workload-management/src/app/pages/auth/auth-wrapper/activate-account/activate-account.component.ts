import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../../services/services/authentication.service";
import {CodeInputModule} from "angular-code-input";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ChangePasswordComponent} from "./change-password/change-password.component";

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [
    CodeInputModule,
    ChangePasswordComponent
  ],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent implements OnInit{
  private readonly activatedRoute= inject(ActivatedRoute);
  private readonly authService = inject(AuthenticationService);
  private readonly _snackBar = inject(MatSnackBar);

  message = '';
  codeOk = true;
  submitted = false;
  submittedCode = '';
  token: string | null = null;
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.token = params.get('token');
      if (this.token) {
        this.confirmAccount(this.token);
      }
    });
  }

  onCodeCompleted(submittedCode: string) {
    this.confirmAccount(submittedCode);
  }

  private confirmAccount(token: string) {
    this.authService.confirm({
      token
    }).subscribe({
      next: () => {
        this._snackBar.open('Ievadiet savu jauno paroli', 'Aizvērt', { duration: 5000 });
        this.submitted = true;
        this.codeOk = true;
        this.submittedCode = token;
      },
      error: (err) => {
        const errorResponse = JSON.parse(err.error);
        console.log(errorResponse);
        this.message = "Kods nav pareizs";
        this.submitted = true;
        this.codeOk = false;
      }
    });
  }
  onTryAgain() {
    this.submitted = false;
    this.codeOk = true;
  }
}
