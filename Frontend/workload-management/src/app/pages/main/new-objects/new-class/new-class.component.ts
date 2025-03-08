import {Component, DestroyRef, EventEmitter, inject, OnInit, Output, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FacultyResponse} from "../../../../services/models/faculty-response";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {FacultyService} from "../../../../services/services/faculty.service";
import {MyClassRequest} from "../../../../services/models/my-class-request";
import {MyClassService} from "../../../../services/services/my-class.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Degree, EnumTranslationService} from "../../../../services/translation/EnumTranslationService";
@Component({
  selector: 'app-new-class',
  imports: [
    MatInput,
    ReactiveFormsModule,
    MatButton,
    RouterLink,
    MatFormFieldModule,
    MatOption,
    MatSelect,
  ],
  templateUrl: './new-class.component.html',
  standalone: true,
  styleUrls: ['./new-class.component.scss', '../new-object-style.scss']
})
export class NewClassComponent implements OnInit{
  @Output() emitMyClass = new EventEmitter<number>();
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly facultyService = inject(FacultyService)
  private readonly myClassService = inject(MyClassService)
  degrees: Degree[] | undefined;
  errorMessage = signal('');
  faculties = signal<FacultyResponse[] | undefined>(undefined);
  enumService = inject(EnumTranslationService);
  myClassRequest?:MyClassRequest;
  classForm = new FormGroup({
    classLevel: new FormControl<number | undefined>(undefined, {
      validators: [
        Validators.min(1),
        Validators.max(4),
        Validators.required],
    }),
    program: new FormControl('', {
      validators: [
        Validators.minLength(1),
        Validators.required],
    }),
    classFacultyId: new FormControl<number | undefined>(undefined, {
      validators: [
        Validators.required],
    }),
    degree: new FormControl<Degree | undefined>(undefined, {
      validators: [
        Validators.required],
    })
  })
  ngOnInit(): void {
    this.fetchFaculties();
    this.degrees = Object.values(this.enumService.enumTypes.degree);
  }
  onSubmit() {
    console.log(this.classForm.controls);
    if (this.classForm.value.classLevel &&
      this.classForm.value.classFacultyId &&
      this.classForm.value.program &&
      this.classForm.value.degree
    ) {
      this.myClassRequest = {
        classLevel: this.classForm.value.classLevel,
        classFacultyId: this.classForm.value.classFacultyId,
        myClassProgram: this.classForm.value.program,
        degree: this.classForm.value.degree
      };

      this.myClassService.saveMyClass({
        body: this.myClassRequest
      }).subscribe({
        next: (id) => {
          this.emitMyClass.emit( id );
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
  private fetchFaculties(){
      const subscription = this.facultyService.findAllFaculties().subscribe({
        next: (faculties) => {
          if (faculties) {
            this.faculties.set(faculties);
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  updateErrorMessage(controlName: keyof typeof this.classForm.controls) {
    const control = this.classForm.controls[controlName];
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
