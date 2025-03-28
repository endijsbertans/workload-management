import { Component, DestroyRef, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RegistrationRequest } from "../../../../services/models/registration-request";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-new-user',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './new-user.component.html',
  standalone: true,
  styleUrl: './new-user.component.scss'
})
export class NewUserComponent implements OnInit {
  @Output() emitUserAuthDetails = new EventEmitter<RegistrationRequest>();
  @Output() emitCancel = new EventEmitter();
  private readonly destroyRef = inject(DestroyRef);
  private readonly _snackBar = inject(MatSnackBar);
  authDetailsRequest: RegistrationRequest = { email: '' };
  errorMessage = signal('');
  errorMsg: Array<string> = [];

  userForm = new FormGroup({
    email: new FormControl<string | null>(null, {
      validators: [Validators.email, Validators.required]
    }),
  });

  ngOnInit(): void {}

  updateErrorMessage() {
    const emailControl = this.userForm.controls.email;
    if (emailControl.hasError('required')) {
      this.errorMessage.set('Ēpasts ir obligāts');
    } else if (emailControl.hasError('email')) {
      this.errorMessage.set('Nepareizs ēpasts');
    } else {
      this.errorMessage.set('');
    }
  }

  onSubmit() {
    const emailValue = this.userForm.controls.email.value;
    if (emailValue) {
      this.authDetailsRequest.email = emailValue;
      this.emitUserAuthDetails.emit({ ...this.authDetailsRequest });
      this._snackBar.open("Saglabāts", "Aizvērt", { duration: 5000 });
    }
  }

  onCancel() {
    this.emitCancel.emit();
    this._snackBar.open("Atcelts", "Aizvērt", { duration: 5000 });
  }
}
