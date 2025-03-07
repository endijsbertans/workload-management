import {Component, DestroyRef, EventEmitter, inject, OnInit, Output, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {AcademicRankService} from "../../../../services/services/academic-rank.service";

import {AcademicRankResponse} from "../../../../services/models/academic-rank-response";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {CourseService} from "../../../../services/services";
import {CourseRequest} from "../../../../services/models/course-request";
import {MatSnackBar} from "@angular/material/snack-bar";



@Component({
  selector: 'app-new-course',
  imports: [
    MatButton,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatOption,
    MatSelect,
  ],
  templateUrl: './new-course.component.html',
  standalone: true,
  styleUrls: ['./new-course.component.scss', '../new-object-style.scss']
})
export class NewCourseComponent implements OnInit{
  @Output() emitCourse = new EventEmitter<number>();
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  academicRankService = inject(AcademicRankService)
  courseService = inject(CourseService);
  private readonly _snackBar = inject(MatSnackBar);

  academicRanks = signal<AcademicRankResponse[] | undefined>(undefined);
  errorMessage = signal('');
  //TODO THIS WONT WORK
  errorMsg: Array<string> = [];

  courseRequest?: CourseRequest;

  courseForm = new FormGroup({
    name: new FormControl('', {
      validators: [
        Validators.minLength(3),
        Validators.required],
    }),
    courseCode: new FormControl('', {
      validators: [
        Validators.minLength(3),
        Validators.required],
    }),
    creditPoints: new FormControl(undefined, {
      validators: [
        Validators.required],
    }),
    registrationType: new FormControl('', {
      validators: [
        Validators.minLength(3),
        Validators.required],
    }),
    section: new FormControl('', {
      validators: [
        Validators.minLength(3),
        Validators.required],
    }),
    studyLevel: new FormControl<number | undefined>(undefined, {
      validators: [
        Validators.required],
    }),
    academicRankId: new FormControl<number | undefined>(undefined, {
      validators: [
        Validators.required],
    }),
  });
  ngOnInit(): void {
    this.fetchAcademicRanks()
  }
  onSubmit() {
    console.log(this.courseForm.controls);
    if (this.courseForm.value.name &&
      this.courseForm.value.courseCode &&
      this.courseForm.value.creditPoints &&
      this.courseForm.value.registrationType &&
      this.courseForm.value.section &&
      this.courseForm.value.studyLevel &&
      this.courseForm.value.academicRankId
    ) {
      this.courseRequest = {
        courseName: this.courseForm.value.name,
        courseCode: this.courseForm.value.courseCode,
        creditPoints: this.courseForm.value.creditPoints,
        registrationType: this.courseForm.value.registrationType,
        section: this.courseForm.value.section,
        studyLevel: this.courseForm.value.studyLevel,
        necessaryAcademicRankId: this.courseForm.value.academicRankId
      };

      this.courseService.saveCourse({
        body: this.courseRequest
      }).subscribe({
        next: (id) => {
          this.emitCourse.emit( id );
          this._snackBar.open("Saglabāts", "Aizvērt", { duration: 5000 });
        },
        error: (err) => {
          console.log(err.error.validationErrors);
          this._snackBar.open(err.error.errorMsg, "Aizvērt", { duration: 5000 });
        }
      })
     }
    this.router.navigate(['..'], {
      relativeTo: this.activeRoute,
      replaceUrl: true});
  }
  private fetchAcademicRanks(){
      const subscription = this.academicRankService.findAllAcademicRank().subscribe({
        next: (ranks) => {
          if (ranks) {
            this.academicRanks.set(ranks);
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

  updateErrorMessage(controlName: keyof typeof this.courseForm.controls) {
    const control = this.courseForm.controls[controlName];
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
