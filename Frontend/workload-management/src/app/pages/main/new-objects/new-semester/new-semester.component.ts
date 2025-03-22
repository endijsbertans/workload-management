import {Component, EventEmitter, inject, OnInit, Output, signal} from '@angular/core';
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
    ReactiveFormsModule,
    MatOption,
    MatSelect
  ],
  templateUrl: './new-semester.component.html',
  standalone: true,
  styleUrls: ['./new-semester.component.scss', '../new-object-style.scss']
})
export class NewSemesterComponent implements OnInit{
  @Output() emitMyAcademicRank = new EventEmitter<number>();
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly semesterService = inject(SemesterControllerService);
  errorMessage = signal('');
  editMode = signal(false);
  objectId = signal<number | undefined>(undefined);
  pageTitle = signal('Pievienot jaunu semestri');
  semesterRequest?: SemesterRequest;
  semesterForm = new FormGroup({
    semesterName: new FormControl<"pavasaris" | "rudens">("rudens", {
      validators: [
        Validators.minLength(2),
        Validators.required],
    }),
    year: new FormControl<number | undefined>(undefined, {
      validators: [
        Validators.min(2024),
        Validators.required],
    })
  })
  ngOnInit(){
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.objectId.set(+params['id']);
        this.editMode.set(true);
        this.pageTitle.set('Rediģēt semestri');
        this.loadSemesterData(this.objectId());

      }
    });
  }
  private loadSemesterData(id: number | undefined): void {
    if (!id) return;
    this.semesterService.findSemesterById({ "semesterId": id }).subscribe({
      next: (semester) => {
        this.semesterForm.patchValue({
          semesterName: semester.semesterName,
          year: semester.year
        });
      },
      error: (err) => {
        this._snackBar.open("Neizdevās ielādēt datus", "Aizvērt", { duration: 5000 });
        console.error(err);
      }
    });
  }
  onSubmit() {
    if (this.semesterForm.valid) {
      const formData = this.prepareFormData();

      if (this.editMode()) {
        this.updateSemester(formData);
      } else {
        this.createSemester(formData);
      }
    }
  }
  private prepareFormData(): SemesterRequest {
    return {
      semesterName: this.semesterForm.value.semesterName!,
      year: this.semesterForm.value.year!
    };
  }
  createSemester(data: SemesterRequest) {
    if (this.semesterForm.valid
    ) {
      this.semesterService.saveSemester({
        body: data
      }).subscribe({
        next: (id) => {
          this.emitMyAcademicRank.emit( id );
          this._snackBar.open("Saglabāts", "Aizvērt", { duration: 5000 });
          this.navigateBackFromCreateMode();
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
  private updateSemester(data: SemesterRequest): void {
    const id = this.objectId();
    if (id === undefined) return;
    this.semesterService.updateSemesterById({"semesterId":id, body: data}).subscribe({
      next: () => {
        this._snackBar.open("Izmaiņas saglabātas", "Aizvērt", { duration: 5000 });
        this.navigateBackFromEditMode();
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open(err.error.errorMsg, "Aizvērt", { duration: 5000 });
      }
    });
  }
  public navigateBackFromEditMode(): void {
    this.router.navigate(['../../'], {
      relativeTo: this.activeRoute,
      replaceUrl: true
    });
  }
  public navigateBackFromCreateMode(): void {
    this.router.navigate(['..'], {
      relativeTo: this.activeRoute,
      replaceUrl: true
    });
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
