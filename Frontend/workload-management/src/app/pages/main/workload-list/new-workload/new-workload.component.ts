import { Component, DestroyRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { TeachingStaffService } from "../../../../services/services/teaching-staff.service";
import { TeachingStaffResponse } from "../../../../services/models/teaching-staff-response";
import { EMPTY, of, ReplaySubject, Subject, switchMap, takeUntil } from "rxjs";
import { MatError, MatFormField, MatLabel, MatOption, MatSelect } from "@angular/material/select";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { AsyncPipe } from "@angular/common";
import { MatButton } from "@angular/material/button";
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from "@angular/router";
import { NewTeachingStaffComponent } from "../../new-objects/new-teaching-staff/new-teaching-staff.component";
import {
  AcademicRankService,
  CourseService,
  MyClassService,
  SemesterControllerService,
  StatusTypeService,
  WorkloadService
} from "../../../../services/services";
import { CourseResponse } from "../../../../services/models/course-response";
import { NewCourseComponent } from "../../new-objects/new-course/new-course.component";
import { MyClassResponse } from "../../../../services/models/my-class-response";
import { NewClassComponent } from "../../new-objects/new-class/new-class.component";
import { AcademicRankResponse } from "../../../../services/models/academic-rank-response";
import { StatusTypeResponse } from "../../../../services/models/status-type-response";
import { PreviewInputDataComponent } from "./preview-input-data/preview-input-data.component";
import {
  ColumnNames, ColumnsForAcademicRankResponse,
  ColumnsForClassResponse,
  ColumnsForCourseResponse, ColumnsForSemesterResponse, ColumnsForStatusTypeResponse,
  ColumnsForTeacherResponse
} from "../../new-objects/object-columns";
import { SemesterResponse } from "../../../../services/models/semester-response";
import { MatInput } from "@angular/material/input";
import { MatSlideToggle } from "@angular/material/slide-toggle";
import { WorkloadRequest } from "../../../../services/models/workload-request";
import { WorkloadResponse } from "../../../../services/models/workload-response";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpErrorResponse } from "@angular/common/http";

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
  styleUrls: ['./new-workload.component.scss']
})
export class NewWorkloadComponent implements OnInit, OnDestroy {
  // Signals and selections
  columns = signal<ColumnNames[] | undefined>(undefined);
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

  private currentWorkloadId: number | null = null;

  // Service injections
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly teachingStaffService = inject(TeachingStaffService);
  private readonly courseService = inject(CourseService);
  private readonly myClassService = inject(MyClassService);
  private readonly academicRankService = inject(AcademicRankService);
  private readonly statusTypeService = inject(StatusTypeService);
  private readonly semesterService = inject(SemesterControllerService);
  private readonly workloadService = inject(WorkloadService);
  private readonly _snackBar = inject(MatSnackBar);

  // Signals for error and data lists
  errorMsg = signal('');
  tStaff = signal<TeachingStaffResponse[] | undefined>(undefined);
  courses = signal<CourseResponse[] | undefined>(undefined);
  myClasses = signal<MyClassResponse[] | undefined>(undefined);
  academicRanks = signal<AcademicRankResponse[] | undefined>(undefined);
  statusTypes = signal<StatusTypeResponse[] | undefined>(undefined);
  semesters = signal<SemesterResponse[] | undefined>(undefined);
  editMode = signal(false);

  public filteredTeachingStaff = new ReplaySubject<TeachingStaffResponse[]>(1);
  public filteredCourses = new ReplaySubject<CourseResponse[]>(1);
  public filteredMyClasses = new ReplaySubject<MyClassResponse[]>(1);

  workloadRequest?: WorkloadRequest;

  protected _onDestroy = new Subject<void>();

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect | undefined;

