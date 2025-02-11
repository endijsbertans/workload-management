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
  errorMessage = signal('');
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
  updateErrorMessage(controlName: keyof typeof this.facultyForm.controls) {
    const control = this.facultyForm.controls[controlName];
    if (control.errors) {
      if (control.hasError('required')) {
        this.errorMessage.set('Lauks nevar būt tukšs');
      } else if (control.hasError('minlength')) {
        this.errorMessage.set('Ievadītā vērtība ir pārāk īsa');
      } else if (control.hasError('maxlength')) {
        this.errorMessage.set('Ievadītā vērtība ir pārāk gara');
      } else if (control.hasError('min')) {
        this.errorMessage.set('Ievadītā vērtība ir pārāk maza');
      } else if (control.hasError('max')) {
        this.errorMessage.set('Ievadītā vērtība ir pārāk liela');
      } else {
        this.errorMessage.set('Nederīga vērtība');
      }
    } else {
      this.errorMessage.set('');
    }
  }
}
