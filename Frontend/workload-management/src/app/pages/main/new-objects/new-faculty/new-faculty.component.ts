import {Component, DestroyRef, EventEmitter, inject, Output, signal} from '@angular/core';
import {FacultyService} from "../../../../services/services/faculty.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FacultyRequest} from "../../../../services/models/faculty-request";

@Component({
  selector: 'app-new-faculty',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatButton,
  ],
  templateUrl: './new-faculty.component.html',
  standalone: true,
  styleUrl: './new-faculty.component.scss'
})
export class NewFacultyComponent {
  @Output() emitFaculty = new EventEmitter<FacultyRequest>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly facultyService = inject(FacultyService)
  facultyRequest: FacultyRequest = {facultyName: '', facultyFullName: ''};
  errorOnName = signal('');
  errorOnFullName = signal('');
  errorMsg: Array<string> = [];

  facultyForm = new FormGroup({
    name: new FormControl(null, {
      validators: [
        Validators.minLength(3),
        Validators.required],
    }),
    fullName: new FormControl(null, {
      validators: [
        Validators.minLength(3),
        Validators.required],
    }),
  });

  updateErrorOnName() {
    if (this.facultyForm.controls.name.hasError('required')) {
      this.errorOnName.set('Obligāts');
    } else if (this.facultyForm.controls.name.hasError('minlength')) {
      this.errorOnName.set('Par īsu');
    } else {
      this.errorOnName.set('');
    }
  }

  updateErrorOnFullName() {
    if (this.facultyForm.controls.fullName.hasError('required')) {
      this.errorOnFullName.set('Obligāts');
    } else if (this.facultyForm.controls.fullName.hasError('minlength')) {
      this.errorOnFullName.set('Par īsu');
    } else {
      this.errorOnFullName.set('');
    }
  }

  onSubmit() {
    if (this.facultyForm.value.name && this.facultyForm.value.fullName) {
      this.facultyRequest.facultyName = this.facultyForm.value.name;
      this.facultyRequest.facultyFullName = this.facultyForm.value.fullName;
      this.facultyService.saveFaculty({
        body: this.facultyRequest
      }).subscribe({
        next: () => {
          this.emitFaculty.emit({ ...this.facultyRequest });
        },
        error: (err) => {
          console.log(this.errorMsg);
          this.errorMsg = err.error.validationErrors;

        }
      })
    }
  }
}