  // Reactive form definition
  workloadForm = new FormGroup({
    semesterCtrl: new FormControl<number | null>(null, [Validators.required]),
    tStaffCtrl: new FormControl<number | null>(null, [Validators.required]),
    tStaffFilterCtrl: new FormControl<string>(''),
    courseCtrl: new FormControl<number | null>(null, [Validators.required]),
    courseFilterCtrl: new FormControl<string>(''),
    myClassCtrl: new FormControl<number[] | null>(null, [Validators.required]),
    myClassFilterCtrl: new FormControl<string>(''),
    academicRankCtrl: new FormControl<number | null>(null, [Validators.required]),
    statusTypeCtrl: new FormControl<number | null>(null, [Validators.required]),
    includeInBudgetCtrl: new FormControl<string | null>(null, [Validators.required]),
    budgetPositionCtrl: new FormControl<boolean>(false, [Validators.required]),
    industryCoefficientCtrl: new FormControl<number | null>(null, [Validators.required]),
    vacationMonthsCtrl: new FormControl<number>(0, [Validators.required]),
    expectedSalaryCtrl: new FormControl<number | null>(null, [Validators.required]),
    groupAmountCtrl: new FormControl<number | null>(null, [Validators.required]),
    contactHoursCtrl: new FormControl<number | null>(null, [Validators.required]),
    programCtrl: new FormControl<string | null>(null, [Validators.required]),
    groupForSemesterCtrl: new FormControl<number | null>(null, [Validators.required]),
    commentsCtrl: new FormControl<string | null>(null, [Validators.required]),
  });

