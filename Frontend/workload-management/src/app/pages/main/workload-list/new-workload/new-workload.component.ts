import {Component, DestroyRef, inject, OnDestroy, OnInit, signal, ViewChild} from '@angular/core';
import {TeachingStaffService} from "../../../../services/services/teaching-staff.service";
import {TeachingStaffResponse} from "../../../../services/models/teaching-staff-response";
import {ReplaySubject, Subject, takeUntil} from "rxjs";
import {MatError, MatFormField, MatLabel, MatOption, MatSelect} from "@angular/material/select";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {AsyncPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {NewTeachingStaffComponent} from "../../new-objects/new-teaching-staff/new-teaching-staff.component";
import {
  AcademicRankService,
  CourseService,
  MyClassService,
  SemesterControllerService,
  StatusTypeService, WorkloadService
} from "../../../../services/services";
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
  ColumnsForCourseResponse, ColumnsForSemesterResponse, ColumnsForStatusTypeResponse,
  ColumnsForTeacherResponse
} from "../../new-objects/object-columns";
import {SemesterResponse} from "../../../../services/models/semester-response";
import {MatInput} from "@angular/material/input";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {WorkloadRequest} from "../../../../services/models/workload-request";

@Component({
  selector: 'app-new-workload',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    NgxMatSelectSearchModule,
    AsyncPipe,
    MatButton,
    RouterLink,
    RouterOutlet,
    MatLabel,
    PreviewInputDataComponent,
    MatInput,
    MatError,
    MatSlideToggle
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
  selectedSemester = signal<SemesterResponse | undefined>(undefined);

  columnsForTeacher = signal(false);
  columnsForCourse = signal(false);
  columnsForMyClasses = signal(false);
  columnsForAcademicRank = signal(false);
  columnsForStatusType = signal(false);
  columnsForSemester = signal(false);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly teachingStaffService = inject(TeachingStaffService);
  private readonly courseService = inject(CourseService);
  private readonly myClassService = inject(MyClassService);
  private readonly academicRankService = inject(AcademicRankService);
  private readonly statusTypeService = inject(StatusTypeService);
  private readonly semesterService = inject(SemesterControllerService);
  private readonly workloadService = inject(WorkloadService);
  private readonly activeRoute = inject(ActivatedRoute);

  errorMsg = signal('');
  tStaff = signal<TeachingStaffResponse[] | undefined>(undefined);
  courses = signal<CourseResponse[] | undefined>(undefined);
  myClasses = signal<MyClassResponse[] | undefined>(undefined);
  academicRanks = signal<AcademicRankResponse[] | undefined>(undefined);
  statusTypes = signal<StatusTypeResponse[] | undefined>(undefined);
  semesters = signal<SemesterResponse[] | undefined>(undefined);
  public filteredTeachingStaff = new ReplaySubject<TeachingStaffResponse[]>(1);
  public filteredCourses = new ReplaySubject<CourseResponse[]>(1);
  public filteredMyClasses = new ReplaySubject<MyClassResponse[]>(1);

  workloadRequest?:WorkloadRequest;
  protected _onDestroy = new Subject<void>();

  @ViewChild('multiSelect', {static: true}) multiSelect: MatSelect | undefined;

  onSubmit() {
    console.log(this.workloadForm.controls);
    if (this.workloadForm.value.semesterCtrl &&
      this.workloadForm.value.tStaffCtrl &&
      this.workloadForm.value.courseCtrl &&
      this.workloadForm.value.myClassCtrl &&
      this.workloadForm.value.academicRankCtrl &&
      this.workloadForm.value.statusTypeCtrl&&
      this.workloadForm.value.includeInBudgetCtrl&&
      this.workloadForm.value.budgetPositionCtrl&&
      this.workloadForm.value.industryCoefficientCtrl&&
      this.workloadForm.value.expectedSalaryCtrl&&
      this.workloadForm.value.groupAmountCtrl&&
      this.workloadForm.value.contactHoursCtrl&&
      this.workloadForm.value.programCtrl&&
      this.workloadForm.value.groupForSemesterCtrl&&
      this.workloadForm.value.vacationMonthsCtrl&&
      this.workloadForm.value.commentsCtrl
    ) {
      this.workloadRequest = {
        semesterId: this.workloadForm.value.semesterCtrl,
        teachingStaffId: this.workloadForm.value.tStaffCtrl,
        courseId: this.workloadForm.value.courseCtrl,
        myClassIds: this.workloadForm.value.myClassCtrl,
        academicRankId: this.workloadForm.value.academicRankCtrl,
        statusTypeId: this.workloadForm.value.statusTypeCtrl,
        includeInBudget: this.workloadForm.value.includeInBudgetCtrl,
        budgetPosition: this.workloadForm.value.budgetPositionCtrl,
        industryCoefficient: this.workloadForm.value.industryCoefficientCtrl,
        vacationMonths: this.workloadForm.value.vacationMonthsCtrl,
        expectedSalary: this.workloadForm.value.expectedSalaryCtrl,
        groupAmount: this.workloadForm.value.groupAmountCtrl,
        contactHours: this.workloadForm.value.contactHoursCtrl,
        program: this.workloadForm.value.programCtrl,
        groupForSemesterId: this.workloadForm.value.groupForSemesterCtrl,
        comments: this.workloadForm.value.commentsCtrl,
        workingMonths: 5
      };

      this.workloadService.saveWorkload({
        body: this.workloadRequest
      }).subscribe({
        next: (id) => {
          console.log(id);
        },
        error: (err) => {
          console.log(this.errorMsg);
          this.errorMsg = err.error.validationErrors;

        }
      })
    }
    this.router.navigate(['..'], {
      relativeTo: this.activeRoute,
      replaceUrl: true});
  }

  workloadForm = new FormGroup({
    semesterCtrl: new FormControl<number | null>(null, {
      validators: [Validators.required]
    }),

    tStaffCtrl: new FormControl<number | null>(null, {
      validators: [Validators.required]
    }),
    tStaffFilterCtrl: new FormControl<string>('',),

    courseCtrl: new FormControl<number | null>(null, {
      validators: [Validators.required]
    }),
    courseFilterCtrl: new FormControl<string>(''),

    myClassCtrl: new FormControl<number[] | null>(null, {
      validators: [Validators.required]
    }),
    myClassFilterCtrl: new FormControl<string>(''),

    academicRankCtrl: new FormControl<number | null>(null, {
      validators: [Validators.required]
    }),
    statusTypeCtrl: new FormControl<number | null>(null, {
      validators: [Validators.required]
    }),
    //written input fields
    includeInBudgetCtrl: new FormControl<string | null>(null, {
    }),
    budgetPositionCtrl: new FormControl<boolean>(false, {
    }),
    industryCoefficientCtrl: new FormControl<number | null>(null, {
      validators: [Validators.required]
    }),
    vacationMonthsCtrl: new FormControl<number>(0, {
      validators: [Validators.required]
    }),
    expectedSalaryCtrl: new FormControl<number | null>(null, {
      validators: [Validators.required]
    }),
    groupAmountCtrl: new FormControl<number | null>(null, {
      validators: [Validators.required]
    }),
    contactHoursCtrl: new FormControl<number | null>(null, {
      validators: [Validators.required]
    }),
    programCtrl: new FormControl<string | null>(null, {
      validators: [Validators.required]
    }),
    groupForSemesterCtrl: new FormControl<number | null>(null, {
      validators: [Validators.required]
    }),
    commentsCtrl: new FormControl<string | null>(null, {
      validators: [Validators.required]
    }),
  })

  ngOnInit() {
    this.initTeachingStaffSub();
    this.initCourseSub()
    this.initMyClassSub()
    this.initAcademicRankSub();
    this.initStatusTypeSub();
    this.initSemesterSub();
    this.workloadForm.statusChanges.subscribe(status => {
      console.log("Form Status:", status);
      console.log("Form Errors:", this.workloadForm.errors);
      console.log(this.workloadForm.get('budgetPositionCtrl')?.value);
      console.log(this.workloadForm.controls);
    });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

//filter dropdown options
  protected filterTeachingStaff() {
    const search = this.workloadForm.controls.tStaffFilterCtrl.value?.toLowerCase() ?? '';
    this.filteredTeachingStaff.next(
      this.tStaff()?.filter(t => t.rankFullName?.toLowerCase().includes(search)) ?? []
    );
  }

  protected filterCourse() {
    const search = this.workloadForm.controls.courseFilterCtrl.value?.toLowerCase() ?? '';
    this.filteredCourses.next(
      this.courses()?.filter(course => course.courseName?.toLowerCase().includes(search)) ?? []
    );
  }

  protected filterMyClasses() {
    const search = this.workloadForm.controls.myClassFilterCtrl.value?.toLowerCase() ?? '';
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
        if (callback) callback(); // if necessary to execute something after fetch
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
        if (callback) callback(); // if necessary to execute something after fetch
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
        if (callback) callback(); // if necessary to execute something after fetch
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
        if (this.selectedSemester()) {
          this.academicRanks.set(academicRanks.filter((val) => val.semester === this.selectedSemester()?.semesterName));
        } else {
          this.academicRanks.set(academicRanks);
        }
        if (callback) callback(); // if necessary to execute something after fetch
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

  private fetchSemesters() {
    const subscription = this.semesterService.findAllSemesters().subscribe({
      next: (semesters) => {
        if (semesters) {
          this.semesters.set(semesters);
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
          this.workloadForm.controls.tStaffCtrl.setValue(id, {emitModelToViewChange: false});
        });
      });
    }
    if (componentRef instanceof NewCourseComponent) {
      componentRef.emitCourse.subscribe((id: number) => {
        this.fetchAllCourses(() => {
          this.workloadForm.controls.courseCtrl.setValue(id, {emitModelToViewChange: false});
        });
      });
    }
    if (componentRef instanceof NewClassComponent) {
      componentRef.emitMyClass.subscribe((id: number) => {
        this.fetchAllClasses(() => {
          let prevValues = this.workloadForm.controls.myClassCtrl.value ?? [];
          this.workloadForm.controls.myClassCtrl.setValue([...prevValues, id], {emitModelToViewChange: false});
        });
      });
    }
  }

  displayedColumns() {
    let columns: ColumnNames[] = [];
    if (this.columnsForTeacher()) columns.push(...ColumnsForTeacherResponse);
    if (this.columnsForCourse()) columns.push(...ColumnsForCourseResponse);
    if (this.columnsForMyClasses()) columns.push(...ColumnsForClassResponse);
    if (this.columnsForAcademicRank()) columns.push(...ColumnsForAcademicRankResponse);
    if (this.columnsForStatusType()) columns.push(...ColumnsForStatusTypeResponse);
    if (this.columnsForSemester()) columns.push(...ColumnsForSemesterResponse);
    this.columns.set(columns);
  }

  // subscription Initialization
  initTeachingStaffSub() {
    this.fetchAllTeachingStaff();
    this.workloadForm.controls.tStaffFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => this.filterTeachingStaff());
    const subTStaff = this.workloadForm.controls.tStaffCtrl.valueChanges.subscribe({
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
    this.workloadForm.controls.courseFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => this.filterCourse());
    const subTStaff = this.workloadForm.controls.courseCtrl.valueChanges.subscribe({
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
    this.workloadForm.controls.myClassFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => this.filterMyClasses());

    const subMyClass = this.workloadForm.controls.myClassCtrl.valueChanges.subscribe({
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
    const subAcademicRanks = this.workloadForm.controls.academicRankCtrl.valueChanges.subscribe({
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
    const subStatusTypes = this.workloadForm.controls.statusTypeCtrl.valueChanges.subscribe({
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

  initSemesterSub() {
    this.fetchSemesters();
    const subSemesters = this.workloadForm.controls.semesterCtrl.valueChanges.subscribe({
      next: id => {
        const selectedSemester = this.semesters()?.find(val => val.semesterId === id);
        if (selectedSemester) {
          console.log(selectedSemester);
          this.columnsForSemester.set(true);
          this.selectedSemester.set(selectedSemester);
          this.displayedColumns();
          this.fetchAllAcademicRanks();
        }
      }
    });
    this.destroyRef.onDestroy(() => subSemesters.unsubscribe())
  }

 //TODO
  errorMessage() {
    return "";
  }

  updateErrorMessage(includeInBudgetCtrl: string) {

  }

  navigate(event: Event) {
    event.preventDefault();
  }
}
