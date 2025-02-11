import {AfterViewInit, Component, DestroyRef, inject, OnDestroy, OnInit, signal, ViewChild} from '@angular/core';
import { MatStep, MatStepper, MatStepperNext } from "@angular/material/stepper";
import { TeachingStaffService } from "../../../../services/services/teaching-staff.service";
import { TeachingStaffResponse } from "../../../../services/models/teaching-staff-response";
import { ReplaySubject, Subject, takeUntil } from "rxjs";
import { MatFormField, MatLabel, MatOption, MatSelect } from "@angular/material/select";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { AsyncPipe } from "@angular/common";
import { MatButton } from "@angular/material/button";
import { RouterLink, RouterOutlet } from "@angular/router";
import { NewTeachingStaffComponent } from "../../new-objects/new-teaching-staff/new-teaching-staff.component";
import { AcademicRankService, CourseService, MyClassService } from "../../../../services/services";
import { CourseResponse } from "../../../../services/models/course-response";
import { NewCourseComponent } from "../../new-objects/new-course/new-course.component";
import { MyClassResponse } from "../../../../services/models/my-class-response";
import { NewClassComponent } from "../../new-objects/new-class/new-class.component";
import { AcademicRankResponse } from "../../../../services/models/academic-rank-response";

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
    RouterOutlet,
    MatLabel
  ],
  templateUrl: './new-workload.component.html',
  standalone: true,
  styleUrl: './new-workload.component.scss'
})
export class NewWorkloadComponent implements OnInit, OnDestroy {
  private readonly destroyRef = inject(DestroyRef);
  private readonly teachingStaffService = inject(TeachingStaffService);
  private readonly courseService = inject(CourseService);
  private readonly myClassService = inject(MyClassService);
  private readonly academicRankService = inject(AcademicRankService);

  isFetchingAcademicRanks = signal(false);
  academicRanks = signal<AcademicRankResponse[]>([]);
  errorMsg = signal('');
  tStaff = signal<TeachingStaffResponse[]>([]);
  courses = signal<CourseResponse[]>([]);
  myClasses = signal<MyClassResponse[]>([]);

  public filteredTeachingStaff = new ReplaySubject<TeachingStaffResponse[]>(1);
  public filteredCourses = new ReplaySubject<CourseResponse[]>(1);
  public filteredMyClasses = new ReplaySubject<MyClassResponse[]>(1);

  protected _onDestroy = new Subject<void>();

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect | undefined;

  onSubmit() {}

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
  });

  academicRankForm = new FormGroup({
    academicRankCtrl: new FormControl<number[] | null>(null),
  });
  ngOnInit() {
    this.findAllTeachingStaff();
    this.tStaffForm.controls.tStaffFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => this.filterTeachingStaff());

    this.findAllCourses();
    this.courseForm.controls.courseFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => this.filterCourse());

    this.findAllClasses();
    this.myClassForm.controls.myClassFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => this.filterMyClasses());

    this.findAllAcademicRanks();
  }
  private findAllTeachingStaff(callback?: () => void) {
    this.teachingStaffService.findAllTeachingStaff().subscribe({
      next: (tStaff) => {
        this.tStaff.set(tStaff);
        this.filteredTeachingStaff.next([...tStaff]);
        if (callback) callback();
      }
    });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected filterTeachingStaff() {
    const search = this.tStaffForm.controls.tStaffFilterCtrl.value?.toLowerCase() ?? '';
    this.filteredTeachingStaff.next(
      this.tStaff().filter(t => t.rankFullName?.toLowerCase().includes(search))
    );
  }

  private findAllCourses(callback?: () => void) {
    this.courseService.findAllCourses().subscribe({
      next: (courses) => {
        this.courses.set(courses);
        this.filteredCourses.next([...courses]);
        if (callback) callback();
      }
    });
  }

  protected filterCourse() {
    const search = this.courseForm.controls.courseFilterCtrl.value?.toLowerCase() ?? '';
    this.filteredCourses.next(
      this.courses().filter(course => course.courseName?.toLowerCase().includes(search))
    );
  }

  private findAllClasses(callback?: () => void) {
    this.myClassService.findAllMyClass().subscribe({
      next: (classes) => {
        this.myClasses.set(classes);
        this.filteredMyClasses.next([...classes]);
        if (callback) callback();
      }
    });
  }

  protected filterMyClasses() {
    const search = this.myClassForm.controls.myClassFilterCtrl.value?.toLowerCase() ?? '';
    this.filteredMyClasses.next(
      this.myClasses().filter(myClass => myClass.classNameAndYear?.toLowerCase().includes(search))
    );
  }

  private findAllAcademicRanks(callback?: () => void) {
    this.academicRankService.findAllAcademicRank().subscribe({
      next: (academicRanks) => {
        this.academicRanks.set(academicRanks);
        if (callback) callback();
      }
    });
  }

  subscribeToChildEmitter(componentRef: any) {
    if (componentRef instanceof NewTeachingStaffComponent) {
      componentRef.emitTeachingStaff.subscribe((id: number) => {
        this.findAllTeachingStaff(() => {
          this.tStaffForm.controls.tStaffCtrl.setValue(id, { emitModelToViewChange: false });
        });
      });
    }
    if (componentRef instanceof NewCourseComponent) {
      componentRef.emitCourse.subscribe((id: number) => {
        this.findAllCourses(() => {
          this.courseForm.controls.courseCtrl.setValue(id, { emitModelToViewChange: false });
        });
      });
    }
    if (componentRef instanceof NewClassComponent) {
      componentRef.emitMyClass.subscribe((id: number) => {
        this.findAllClasses(() => {
          let prevValues = this.myClassForm.controls.myClassCtrl.value ?? [];
          this.myClassForm.controls.myClassCtrl.setValue([...prevValues, id], { emitModelToViewChange: false });
        });
      });
    }
  }
}
