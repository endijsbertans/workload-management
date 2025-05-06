import { Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router} from "@angular/router";
import { FacultyRequest } from "../../../../services/models/faculty-request";
import { FacultyService } from "../../../../services/services/faculty.service";

@Component({
  selector: 'app-new-faculty',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './new-faculty.component.html',
  styleUrls: ['./new-faculty.component.scss', '../new-object-style.scss']
})
export class NewFacultyComponent implements OnInit {
  @Output() emitFaculty = new EventEmitter<number>();
  private readonly facultyService = inject(FacultyService);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  errorMessage = signal('');
  editMode = signal(false);
  objectId = signal<number | undefined>(undefined);
  pageTitle = signal('Pievienot jaunu fakultāti');

  facultyForm = new FormGroup({
    facultyName: new FormControl<string>('', {
      validators: [
        Validators.minLength(2),
        Validators.required],
    }),
    facultyFullName: new FormControl<string>('', {
      validators: [
        Validators.minLength(2),
        Validators.required],
    })
  });

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.objectId.set(+params['id']);
        this.editMode.set(true);
        this.pageTitle.set('Rediģēt fakultāti');
        this.loadFacultyData(this.objectId());
      }
    });
  }

  private loadFacultyData(id: number | undefined): void {
    if (!id) return;

    this.facultyService.findFacultyById({ facultyId: id }).subscribe({
      next: (facultyData) => {
        this.facultyForm.patchValue({
          facultyName: facultyData.facultyName,
          facultyFullName: facultyData.facultyFullName
        });
      },
      error: (err) => {
        this._snackBar.open("Neizdevās ielādēt datus", "Aizvērt", { duration: 5000 });
        console.error(err);
      }
    });
  }

  onSubmit() {
    if (this.facultyForm.valid) {
      const formData = this.prepareFormData();

      if (this.editMode()) {
        this.updateFaculty(formData);
      } else {
        this.createFaculty(formData);
      }
    }
  }

  private prepareFormData(): FacultyRequest {
    return {
      facultyName: this.facultyForm.value.facultyName!,
      facultyFullName: this.facultyForm.value.facultyFullName!
    };
  }

  createFaculty(data: FacultyRequest) {
    this.facultyService.saveFaculty({ body: data }).subscribe({
      next: (id) => {
        this.emitFaculty.emit(id);
        this._snackBar.open("Fakultāte izveidota", "Aizvērt", { duration: 5000 });
        this.navigateBackFromCreateMode();
      },
      error: (err) => {
        this._snackBar.open(err.error.errorMsg || "Kļūda izveidojot fakultāti", "Aizvērt", { duration: 5000 });
      }
    });
  }

  private updateFaculty(data: FacultyRequest): void {
    const id = this.objectId();
    if (id === undefined) return;

    this.facultyService.updateFaculty({facultyId: id, body: data }).subscribe({
      next: () => {
        this._snackBar.open("Izmaiņas saglabātas", "Aizvērt", { duration: 5000 });
        this.navigateBackFromEditMode();
      },
      error: (err) => {
        console.error(err);
        this._snackBar.open(err.error.errorMsg || "Kļūda atjaunojot fakultāti", "Aizvērt", { duration: 5000 });
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

  updateErrorMessage(controlName: keyof typeof this.facultyForm.controls) {
    const control = this.facultyForm.controls[controlName];
    if (control.errors) {
      if (control.hasError('required')) {
        this.errorMessage.set('Lauks nevar būt tukšs');
      } else if (control.hasError('minlength')) {
        this.errorMessage.set('Ievadītā vērtība ir pārāk īsa');
      } else {
        this.errorMessage.set('Nederīga vērtība');
      }
    } else {
      this.errorMessage.set('');
    }
  }
}
