import { Component, DestroyRef, inject, signal, Input} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../../../../services/services/authentication.service";
import { TokenService } from "../../../../../services/token/token.service";
import { TokenExpirationService } from "../../../../../services/guard/token-expiration.service";
import { MatIcon } from "@angular/material/icon";
import { MatError, MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatFabButton, MatIconButton } from "@angular/material/button";
import { MatSnackBar } from "@angular/material/snack-bar";

const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  }

  return null;
};

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    MatIcon,
    MatError,
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatIconButton,
    MatFabButton,
    MatSuffix
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  @Input() token: string = '';

  private readonly router = inject(Router);
  private readonly authService = inject(AuthenticationService);
  private readonly _snackBar = inject(MatSnackBar);
  errorMessage = signal('');
  errorMsg: Array<string> = [];
  hide = signal(true);

  form = new FormGroup({
    password: new FormControl('', {
      validators: [
        Validators.minLength(6),
        Validators.required],
    }),
    confirmPassword: new FormControl('', {
      validators: [
        Validators.minLength(6),
        Validators.required],
    }),
  }, { validators: passwordMatchValidator });

  updateErrorMessagePass() {
    if (this.form.controls.password.hasError('required')) {
      return 'Parole ir obligāta';
    } else if (this.form.controls.password.hasError('minlength')) {
      return 'Parole pārāk īsa';
    } else {
      return '';
    }
  }

  updateErrorMessageConfirmPass() {
    if (this.form.controls.confirmPassword.hasError('required')) {
      return 'Parole ir obligāta';
    } else if (this.form.controls.confirmPassword.hasError('passwordMismatch')) {
      return 'Parolēm jāsakrīt';
    } else {
      return '';
    }
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.preventDefault();
    event.stopPropagation();
  }

  onSubmit() {
    if (this.form.value.confirmPassword != null && this.token) {
      const password = this.form.value.confirmPassword;
      this.errorMsg = [];
      this.authService.changePassword({
        token: this.token, password: password
      }).subscribe({
        next: () => {
          this.router.navigate(['auth/login'], {
            replaceUrl: true
          });
        },
        complete: () => {
          this._snackBar.open('Parole tika nomainīta, varat pieslēgties!', 'Aizvērt', { duration: 5000 });
        },
        error: (err: any) => {
          console.log(err);
          if (err.error.validationErrors) {
            this.errorMsg = err.error.validationErrors;
          } else {
            this.errorMsg.push(err.error.errorMsg);
          }
        }
      });
    } else if (!this.token) {
      this._snackBar.open('Kods nav atrasts mēģiniet vēlreiz', 'Aizvērt', { duration: 5000 });
    }
  }
}
