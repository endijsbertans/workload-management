import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {RegistrationRequest} from "../../../../services/models/registration-request";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {FacultyResponse} from "../../../../services/models/faculty-response";
import {FacultyService} from "../../../../services/services/faculty.service";
import {MatFabButton} from "@angular/material/button";



@Component({
  selector: 'app-new-user',
  imports: [
    RouterLink,
    MatInput,
    FormsModule,
    MatError,
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MatFabButton
  ],
  templateUrl: './new-user.component.html',
  standalone: true,
  styleUrl: './new-user.component.scss'
})
export class NewUserComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  errorMessage = signal('');
  errorMsg: Array<string> = [];
  userForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),

  });

  ngOnInit(): void {
    //asdasdasd
  }

  updateErrorMessage() {

    if (this.userForm.controls.email.hasError('required')) {
      this.errorMessage.set('Ēpasts ir obligāts');
    } else if (this.userForm.controls.email.hasError('email')) {
      this.errorMessage.set('Nepareizs ēpasts');
    } else {
      this.errorMessage.set('');
    }
  }

  onSubmit() {

  }
}
