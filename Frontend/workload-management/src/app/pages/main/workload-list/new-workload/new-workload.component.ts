import {Component, DestroyRef,inject, OnDestroy, OnInit, signal, ViewChild} from '@angular/core';
import {MatStep, MatStepper, MatStepperNext} from "@angular/material/stepper";
import {TeachingStaffService} from "../../../../services/services/teaching-staff.service";
import {TeachingStaffResponse} from "../../../../services/models/teaching-staff-response";
import {ReplaySubject, Subject, takeUntil} from "rxjs";
import {MatFormField, MatLabel, MatOption, MatSelect} from "@angular/material/select";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {AsyncPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {RouterLink, RouterOutlet} from "@angular/router";
import {NewTeachingStaffComponent} from "../../new-objects/new-teaching-staff/new-teaching-staff.component";
import {AcademicRankService, CourseService, MyClassService, StatusTypeService} from "../../../../services/services";
import {CourseResponse} from "../../../../services/models/course-response";
import {NewCourseComponent} from "../../new-objects/new-course/new-course.component";
import {MyClassResponse} from "../../../../services/models/my-class-response";
import {NewClassComponent} from "../../new-objects/new-class/new-class.component";
import {AcademicRankResponse} from "../../../../services/models/academic-rank-response";
import {StatusTypeResponse} from "../../../../services/models/status-type-response";
import {PreviewInputDataComponent} from "./preview-input-data/preview-input-data.component";
import {
  ColumnNames, ColumnsForAcademicRankResponse,
  ColumnsForClassResponse,
  ColumnsForCourseResponse, ColumnsForStatusTypeResponse,
  ColumnsForTeacherResponse
} from "../../new-objects/object-columns";

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
    MatLabel,
    PreviewInputDataComponent
  ],
  templateUrl: './new-workload.component.html',
  standalone: true,
  styleUrl: './new-workload.component.scss'
})
export class NewWorkloadComponent implements OnInit, OnDestroy {
  columns = signal<ColumnNames[] | undefined>(undefined)
  selectedTeachingStaff = signal<TeachingStaffResponse | undefined>(undefined);
  selectedCourse = signal<CourseResponse | undefined>(undefined);
  selectedMyClasses = signal<MyClassResponse[] | undefined>(undefined);
  selectedAcademicRank = signal<AcademicRankResponse | undefined>(undefined);
  selectedStatusType = signal<StatusTypeResponse | undefined>(undefined);
  columnsForTeacher = signal(false);
  columnsForCourse = signal(false);
  columnsForMyClasses = signal(false);
  columnsForAcademicRank = signal(false);
  columnsForStatusType = signal(false);
  private readonly destroyRef = inject(DestroyRef);
  private readonly teachingStaffService = inject(TeachingStaffService);
  private readonly courseService = inject(CourseService);
  private readonly myClassService = inject(MyClassService);
  private readonly academicRankService = inject(AcademicRankService);
  private readonly statusTypeService = inject(StatusTypeService);


  errorMsg = signal('');
  tStaff = signal<TeachingStaffResponse[] | undefined>(undefined);
  courses = signal<CourseResponse[] | undefined>(undefined);
  myClasses = signal<MyClassResponse[] | undefined>(undefined);
  academicRanks = signal<AcademicRankResponse[] | undefined>(undefined);
  statusTypes = signal<StatusTypeResponse[] | undefined>(undefined);

  public filteredTeachingStaff = new ReplaySubject<TeachingStaffResponse[]>(1);
  public filteredCourses = new ReplaySubject<CourseResponse[]>(1);
  public filteredMyClasses = new ReplaySubject<MyClassResponse[]>(1);

  protected _onDestroy = new Subject<void>();

