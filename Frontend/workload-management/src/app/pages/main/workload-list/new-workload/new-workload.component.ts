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
import {CourseService, MyClassService} from "../../../../services/services";
import {CourseResponse} from "../../../../services/models/course-response";
import {NewCourseComponent} from "../../new-objects/new-course/new-course.component";
import {MyClassResponse} from "../../../../services/models/my-class-response";
import {NewClassComponent} from "../../new-objects/new-class/new-class.component";

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
export class NewWorkloadComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly teachingStaffService = inject(TeachingStaffService);
  private readonly courseService = inject(CourseService);
  private readonly myClassService = inject(MyClassService);
  errorMsg = '';
  tStaff: TeachingStaffResponse[] = [];
  courses: CourseResponse[] = [];
  myClasses: MyClassResponse[] = [];

  public filteredTeachingStaff: ReplaySubject<TeachingStaffResponse[]> = new ReplaySubject<TeachingStaffResponse[]>(1);
  public filteredCourses: ReplaySubject<CourseResponse[]> = new ReplaySubject<CourseResponse[]>(1);
  public filteredMyClasses: ReplaySubject<MyClassResponse[]> = new ReplaySubject<MyClassResponse[]>(1);
  protected _onDestroy = new Subject<void>();
  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect | undefined;
  onSubmit() {
  }

  tStaffForm = new FormGroup({
    tStaffCtrl: new FormControl<number | null>(null),
    tStaffFilterCtrl: new FormControl<string>('')
  });

  courseForm = new FormGroup({
    courseCtrl: new FormControl<number | null>(null),
    courseFilterCtrl: new FormControl<string>('')

  });

  myClassForm = new FormGroup({
    myClassCtrl: new FormControl<number[] | null>(null),
    myClassFilterCtrl: new FormControl<string>('')
  })
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

    this.findAllClasses();
    this.myClassForm.controls.myClassFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterMyClasses();
      });
  }
  ngAfterViewInit() {
    //this.setInitialValue();
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


  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
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
    this.filteredTeachingStaff.next(
      this.tStaff.filter((tStaff) =>
        tStaff.rankFullName?.toLowerCase().includes(search)
      )
    );
  }



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

    this.filteredCourses.next(
      this.courses.filter((course) =>
        course.courseName?.toLowerCase().includes(search)
      )
    );
  }
  private findAllClasses(callback?: () => void) {
    this.myClassService.findAllMyClass().subscribe({
      next: (classes) => {
        if (classes) {
          this.myClasses = classes;
          console.log(this.myClasses);
          this.filteredMyClasses.next(this.myClasses.slice());
        }
        if (callback) callback();
      }
    });
  }
  protected filterMyClasses() {
    if (!this.myClasses) {
      return;
    }
    let search = this.myClassForm.controls.myClassFilterCtrl.value;
    if (!search) {
      this.filteredMyClasses.next(this.myClasses.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredMyClasses.next(
      this.myClasses.filter((myClass) =>
        myClass.classNameAndYear?.toLowerCase().includes(search)
      )
    );
  }
  subscribeToChildEmitter(componentRef: any) {
    if (componentRef instanceof NewTeachingStaffComponent) {
      componentRef.emitTeachingStaff.subscribe((id: number) => {
        this.findAllTeachingStaff(() => {
            this.tStaffForm.controls.tStaffCtrl.setValue(id, {emitModelToViewChange: false});
        });
      })
    }
    if (componentRef instanceof NewCourseComponent) {
      componentRef.emitCourse.subscribe((id: number) => {
        this.findAllCourses(() => {
            this.courseForm.controls.courseCtrl.setValue(id, {emitModelToViewChange: false});
        });
      })
    }
    if (componentRef instanceof NewClassComponent) {
      componentRef.emitMyClass.subscribe((id: number) => {
        this.findAllClasses(() => {
            let prevValues = this.myClassForm.controls.myClassCtrl.value || [];
            this.myClassForm.controls.myClassCtrl.setValue([...prevValues, id], { emitModelToViewChange: false });
        });
      })
    }
  }
}
