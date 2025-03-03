import {Component, EventEmitter, inject, Output, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";


import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SemesterRequest} from "../../../../services/models/semester-request";
import {SemesterControllerService} from "../../../../services/services/semester-controller.service";

import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-new-semester',
  imports: [
    FormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    RouterLink,
    ReactiveFormsModule,
    MatOption,
    MatSelect
  ],
  templateUrl: './new-semester.component.html',
  standalone: true,
  styleUrls: ['./new-semester.component.scss', '../new-object-style.scss']
})
export class NewSemesterComponent {
  @Output() emitMyAcademicRank = new EventEmitter<number>();
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly semesterService = inject(SemesterControllerService);
  errorMessage = signal('');
  semesterRequest?: SemesterRequest;
  semesterForm = new FormGroup({
    semesterName: new FormControl<"pavasaris" | "rudens">("rudens", {
      validators: [
        Validators.minLength(2),
        Validators.required],
    }),
    year: new FormControl<number | undefined>(undefined, {
      validators: [
        Validators.min(2025),
        Validators.required],
    })
  })

  onSubmit() {
    console.log(this.semesterForm.controls);
    if (this.semesterForm.value.semesterName &&
        this.semesterForm.value.year
    ) {
      this.semesterRequest = {
        semesterName: this.semesterForm.value.semesterName,
        year: this.semesterForm.value.year
      };
      this.semesterService.saveSemester({
        body: this.semesterRequest
      }).subscribe({
        next: (id) => {
          this.emitMyAcademicRank.emit( id );
          this._snackBar.open("Saglabāts", "Aizvērt", { duration: 5000 });
        },
        error: (err) => {
          this._snackBar.open(err.error.errorMsg, "Aizvērt", { duration: 5000 });
        }
      })
    }
    this.router.navigate(['..'], {
      relativeTo: this.activeRoute,
      replaceUrl: true});
  }

  updateErrorMessage(controlName: keyof typeof this.semesterForm.controls) {
    const control = this.semesterForm.controls[controlName];
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