  ngOnInit() {
    this.initEditOrNew();
    this.initTeachingStaffSub();
    this.initCourseSub();
    this.initMyClassSub();
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

  initEditOrNew() {
    this.activeRoute.url.pipe(
      switchMap(urlSegments => {
        const currentRoute = urlSegments.map(segment => segment.path).join('/');
        if (currentRoute === 'new-workload') {
          this.editMode.set(false);
          return of(null);
        }
        return this.activeRoute.paramMap.pipe(
          switchMap(params => {
            const idParam = params.get('id');
            const id = idParam ? Number(idParam) : NaN;
            if (isNaN(id) || id <= 0) {
              this.router.navigate(['/main/workload'], { replaceUrl: true });
              this.openSnackBar("Nepareizs id", "Aizvērt");
              return EMPTY;
            }
            return this.workloadService.findWorkloadById({ "workload-id": id });
          })
        );
      })
    ).subscribe({
      next: (workload) => {
        if (workload) {
          this.editMode.set(true);
          this.fillFormValues(workload);
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.openSnackBar(err.error.errorMsg, "Aizvērt");
        this.router.navigate(['/main/workload'], { replaceUrl: true });
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 5000 });
  }

  onSubmit() {
    console.log(this.workloadForm.controls);
    if (this.workloadForm.valid) {
      // Create workloadRequest from form values
      this.workloadRequest = {
        semesterId: this.workloadForm.value.semesterCtrl ?? 0,
        teachingStaffId: this.workloadForm.value.tStaffCtrl ?? 0,
        courseId: this.workloadForm.value.courseCtrl ?? 0,
        myClassIds: this.workloadForm.value.myClassCtrl ?? [],
        academicRankId: this.workloadForm.value.academicRankCtrl ?? 0,
        statusTypeId: this.workloadForm.value.statusTypeCtrl ?? 0,
        includeInBudget: this.workloadForm.value.includeInBudgetCtrl ?? '',
        budgetPosition: this.workloadForm.value.budgetPositionCtrl ?? false,
        industryCoefficient: this.workloadForm.value.industryCoefficientCtrl ?? 0,
        vacationMonths: this.workloadForm.value.vacationMonthsCtrl ?? 0,
        expectedSalary: this.workloadForm.value.expectedSalaryCtrl ?? 0,
        groupAmount: this.workloadForm.value.groupAmountCtrl ?? 0,
        contactHours: this.workloadForm.value.contactHoursCtrl ?? 0,
        program: this.workloadForm.value.programCtrl ?? '',
        groupForSemesterId: this.workloadForm.value.groupForSemesterCtrl ?? 0,
        comments: this.workloadForm.value.commentsCtrl ?? '',
        workingMonths: 5
      };

      if (this.editMode()) {
        // Update mode
        if (this.currentWorkloadId) {
          this.workloadService.updateWorkloadById({ "workload-id": this.currentWorkloadId, body: this.workloadRequest }).subscribe({
            next: (id) => {
              console.log(id);
              this.router.navigate(['..'], { relativeTo: this.activeRoute, replaceUrl: true });
            },
            complete: () => {
              this.openSnackBar("Atjaunināts", "Aizvērt");
            },
            error: (err) => {
              console.log(this.errorMsg);
              this.errorMsg = err.error.validationErrors;
            }
          });
        }
      } else {
        // Create mode
        this.workloadService.saveWorkload({ body: this.workloadRequest }).subscribe({
          next: (id) => {
            console.log(id);
            this.router.navigate(['..'], { relativeTo: this.activeRoute, replaceUrl: true });
          },
          complete: () => {
            this.openSnackBar("Saglabāts", "Aizvērt");
          },
          error: (err) => {
            console.log(this.errorMsg);
            this.errorMsg = err.error.validationErrors;
          }
        });
      }
    }
  }

  // ----- Filtering methods -----
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

  // ----- Data fetching methods (unchanged) -----
  private fetchAllTeachingStaff(callback?: () => void) {
    const subscription = this.teachingStaffService.findAllTeachingStaff().subscribe({
      next: (tStaff) => {
        this.tStaff.set(tStaff);
        this.filteredTeachingStaff.next([...tStaff]);
        if (callback) callback();
      },
      error: (err) => console.log(err)
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  private fetchAllCourses(callback?: () => void) {
    const subscription = this.courseService.findAllCourses().subscribe({
      next: (courses) => {
        this.courses.set(courses);
        this.filteredCourses.next([...courses]);
        if (callback) callback();
      },
      error: (err) => console.log(err)
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  private fetchAllClasses(callback?: () => void) {
    const subscription = this.myClassService.findAllMyClass().subscribe({
      next: (classes) => {
        this.myClasses.set(classes);
        this.filteredMyClasses.next([...classes]);
        if (callback) callback();
      },
      error: (err) => console.log(err)
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  private fetchAllAcademicRanks(callback?: () => void) {
    const subscription = this.academicRankService.findAllAcademicRank().subscribe({
      next: (academicRanks) => {
        this.academicRanks.set(academicRanks);
        if (callback) callback();
      },
      error: (err) => console.log(err)
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  private fetchStatusTypes(callback?: () => void) {
    const subscription = this.statusTypeService.findAllStatusTypes().subscribe({
      next: (statusTypes) => {
        this.statusTypes.set(statusTypes);
        if (callback) callback();
      },
      error: (err) => console.log(err)
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  private fetchSemesters(callback?: () => void) {
    const subscription = this.semesterService.findAllSemesters().subscribe({
      next: (semesters) => {
        this.semesters.set(semesters);
        if (callback) callback();
      },
      error: (err) => console.log(err)
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  // ----- Methods to select newly created objects -----
  subscribeToChildEmitter(componentRef: any) {
    if (componentRef instanceof NewTeachingStaffComponent) {
      componentRef.emitTeachingStaff.subscribe((id: number) => this.fillTeachingStaffInput(id));
    }
    if (componentRef instanceof NewCourseComponent) {
      componentRef.emitCourse.subscribe((id: number) => this.fillMyCourseInput(id));
    }
    if (componentRef instanceof NewClassComponent) {
      componentRef.emitMyClass.subscribe((id: number) => this.fillClassesInput(id));
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

  // ----- Subscription Initialization Methods -----
  initTeachingStaffSub() {
    if (!this.editMode()) this.fetchAllTeachingStaff();
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
    if (!this.editMode()) this.fetchAllCourses();
    this.workloadForm.controls.courseFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => this.filterCourse());
    const subCourse = this.workloadForm.controls.courseCtrl.valueChanges.subscribe({
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
    this.destroyRef.onDestroy(() => subCourse.unsubscribe());
  }

  initMyClassSub() {
    if (!this.editMode()) this.fetchAllClasses();
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
    if (!this.editMode()) this.fetchAllAcademicRanks();
    const subAcademicRanks = this.workloadForm.controls.academicRankCtrl.valueChanges.subscribe({
      next: id => {
        const selectedAcademicRank = this.academicRanks()?.find(val => val.academicRankId === id);
        if (selectedAcademicRank) {
          console.log(selectedAcademicRank);
          this.columnsForAcademicRank.set(true);
          this.selectedAcademicRank.set(selectedAcademicRank);
          this.displayedColumns();
        }
      }
    });
    this.destroyRef.onDestroy(() => subAcademicRanks.unsubscribe());
  }

  initStatusTypeSub() {
    if (!this.editMode()) this.fetchStatusTypes();
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
    this.destroyRef.onDestroy(() => subStatusTypes.unsubscribe());
  }

  initSemesterSub() {
    if (!this.editMode()) this.fetchSemesters();
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
    this.destroyRef.onDestroy(() => subSemesters.unsubscribe());
  }

  // ----- Auto Form Fill Methods -----
  private fillFormValues(workload: WorkloadResponse) {
    console.log(workload);
    if(workload.workloadId)
      this.currentWorkloadId = workload.workloadId;
    workload.myClasses?.forEach((myClass) => {
      if (myClass.classId) {
        this.fillClassesInput(myClass.classId);
      }
    });
    if (workload.course?.courseId)
      this.fillMyCourseInput(workload.course.courseId);
    else
      this.fetchAllCourses();
    if (workload.teachingStaff?.teachingStaffId)
      this.fillTeachingStaffInput(workload.teachingStaff.teachingStaffId);
    else
      this.fetchAllTeachingStaff();
    if (workload.semester?.semesterId)
      this.fillSemesterInput(workload.semester.semesterId);
    else
      this.fetchSemesters();
    if (workload.academicRankDetails?.academicRank?.academicRankId)
      this.fillAcademicRankInput(workload.academicRankDetails.academicRank.academicRankId);
    else
      this.fetchAllAcademicRanks();
    if (workload.statusType?.statusTypeId)
      this.fillStatusType(workload.statusType.statusTypeId);
    else
      this.fetchStatusTypes();
    if (workload.groupForSemester?.classId)
      this.workloadForm.controls.groupForSemesterCtrl.setValue(workload.groupForSemester.classId);
    else
      this.fetchAllClasses();
    if (workload.comments)
      this.workloadForm.controls.commentsCtrl.setValue(workload.comments);
    if (workload.industryCoefficient)
      this.workloadForm.controls.industryCoefficientCtrl.setValue(workload.industryCoefficient);
    if (workload.vacationMonths)
      this.workloadForm.controls.vacationMonthsCtrl.setValue(workload.vacationMonths);
    if (workload.expectedSalary)
      this.workloadForm.controls.expectedSalaryCtrl.setValue(workload.expectedSalary);
    if (workload.groupAmount)
      this.workloadForm.controls.groupAmountCtrl.setValue(workload.groupAmount);
    if (workload.contactHours)
      this.workloadForm.controls.contactHoursCtrl.setValue(workload.contactHours);
    if (workload.program)
      this.workloadForm.controls.programCtrl.setValue(workload.program);
    if (workload.includeInBudget)
      this.workloadForm.controls.includeInBudgetCtrl.setValue(workload.includeInBudget);
    if (workload.budgetPosition)
      this.workloadForm.controls.budgetPositionCtrl.setValue(workload.budgetPosition);
  }

  fillTeachingStaffInput(id: number) {
    this.fetchAllTeachingStaff(() => {
      this.workloadForm.controls.tStaffCtrl.setValue(id);
    });
  }

  fillMyCourseInput(id: number) {
    this.fetchAllCourses(() => {
      this.workloadForm.controls.courseCtrl.setValue(id);
    });
  }

  fillClassesInput(id: number) {
    this.fetchAllClasses(() => {
      let prevValues = this.workloadForm.controls.myClassCtrl.value ?? [];
      this.workloadForm.controls.myClassCtrl.setValue([...prevValues, id]);
    });
  }

  fillSemesterInput(id: number) {
    this.fetchSemesters(() => {
      this.workloadForm.controls.semesterCtrl.setValue(id);
    });
  }

  fillAcademicRankInput(id: number) {
    this.fetchAllAcademicRanks(() => {
      this.workloadForm.controls.academicRankCtrl.setValue(id);
    });
  }

  fillStatusType(id: number) {
    this.fetchStatusTypes(() => {
      this.workloadForm.controls.statusTypeCtrl.setValue(id);
    });
  }
  updateErrorMessage(controlName: keyof typeof this.workloadForm.controls) {
    const control = this.workloadForm.controls[controlName];
    if (control.errors) {
      if (control.hasError('required')) {
        this.errorMsg.set('Lauks nevar būt tukšs');
      } else if (control.hasError('minlength')) {
        this.errorMsg.set('Ievadītā vērtība ir pārāk īsa');
      } else if (control.hasError('maxlength')) {
        this.errorMsg.set('Ievadītā vērtība ir pārāk gara');
      } else if (control.hasError('min')) {
        this.errorMsg.set('Ievadītā vērtība ir pārāk maza');
      } else if (control.hasError('max')) {
        this.errorMsg.set('Ievadītā vērtība ir pārāk liela');
      } else {
        this.errorMsg.set('Nederīga vērtība');
      }
    } else {
      this.errorMsg.set('');
    }
  }
  navigate(event: Event) {
    event.preventDefault();
  }
}
