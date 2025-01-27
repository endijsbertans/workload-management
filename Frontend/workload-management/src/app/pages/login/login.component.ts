import {Component, DestroyRef, inject} from '@angular/core';
import {AuthenticationRequest} from "../../services/models/authentication-request";
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {debounceTime, of} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {TokenService} from "../../services/token/token.service";

let initialEmailValue = '';
const savedForm = window.localStorage.getItem('saved-login-form');
if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm.email;
}
function emailIsUnique(control: AbstractControl) { /// fake backend check
  if (control.value !== 'test@example.com') {
    return of(null);
  }
  return of({notUnique: true});
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'

})
export class LoginComponent {
  private destroyRef = inject(DestroyRef);
  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];
  form = new FormGroup({
    email: new FormControl(initialEmailValue, {
      validators: [Validators.email, Validators.required],
      asyncValidators: [emailIsUnique]
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
    this.authRequest.email = this.form.value.email ?? '';
    this.authRequest.password = this.form.value.password ?? '';
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) =>{
        this.tokenService.token = res.token as string;
        console.log(res.token);
        this.router.navigate(['workload'])
      },
      error:(err) => {
        console.log(err);
        if(err.error.validationErrors){
          this.errorMsg = err.error.validationErrors;
        }else{
          this.errorMsg.push(err.error.errorMsg);
        }
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

