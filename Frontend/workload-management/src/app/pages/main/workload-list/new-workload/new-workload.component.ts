import {AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatStep, MatStepper, MatStepperNext} from "@angular/material/stepper";
import {TeachingStaffService} from "../../../../services/services/teaching-staff.service";
import {TeachingStaffResponse} from "../../../../services/models/teaching-staff-response";
import {ReplaySubject, Subject, take, takeUntil} from "rxjs";
import {MatFormField, MatOption, MatSelect} from "@angular/material/select";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {AsyncPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {RouterLink, RouterOutlet} from "@angular/router";
import {NewTeachingStaffComponent} from "../../new-objects/new-teaching-staff/new-teaching-staff.component";
import {TeachingStaffRequest} from "../../../../services/models/teaching-staff-request";
import {CourseService} from "../../../../services/services";
import {CourseResponse} from "../../../../services/models/course-response";

@Component({
  selector: 'app-new-workload',
  imports: [
    MatStepper,
    MatStep,
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    NgxMatSelectSearchModule,
    AsyncPipe,
    MatStepperNext,
    MatButton,
    RouterLink,
    RouterOutlet

  ],
  templateUrl: './new-workload.component.html',
  standalone: true,
  styleUrl: './new-workload.component.scss'
})
export class NewWorkloadComponent implements OnInit, AfterViewInit, OnDestroy{
  private readonly teachingStaffService = inject(TeachingStaffService);
  private readonly courseService = inject(CourseService);
  errorMsg = '';
  tStaff: TeachingStaffResponse[] = [];
  courses: CourseResponse[] = [];

  public filteredTeachingStaff: ReplaySubject<TeachingStaffResponse[]> = new ReplaySubject<TeachingStaffResponse[]>(1);
  public filteredCourses: ReplaySubject<CourseResponse[]> = new ReplaySubject<CourseResponse[]>(1);
  @ViewChild('singleSelect', {static: true}) singleSelect!: MatSelect;
  protected _onDestroy = new Subject<void>();
  onSubmit() {}
  tStaffForm = new FormGroup({
    tStaffCtrl: new FormControl<TeachingStaffResponse | null >(null),
    tStaffFilterCtrl: new FormControl<string>('')
  });

  courseForm = new FormGroup({
    courseCtrl: new FormControl<CourseResponse | null >(null),
    courseFilterCtrl: new FormControl<string>('')

  });
  isLinear = false;
  ngOnInit() {
    this.findAllTeachingStaff();
    this.tStaffForm.controls.tStaffFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterTeachingStaff();
      });

    this.findAllCourses();
    this.courseForm.controls.courseFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCourse();
      });
  }

  private findAllTeachingStaff(callback?: () => void) {
    this.teachingStaffService.findAllTeachingStaff().subscribe({
      next: (tStaff) => {
        if (tStaff) {
          this.tStaff = tStaff;
          console.log(this.tStaff);
          this.filteredTeachingStaff.next(this.tStaff.slice());
        }
        if (callback) callback();
      }
    });
  }
  ngAfterViewInit() {
    this.setInitialValue();
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  protected setInitialValue() {
    this.filteredTeachingStaff
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (a: TeachingStaffResponse, b: TeachingStaffResponse) => a && b && a.teachingStaffId === b.teachingStaffId;
      });

    this.filteredCourses
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (a: CourseResponse, b: CourseResponse) => a && b && a.courseId === b.courseId;
      });
  }
  protected filterTeachingStaff() {
    if (!this.tStaff) {
      return;
    }

    let search = this.tStaffForm.controls.tStaffFilterCtrl.value;
    if (!search) {
      this.filteredTeachingStaff.next(this.tStaff.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the staff
    this.filteredTeachingStaff.next(
      this.tStaff.filter((tStaff) => {
        return tStaff.name && tStaff.name && tStaff.name.toLowerCase().indexOf(search) > -1;
      })
    );
  }

  subscribeToChildEmitter(componentRef: any) {
    if(componentRef instanceof NewTeachingStaffComponent){
      console.log(componentRef);
      componentRef.emitTeachingStaff.subscribe((res: TeachingStaffRequest) => {

        console.log(res);

        this.findAllTeachingStaff(() => {
          const teachingStaff = this.tStaff.find(t => t.name == res.name && t.surname == res.surname);
          if(teachingStaff) {
            this.tStaffForm.controls.tStaffCtrl.setValue(teachingStaff, {emitModelToViewChange: false});
          }
        });
        console.log(this.tStaffForm.controls.tStaffFilterCtrl.value);
      })

  }}

  private findAllCourses(callback?: () => void) {
    this.courseService.findAllCourses().subscribe({
      next: (courses) => {
        if (courses) {
          this.courses = courses;
          console.log(this.courses);
          this.filteredCourses.next(this.courses.slice());
        }
        if (callback) callback();
      }
    });
  }
  protected filterCourse() {
    if (!this.courses) {
      return;
    }
    let search = this.courseForm.controls.courseFilterCtrl.value;
    if (!search) {
      this.filteredCourses.next(this.courses.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the staff
    this.filteredCourses.next(
      this.courses.filter((course) => {
        return course.courseName && course.courseName && course.courseName.toLowerCase().indexOf(search) > -1;
      })
    );
  }
}
