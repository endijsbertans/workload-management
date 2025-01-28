import {Component, DestroyRef, inject} from '@angular/core';
import {RegistrationRequest} from "../../services/models/registration-request";

import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {TokenService} from "../../services/token/token.service";
import {debounceTime, of} from "rxjs";

function emailIsUnique(control: AbstractControl) { /// fake backend check
  if (control.value !== 'test@example.com') {
    return of(null);
  }
  return of({notUnique: true});
}
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerRequest: RegistrationRequest = {email: '', firstName: '', lastName: '', password: ''};
  errorMsg: Array<string> = [];
  private destroyRef = inject(DestroyRef);
  form = new FormGroup({
    email: new FormControl( '',{
      validators: [Validators.email, Validators.required],
      asyncValidators: [emailIsUnique]
    }),
    firstName: new FormControl('', {
      validators: [
        Validators.minLength(2),
        Validators.required],
    }),
    lastName: new FormControl('', {
      validators: [
        Validators.minLength(2),
        Validators.required],
    }),
    password: new FormControl('', {
      validators: [
        Validators.minLength(6),
        Validators.required],
    }),
  });
  get emailIsInvalid() {
    return (this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid);
  }

  get passwordIsInvalid() {
    return (this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid);
  }
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ){}
  onSubmit()
  {
    this.registerRequest.email = this.form.value.email ?? '';
    this.registerRequest.password = this.form.value.password ?? '';
    this.registerRequest.firstName = this.form.value.firstName ?? '';
    this.registerRequest.lastName = this.form.value.lastName ?? '';
    this.errorMsg = [];
    this.authService.register({
      body: this.registerRequest
    }).subscribe({
      next: () =>{
        this.router.navigate(['workload'])
      },
      error:(err) => {

        this.errorMsg = err.error.validationErrors;
        console.log(this.errorMsg);
      }
    })
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
