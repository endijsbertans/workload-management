import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {TokenExpirationService} from "../../../../../services/guard/token-expiration.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../../../services/services/authentication.service";
import {TokenService} from "../../../../../services/token/token.service";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatSnackBar} from "@angular/material/snack-bar";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-forgot-password',
  imports: [
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatFabButton,
    MatIcon
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit{
  private readonly _snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthenticationService);
  private readonly destroyRef = inject(DestroyRef);
  errorMessage = signal('');
  errorMsg: Array<string> = [];
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
  });


  updateErrorMessage() {

    if (this.form.controls.email.hasError('required')) {
      this.errorMessage.set('Ēpasts ir obligāts');
    } else if (this.form.controls.email.hasError('email')) {
      this.errorMessage.set('Nepareizs ēpasts');
    } else {
      this.errorMessage.set('');
    }
  }

  onSubmit() {
    if (this.form.value.email) {
      this.errorMsg = [];
      this.authService.forgotPassword({
        email: this.form.value.email
      }).subscribe({
        error: (err) => {
          console.log(err);
          if (err.error.validationErrors) {
            this.errorMsg = err.error.validationErrors;
          } else {
            this.errorMsg.push(err.error.errorMsg);
          }
        }
      })
      this._snackBar.open("Uz " + this.form.value.email + "  nosūtīts kods", "Aizvērt", {duration: 5000});
      this.router.navigate(['auth/activate-account']);
    }
  }
  ngOnInit() {
    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: value => {
        window.localStorage.setItem(
          'saved-login-form',
          JSON.stringify({email: value.email}))
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
