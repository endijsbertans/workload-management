import {Component, DestroyRef, EventEmitter, inject, OnInit, Output, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {ActivatedRoute, Router} from "@angular/router";
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
  editMode = signal(false);
  objectId = signal<number | undefined>(undefined);
  pageTitle = signal('Pievienot jaunu kursu');
  errorMsg: Array<string> = [];


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
    creditPoints: new FormControl(1, {
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
    this.fetchAcademicRanks();

    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.objectId.set(+params['id']);
        this.editMode.set(true);
        this.pageTitle.set('Rediģēt kursu');
        this.loadCourseData(this.objectId());
      }
    });
  }

  private loadCourseData(id: number | undefined): void {
    if (!id) return;
    this.courseService.findCourseById({courseId: id }).subscribe({
      next: (course) => {
        this.courseForm.patchValue({
          name: course.courseName,
          courseCode: course.courseCode,
          creditPoints: course.creditPoints,
          registrationType: course.registrationType,
          section: course.section,
          studyLevel: course.studyLevel,
          academicRankId: course.necessaryAcademicRank?.academicRankId
        });
      },
      error: (err) => {
        this._snackBar.open("Neizdevās ielādēt datus", "Aizvērt", { duration: 5000 });
        console.error(err);
      }
    });
  }

  onSubmit() {
    if (this.courseForm.valid) {
      const formData = this.prepareFormData();

      if (this.editMode()) {
        this.updateCourse(formData);
      } else {
        this.createCourse(formData);
      }
    }
  }

  private prepareFormData(): CourseRequest {
    return {
      courseName: this.courseForm.value.name!,
      courseCode: this.courseForm.value.courseCode!,
      creditPoints: this.courseForm.value.creditPoints!,
      registrationType: this.courseForm.value.registrationType!,
      section: this.courseForm.value.section!,
      studyLevel: this.courseForm.value.studyLevel!,
      necessaryAcademicRankId: this.courseForm.value.academicRankId!
    };
  }

  createCourse(data: CourseRequest) {
    this.courseService.saveCourse({
      body: data
    }).subscribe({
      next: (id) => {
        this.emitCourse.emit(id);
        this._snackBar.open("Saglabāts", "Aizvērt", { duration: 5000 });
        this.navigateBackFromCreateMode();
      },
      error: (err) => {
        this._snackBar.open(err.error.errorMsg, "Aizvērt", { duration: 5000 });
      }
    });
  }

  private updateCourse(data: CourseRequest): void {
    const id = this.objectId();
    if (id === undefined) return;

    this.courseService.updateCourseById({ "courseId": id, body: data }).subscribe({
      next: () => {
        this._snackBar.open("Izmaiņas saglabātas", "Aizvērt", { duration: 5000 });
        this.navigateBackFromEditMode();
      },
      error: (err) => {
        console.error(err);
        this._snackBar.open(err.error.errorMsg || "Kļūda atjaunojot kursu", "Aizvērt", { duration: 5000 });
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
