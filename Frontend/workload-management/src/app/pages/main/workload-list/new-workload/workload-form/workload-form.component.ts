import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {WorkloadRequest} from "../../../../../services/models/workload-request";
import {WorkloadResponse} from "../../../../../services/models/workload-response";
import {ReplaySubject, Subject, takeUntil} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel, MatOption, MatSelect} from "@angular/material/select";
import {TeachingStaffResponse} from "../../../../../services/models/teaching-staff-response";
import {CourseResponse} from "../../../../../services/models/course-response";
import {MyClassResponse} from "../../../../../services/models/my-class-response";
import {AcademicRankResponse} from "../../../../../services/models/academic-rank-response";
import {SemesterResponse} from "../../../../../services/models/semester-response";
import {TeachingStaffService} from "../../../../../services/services/teaching-staff.service";
import {CourseService} from "../../../../../services/services/course.service";
import {MyClassService} from "../../../../../services/services/my-class.service";
import {AcademicRankService} from "../../../../../services/services/academic-rank.service";
import {SemesterControllerService} from "../../../../../services/services/semester-controller.service";
import {WorkloadService} from "../../../../../services/services/workload.service";
import {NewTeachingStaffComponent} from "../../../new-objects/new-teaching-staff/new-teaching-staff.component";
import {NewCourseComponent} from "../../../new-objects/new-course/new-course.component";
import {NewClassComponent} from "../../../new-objects/new-class/new-class.component";
import {AsyncPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {RouterLink, RouterOutlet} from "@angular/router";
import {BudgetPosition, EnumTranslationService} from "../../../../../services/translation/EnumTranslationService";

@Component({
  selector: 'app-workload-form',
  imports: [
    AsyncPipe,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSlideToggle,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet,
    FormsModule
  ],
  templateUrl: './workload-form.component.html',
  standalone: true,
  styleUrl: './workload-form.component.scss'
})
export class WorkloadFormComponent implements OnInit {
  @Input() initialWorkload?: WorkloadResponse;
  @Input() editMode: boolean | undefined;
  @Output() formSubmit = new EventEmitter<WorkloadRequest>();

  moreSettings = signal(false);
  errorMsg = signal('');
  tStaff = signal<TeachingStaffResponse[] | undefined>(undefined);
  courses = signal<CourseResponse[] | undefined>(undefined);
  myClasses = signal<MyClassResponse[] | undefined>(undefined);
  academicRanks = signal<AcademicRankResponse[] | undefined>(undefined);
  semesters = signal<SemesterResponse[] | undefined>(undefined);
  private readonly destroyRef = inject(DestroyRef);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly teachingStaffService = inject(TeachingStaffService);
  private readonly courseService = inject(CourseService);
  private readonly myClassService = inject(MyClassService);
  private readonly academicRankService = inject(AcademicRankService);
  private readonly semesterService = inject(SemesterControllerService);
  private readonly workloadService = inject(WorkloadService);
  @ViewChild('multiSelect', {static: true}) multiSelect: MatSelect | undefined;
  // ReplaySubjects for dropdown filtering
  public filteredTeachingStaff = new ReplaySubject<TeachingStaffResponse[]>(1);
  public filteredCourses = new ReplaySubject<CourseResponse[]>(1);
  public filteredMyClasses = new ReplaySubject<MyClassResponse[]>(1);
  protected _onDestroy = new Subject<void>();
  budgetPositions: BudgetPosition[] | undefined;
  enumService = inject(EnumTranslationService);
  // Defined form
  workloadForm = new FormGroup({
    semesterCtrl: new FormControl<number | null>(null, [Validators.required]),
    tStaffCtrl: new FormControl<number | undefined>(undefined, [Validators.required]),
    tStaffFilterCtrl: new FormControl<string>(''),
    courseCtrl: new FormControl<number | null>(null, [Validators.required]),
    courseFilterCtrl: new FormControl<string>(''),
    myClassCtrl: new FormControl<number[] | null>(null, [Validators.required]),
    myClassFilterCtrl: new FormControl<string>(''),
    academicRankCtrl: new FormControl<number | null>(null, [Validators.required]),
    cpForGroupCtrl: new FormControl<number | null>(null, [Validators.required]),
    includeInBudgetCtrl: new FormControl<string | null>('1', [Validators.required]),
    budgetPositionCtrl: new FormControl<BudgetPosition | undefined>(undefined, {
      validators: [
        Validators.required],
    }),
    industryCoefficientCtrl: new FormControl<number>(1, [Validators.required]),
    vacationMonthsCtrl: new FormControl<number>(0, [Validators.required]),
    groupAmountCtrl: new FormControl<number | null>(null, [Validators.required]),
    groupForSemesterCtrl: new FormControl<number | null>(null, [Validators.required]),
    commentsCtrl: new FormControl<string | null>(null, [Validators.required]),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialWorkload'] && this.initialWorkload) {
      this.fillFormValues(this.initialWorkload);
    }
  }

  ngOnInit(): void {
    this.fetchAllTeachingStaff();
    this.fetchSemesters();
    this.fetchAllClasses();
    this.fetchAllCourses();
    this.fetchAllAcademicRanks();
    this.budgetPositions = Object.values(this.enumService.enumTypes.budgetPositions);
    // initialize filters in dropdowns
    this.workloadForm.controls.tStaffFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => this.filterTeachingStaff());
    this.workloadForm.controls.courseFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => this.filterCourse());
    this.workloadForm.controls.myClassFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => this.filterMyClasses());
    this.workloadForm.controls.tStaffCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe({
        next: id => {
          console.log(id);
          if (!id) return;
          const selectedStaff = this.tStaff()?.find(val => val.teachingStaffId === Number(id));
          console.log('Selected staff:', selectedStaff);
          if (selectedStaff?.status?.statusTypeName === "ievēlētie") {
            console.log('Setting vacation months to 2');
            this.workloadForm.controls.vacationMonthsCtrl.setValue(2);
          } else {
            console.log('Status:', selectedStaff?.status?.statusTypeName);
          }
        }
      });

  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  fillFormValues(workload: WorkloadResponse) {
    this.workloadForm.controls.semesterCtrl.setValue(workload.semester?.semesterId ?? null);
    this.workloadForm.controls.tStaffCtrl.setValue(workload.teachingStaff?.teachingStaffId ?? null);
    this.workloadForm.controls.courseCtrl.setValue(workload.course?.courseId ?? null);
    this.workloadForm.controls.commentsCtrl.setValue(workload.comments ?? null);
    this.workloadForm.controls.industryCoefficientCtrl.setValue(workload.industryCoefficient ?? null);
    this.workloadForm.controls.vacationMonthsCtrl.setValue(workload.vacationMonths ?? 0);
    this.workloadForm.controls.groupAmountCtrl.setValue(workload.groupAmount ?? null);
    this.workloadForm.controls.includeInBudgetCtrl.setValue(workload.includeInBudget ?? null);
    this.workloadForm.controls.budgetPositionCtrl.setValue(workload.budgetPosition as BudgetPosition ?? undefined);
    this.workloadForm.controls.academicRankCtrl.setValue(workload.academicRankDetails?.academicRank?.academicRankId ?? null);
    this.workloadForm.controls.groupForSemesterCtrl.setValue(workload.groupForSemester?.classId ?? null);
    this.workloadForm.controls.cpForGroupCtrl.setValue(workload.creditPointsPerGroup ?? 0);
    workload.myClasses?.forEach((myClass) => {
      if (myClass.classId) {
        let prevValues = this.workloadForm.controls.myClassCtrl.value ?? [];
        this.workloadForm.controls.myClassCtrl.setValue([...prevValues, myClass.classId]);
      }
    });
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
      this.myClasses()?.filter(myClass => myClass.classLevelAndProgram?.toLowerCase().includes(search)) ?? []
    );
  }


  onSubmit() {
    if (this.workloadForm.valid) {
      const request: WorkloadRequest = {
        semesterId: this.workloadForm.value.semesterCtrl ?? 0,
        teachingStaffId: this.workloadForm.value.tStaffCtrl ?? 0,
        courseId: this.workloadForm.value.courseCtrl ?? 0,
        myClassIds: this.workloadForm.value.myClassCtrl ?? [],
        academicRankId: this.workloadForm.value.academicRankCtrl ?? 0,
        includeInBudget: this.workloadForm.value.includeInBudgetCtrl ?? '',
        budgetPosition: this.workloadForm.value.budgetPositionCtrl ?? BudgetPosition.grant,
        industryCoefficient: this.workloadForm.value.industryCoefficientCtrl ?? 0,
        vacationMonths: this.workloadForm.value.vacationMonthsCtrl ?? 0,
        groupAmount: this.workloadForm.value.groupAmountCtrl ?? 0,
        groupForSemesterId: this.workloadForm.value.groupForSemesterCtrl ?? 0,
        comments: this.workloadForm.value.commentsCtrl ?? '',
        creditPointsPerGroup: this.workloadForm.value.cpForGroupCtrl ?? 0,
        workingMonths: 5
      };
      this.formSubmit.emit(request);
    } else {
      this._snackBar.open("Please fix the errors before submitting.", "Close", {duration: 5000});
    }
  }

  navigate(event: Event) {
    event.preventDefault();
  }

  // ----- Data fetching methods -----

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

  subscribeToChildEmitter(componentRef: any) {
    if (componentRef instanceof NewTeachingStaffComponent) {
      componentRef.emitTeachingStaff.subscribe((id: number) =>
        this.fetchAllTeachingStaff(() => {
          this.workloadForm.controls.tStaffCtrl.setValue(id);
        })
      );
    }
    if (componentRef instanceof NewCourseComponent) {
      componentRef.emitCourse.subscribe((id: number) =>
        this.fetchAllCourses(() => {
          this.workloadForm.controls.courseCtrl.setValue(id);
        })
      );
    }
    if (componentRef instanceof NewClassComponent) {
      componentRef.emitMyClass.subscribe((id: number) =>
        this.fetchAllClasses(() => {
          let prevValues = this.workloadForm.controls.myClassCtrl.value ?? [];
          this.workloadForm.controls.myClassCtrl.setValue([...prevValues, id]);
        })
      );
    }
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
}
