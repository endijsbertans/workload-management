import {Component, EventEmitter, inject, OnInit, Output, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatSelect} from "@angular/material/select";
import {MatOption} from "@angular/material/core";
import {FacultyResponse} from "../../../../services/models/faculty-response";
import {EnumTranslationService} from "../../../../services/translation/EnumTranslationService";
import {MatButton} from "@angular/material/button";
import {MyClassRequest} from "../../../../services/models/my-class-request";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FacultyService} from "../../../../services/services/faculty.service";
import {MyClassService} from "../../../../services/services/my-class.service";

@Component({
  selector: 'app-new-class',
  standalone: true,
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
  templateUrl: './new-class.component.html',
  styleUrls: ['./new-class.component.scss', '../new-object-style.scss']
})
export class NewClassComponent implements OnInit {
  @Output() emitMyClass = new EventEmitter<number>();
  private readonly facultyService = inject(FacultyService);
  private readonly classService = inject(MyClassService);
  protected readonly enumService = inject(EnumTranslationService);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  faculties = signal<FacultyResponse[] | undefined>(undefined);
  degrees: string[] | undefined;
  errorMessage = signal('');
  editMode = signal(false);
  objectId = signal<number | undefined>(undefined);
  pageTitle = signal('Pievienot jaunu grupu');

  classForm = new FormGroup({
    classLevel: new FormControl<number | undefined>(undefined, {
      validators: [
        Validators.min(1),
        Validators.required],
    }),
    program: new FormControl<string>('', {
      validators: [
        Validators.minLength(2),
        Validators.required],
    }),
    classFacultyId: new FormControl<number | undefined>(undefined, {
      validators: [Validators.required],
    }),
    degree: new FormControl<"BACHELOR" | "MASTER" | "DOCTORATE" | undefined>(undefined, {
      validators: [Validators.required],
    })
  });

  ngOnInit() {
    this.loadFaculties();
    this.degrees = Object.values(this.enumService.enumTypes.degree);

    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.objectId.set(+params['id']);
        this.editMode.set(true);
        this.pageTitle.set('Rediģēt grupu');
        this.loadClassData(this.objectId());
      }
    });
  }

  private loadFaculties(): void {
    this.facultyService.findAllFaculties().subscribe({
      next: (data) => {
        this.faculties.set(data);
      },
      error: (err) => {
        console.error('Failed to load faculties', err);
        this._snackBar.open('Kļūda ielādējot fakultātes', 'Aizvērt', { duration: 5000 });
      }
    });
  }

  private loadClassData(id: number | undefined): void {
    if (!id) return;

    this.classService.findMyClassById({ "myclass-id": id }).subscribe({
      next: (classData) => {
        this.classForm.patchValue({
          classLevel: classData.classLevel,
          program: classData.myClassProgram,
          classFacultyId: classData.classFaculty?.facultyId,
          degree: classData.degree as "BACHELOR" | "MASTER" | "DOCTORATE"
        });
      },
      error: (err) => {
        this._snackBar.open("Neizdevās ielādēt datus", "Aizvērt", { duration: 5000 });
        console.error(err);
      }
    });
  }

  onSubmit() {
    if (this.classForm.valid) {
      const formData = this.prepareFormData();

      if (this.editMode()) {
        this.updateClass(formData);
      } else {
        this.createClass(formData);
      }
    }
  }

  private prepareFormData(): MyClassRequest {
    return {
      classLevel: this.classForm.value.classLevel!,
      classFacultyId: this.classForm.value.classFacultyId!,
      myClassProgram: this.classForm.value.program!,
      degree: this.classForm.value.degree!
    };
  }

  createClass(data: MyClassRequest) {
    this.classService.saveMyClass({ body: data }).subscribe({
      next: (id) => {
        this.emitMyClass.emit(id);
        this._snackBar.open("Grupa izveidota", "Aizvērt", { duration: 5000 });
        this.navigateBackFromCreateMode();
      },
      error: (err) => {
        this._snackBar.open(err.error.errorMsg || "Kļūda izveidojot grupu", "Aizvērt", { duration: 5000 });
      }
    });
  }

  private updateClass(data: MyClassRequest): void {
    const id = this.objectId();
    if (id === undefined) return;

    this.classService.updateMyClass({ "myclass-id": id, body: data }).subscribe({
      next: () => {
        this._snackBar.open("Izmaiņas saglabātas", "Aizvērt", { duration: 5000 });
        this.navigateBackFromEditMode();
      },
      error: (err) => {
        console.error(err);
        this._snackBar.open(err.error.errorMsg || "Kļūda atjaunojot grupu", "Aizvērt", { duration: 5000 });
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

  updateErrorMessage(controlName: keyof typeof this.classForm.controls) {
    const control = this.classForm.controls[controlName];
    if (control.errors) {
      if (control.hasError('required')) {
        this.errorMessage.set('Lauks nevar būt tukšs');
      } else if (control.hasError('minlength')) {
        this.errorMessage.set('Ievadītā vērtība ir pārāk īsa');
      } else if (control.hasError('min')) {
        this.errorMessage.set('Ievadītā vērtība ir pārāk maza');
      } else {
        this.errorMessage.set('Nederīga vērtība');
      }
    } else {
      this.errorMessage.set('');
    }
  }
}
