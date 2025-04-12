import { Component, DestroyRef, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RegistrationRequest } from "../../../../services/models/registration-request";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";

@Component({
  selector: 'app-new-user',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './new-user.component.html',
  standalone: true,
  styleUrls: ['./new-user.component.scss', '.../new-object-style.scss']
})
export class NewUserComponent implements OnInit {
  @Output() emitUserAuthDetails = new EventEmitter<RegistrationRequest>();
  @Output() emitCancel = new EventEmitter();
  private readonly destroyRef = inject(DestroyRef);
  private readonly _snackBar = inject(MatSnackBar);
  authDetailsRequest: RegistrationRequest = { email: '', role: 'ROLE_TEACHINGSTAFF' };
  errorMessage = signal('');
  errorMsg: Array<string> = [];

  userForm = new FormGroup({
    email: new FormControl<string | null>(null, {
      validators: [Validators.email, Validators.required]
    }),
    role: new FormControl<string>('ROLE_TEACHINGSTAFF')
  });

  roleOptions = [
    { value: 'ROLE_TEACHINGSTAFF', label: 'Docētājs' },
    { value: 'ROLE_ADMIN', label: 'Administrators' },
    { value: 'ROLE_DIRECTOR', label: 'Direktors' }
  ];

  ngOnInit(): void {}

  setFormValues(email: string,  role?: string) {
    let roleValue = 'ROLE_TEACHINGSTAFF';
    if (role) {
      roleValue = role;
    }
    this.userForm.patchValue({
      email: email,
      role: roleValue
    });
  }

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
    const roleValue = this.userForm.controls.role.value;

    if (emailValue) {
      this.authDetailsRequest.email = emailValue;
      this.authDetailsRequest.role = roleValue || 'ROLE_TEACHINGSTAFF';

      this.emitUserAuthDetails.emit({ ...this.authDetailsRequest });
      this._snackBar.open("Saglabāts", "Aizvērt", { duration: 5000 });
    }
  }

  onCancel() {
    this.emitCancel.emit();
    this._snackBar.open("Atcelts", "Aizvērt", { duration: 5000 });
  }
}
