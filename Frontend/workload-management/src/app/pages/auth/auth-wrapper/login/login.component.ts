import {Component, DestroyRef, inject, signal} from '@angular/core';
import {AuthenticationRequest} from "../../../../services/models/authentication-request";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {debounceTime, of} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../../services/services/authentication.service";
import {TokenService} from "../../../../services/token/token.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton, MatIconButton} from "@angular/material/button";

let initialEmailValue = '';
const savedForm = window.localStorage.getItem('saved-login-form');
if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm.email;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIcon,
    MatFabButton,
    MatIconButton
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'

})
export class LoginComponent {
  private readonly router =  inject(Router);
  private readonly authService =  inject(AuthenticationService);
  private readonly tokenService = inject(TokenService);
  private readonly destroyRef = inject(DestroyRef);
  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMessage = signal('');
  errorMsg: Array<string> = [];
  hide = signal(true);


  form = new FormGroup({
    email: new FormControl(initialEmailValue, {
      validators: [Validators.email, Validators.required]
    }),
    password: new FormControl('', {
      validators: [
        Validators.minLength(6),
        Validators.required],
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
  updateErrorMessagePass() {
    if (this.form.controls.password.hasError('required')) {
      return 'Parole ir obligāta';
    } else if (this.form.controls.password.hasError('minlength')) {
      return'Parole pārāk īsa';
    } else {
      return'';
    }
  }
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.preventDefault()
    event.stopPropagation();
  }

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
        this.router.navigate(['main'])
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