  @ViewChild('multiSelect', {static: true}) multiSelect: MatSelect | undefined;

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
  });

  academicRankForm = new FormGroup({
    academicRankCtrl: new FormControl<number | null>(null),
  });
  statusTypeForm = new FormGroup({
    statusTypeCtrl: new FormControl<number | null>(null),
  });

  ngOnInit() {
    this.initTeachingStaffSub();
    this.initCourseSub()
    this.initMyClassSub()
    this.initAcademicRankSub();
    this.initStatusTypeSub();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
//filter dropdown options
  protected filterTeachingStaff() {
    const search = this.tStaffForm.controls.tStaffFilterCtrl.value?.toLowerCase() ?? '';
    this.filteredTeachingStaff.next(
      this.tStaff()?.filter(t => t.rankFullName?.toLowerCase().includes(search)) ?? []
    );
  }

  protected filterCourse() {
    const search = this.courseForm.controls.courseFilterCtrl.value?.toLowerCase() ?? '';
    this.filteredCourses.next(
      this.courses()?.filter(course => course.courseName?.toLowerCase().includes(search)) ?? []
    );
  }
  protected filterMyClasses() {
    const search = this.myClassForm.controls.myClassFilterCtrl.value?.toLowerCase() ?? '';
    this.filteredMyClasses.next(
      this.myClasses()?.filter(myClass => myClass.classNameAndYear?.toLowerCase().includes(search)) ?? []
    );
  }
// fetch data
  private fetchAllTeachingStaff(callback?: () => void) {
    const subscription = this.teachingStaffService.findAllTeachingStaff().subscribe({
      next: (tStaff) => {
        this.tStaff.set(tStaff);
        this.filteredTeachingStaff.next([...tStaff]);
        if (callback) callback();
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  private fetchAllCourses(callback?: () => void) {
    const subscription = this.courseService.findAllCourses().subscribe({
      next: (courses) => {
        this.courses.set(courses);
        this.filteredCourses.next([...courses]);
        if (callback) callback();
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  private fetchAllClasses(callback?: () => void) {
    const subscription = this.myClassService.findAllMyClass().subscribe({
      next: (classes) => {
        this.myClasses.set(classes);
        this.filteredMyClasses.next([...classes]);
        if (callback) callback();
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  private fetchAllAcademicRanks(callback?: () => void) {
    const subscription = this.academicRankService.findAllAcademicRank().subscribe({
      next: (academicRanks) => {
        this.academicRanks.set(academicRanks);
        if (callback) callback();
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  private fetchStatusTypes() {
    const subscription = this.statusTypeService.findAllStatusTypes().subscribe({
      next: (statusTypes) => {
        if (statusTypes) {
          this.statusTypes.set(statusTypes);
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
// select newly created objects

  subscribeToChildEmitter(componentRef: any) {
    if (componentRef instanceof NewTeachingStaffComponent) {
      componentRef.emitTeachingStaff.subscribe((id: number) => {
        this.fetchAllTeachingStaff(() => {
          this.tStaffForm.controls.tStaffCtrl.setValue(id, {emitModelToViewChange: false});
        });
      });
    }
    if (componentRef instanceof NewCourseComponent) {
      componentRef.emitCourse.subscribe((id: number) => {
        this.fetchAllCourses(() => {
          this.courseForm.controls.courseCtrl.setValue(id, {emitModelToViewChange: false});
        });
      });
    }
    if (componentRef instanceof NewClassComponent) {
      componentRef.emitMyClass.subscribe((id: number) => {
        this.fetchAllClasses(() => {
          let prevValues = this.myClassForm.controls.myClassCtrl.value ?? [];
          this.myClassForm.controls.myClassCtrl.setValue([...prevValues, id], {emitModelToViewChange: false});
        });
      });
    }
  }

  displayedColumns(){
    let columns: ColumnNames[] = [];
    if (this.columnsForTeacher()) columns.push(...ColumnsForTeacherResponse);

    if (this.columnsForCourse()) columns.push(...ColumnsForCourseResponse);
    if (this.columnsForMyClasses()) columns.push(...ColumnsForClassResponse);
    if (this.columnsForAcademicRank()) columns.push(...ColumnsForAcademicRankResponse);
    if (this.columnsForStatusType()) columns.push(...ColumnsForStatusTypeResponse);
    this.columns.set(columns);
  }

  // subscription Initialization
  initTeachingStaffSub() {
    this.fetchAllTeachingStaff();
    this.tStaffForm.controls.tStaffFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => this.filterTeachingStaff());
    const subTStaff = this.tStaffForm.controls.tStaffCtrl.valueChanges.subscribe({
      next: id => {
        const selectedStaff = this.tStaff()?.find(val => val.teachingStaffId === id);
        if (selectedStaff) {
          console.log(selectedStaff);
          this.columnsForTeacher.set(true);
          this.selectedTeachingStaff.set(selectedStaff);
          this.displayedColumns();
        }
      }
    });
    this.destroyRef.onDestroy(() => subTStaff.unsubscribe());
  }
  private initCourseSub() {
    this.fetchAllCourses();
    this.courseForm.controls.courseFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => this.filterCourse());
    const subTStaff = this.courseForm.controls.courseCtrl.valueChanges.subscribe({
      next: id => {
        const selectedCourse = this.courses()?.find(val => val.courseId === id);
        if (selectedCourse) {
          console.log(selectedCourse);
          this.columnsForCourse.set(true);
          this.selectedCourse.set(selectedCourse);
          this.displayedColumns();
        }
      }
    });
    this.destroyRef.onDestroy(() => subTStaff.unsubscribe());
  }
  initMyClassSub() {
    this.fetchAllClasses();
    this.myClassForm.controls.myClassFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => this.filterMyClasses());

    const subMyClass = this.myClassForm.controls.myClassCtrl.valueChanges.subscribe({
      next: selectedIds => {
        const selectedMyClasses = this.myClasses()?.filter(val =>
          val.classId !== undefined && selectedIds?.includes(val.classId)
        );
        if (selectedMyClasses && selectedMyClasses.length > 0) {
          this.selectedMyClasses.set(selectedMyClasses);
          this.columnsForMyClasses.set(true);
          console.log(this.selectedMyClasses());
        } else {
          this.columnsForMyClasses.set(false);
          this.selectedMyClasses.set(undefined);
        }
        this.displayedColumns();
      }
    });
    this.destroyRef.onDestroy(() => subMyClass.unsubscribe());
  }


  initAcademicRankSub() {
    this.fetchAllAcademicRanks();
    const subAcademicRanks = this.academicRankForm.controls.academicRankCtrl.valueChanges.subscribe({
      next: id => {
        const selectedAcademicRank = this.academicRanks()?.find(val => val.academicRankId === id);
        if (selectedAcademicRank) {
          console.log(selectedAcademicRank);
          this.columnsForAcademicRank.set(true)
          this.selectedAcademicRank.set(selectedAcademicRank);
          this.displayedColumns();
        }
      }
    });
    this.destroyRef.onDestroy(() => subAcademicRanks.unsubscribe())
  }

  initStatusTypeSub() {
    this.fetchStatusTypes();
    const subStatusTypes = this.statusTypeForm.controls.statusTypeCtrl.valueChanges.subscribe({
      next: id => {
        const selectedStatusType = this.statusTypes()?.find(val => val.statusTypeId === id);
        if (selectedStatusType) {
          console.log(selectedStatusType);
          this.columnsForStatusType.set(true);
          this.selectedStatusType.set(selectedStatusType);
          this.displayedColumns();
        }
      }
    });
    this.destroyRef.onDestroy(() => subStatusTypes.unsubscribe())
  }

}
