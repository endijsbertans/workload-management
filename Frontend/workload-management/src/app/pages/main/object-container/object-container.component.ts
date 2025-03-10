import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ObjectListComponent} from './object-list/object-list.component';
import {TeachingStaffResponse} from '../../../services/models/teaching-staff-response';
import {
  ColumnNames,
  ColumnsForTeacherResponse,
  ColumnsForCourseResponse,
  ColumnsForClassResponse,
  ColumnsForAcademicRankResponse,
  ColumnsForStatusTypeResponse,
  ColumnsForSemesterResponse, ColumnsForAcademicRankDetailsResponse, ColumnsForFacultyResponse
} from '../new-objects/object-columns';
import {Router, RouterOutlet} from '@angular/router';
import {TeachingStaffService} from "../../../services/services/teaching-staff.service";
import {CourseService} from "../../../services/services/course.service";
import {MyClassService} from "../../../services/services/my-class.service";
import {AcademicRankService} from "../../../services/services/academic-rank.service";
import {StatusTypeService} from "../../../services/services/status-type.service";
import {SemesterControllerService} from "../../../services/services/semester-controller.service";
import {CourseResponse} from '../../../services/models/course-response';
import {MyClassResponse} from '../../../services/models/my-class-response';
import {AcademicRankResponse} from '../../../services/models/academic-rank-response';
import {StatusTypeResponse} from '../../../services/models/status-type-response';
import {SemesterResponse} from '../../../services/models/semester-response';
import {AcademicRankDetailsService} from "../../../services/services/academic-rank-details.service";
import {AcademicRankDetailsResponse} from "../../../services/models/academic-rank-details-response";
import {FacultyResponse} from "../../../services/models/faculty-response";
import {FacultyService} from "../../../services/services/faculty.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-object-container',
  imports: [CommonModule, FormsModule, ObjectListComponent, RouterOutlet],
  templateUrl: './object-container.component.html',
  standalone: true,
  styleUrl: './object-container.component.scss'
})
export class ObjectContainerComponent implements OnInit {
  private readonly teachingStaffService = inject(TeachingStaffService);
  private readonly courseService = inject(CourseService);
  private readonly facultyService = inject(FacultyService);
  private readonly myClassService = inject(MyClassService);
  private readonly academicRankService = inject(AcademicRankService);
  private readonly academicRankDetailsService = inject(AcademicRankDetailsService);
  private readonly statusTypeService = inject(StatusTypeService);
  private readonly semesterService = inject(SemesterControllerService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly _snackBar = inject(MatSnackBar);

  tStaff = signal<TeachingStaffResponse[] | undefined>(undefined);
  courses = signal<CourseResponse[] | undefined>(undefined);
  myClasses = signal<MyClassResponse[] | undefined>(undefined);
  academicRanks = signal<AcademicRankResponse[] | undefined>(undefined);
  academicRankDetails = signal<AcademicRankDetailsResponse[] | undefined>(undefined);
  statusTypes = signal<StatusTypeResponse[] | undefined>(undefined);
  semesters = signal<SemesterResponse[] | undefined>(undefined);
  displayedColumns = signal<ColumnNames[] | undefined>(undefined);
  isLoading = signal<boolean>(false);
  faculties = signal<FacultyResponse[] | undefined>(undefined);

  tableTypes = [
    {id: 'teachingStaff', name: 'Docenti'},
    {id: 'courses', name: 'Studiju priekšmeti'},
    {id: 'classes', name: 'Kurss'},
    {id: 'academicRanks', name: 'Amatu grupas'},
    {id: 'academicRankDetails', name: 'Amatu grupu detaļas'},
    {id: 'statusTypes', name: 'Statusi'},
    {id: 'semesters', name: 'Semestri'},
    {id: 'faculties', name: 'Fakultātes'}
  ];
  selectedTableType: string = 'teachingStaff';

  ngOnInit() {
    this.loadTableData();
  }

  onTableTypeChange() {
    this.loadTableData();
  }

  loadTableData() {
    this.resetDisplayData();
    this.isLoading.set(true);

    switch (this.selectedTableType) {
      case 'teachingStaff':
        this.fetchAllTeachingStaff();
        this.displayedColumns.set([...ColumnsForTeacherResponse]);
        break;
      case 'courses':
        this.fetchAllCourses();
        this.displayedColumns.set([...ColumnsForCourseResponse]);
        break;
      case 'classes':
        this.fetchAllClasses();
        this.displayedColumns.set([...ColumnsForClassResponse]);
        break;
      case 'academicRanks':
        this.fetchAllAcademicRanks();
        this.displayedColumns.set([...ColumnsForAcademicRankResponse]);
        break;
      case 'academicRankDetails':
        this.fetchAllAcademicRankDetails();
        this.displayedColumns.set([...ColumnsForAcademicRankDetailsResponse]);
        break;
      case 'statusTypes':
        this.fetchAllStatusTypes();
        this.displayedColumns.set([...ColumnsForStatusTypeResponse]);
        break;
      case 'semesters':
        this.fetchAllSemesters();
        this.displayedColumns.set([...ColumnsForSemesterResponse]);
        break;
      case 'faculties':
        this.fetchAllFaculties();
        this.displayedColumns.set([...ColumnsForFacultyResponse]);
        break;
    }
  }

  resetDisplayData() {
    this.tStaff.set(undefined);
    this.courses.set(undefined);
    this.myClasses.set(undefined);
    this.academicRanks.set(undefined);
    this.statusTypes.set(undefined);
    this.semesters.set(undefined);
    this.academicRankDetails.set(undefined);
  }

  createNewObject() {
    switch (this.selectedTableType) {
      case 'teachingStaff':
        this.router.navigate(['/main/objects/new-teaching-staff']);
        break;
      case 'courses':
        this.router.navigate(['/main/objects/new-course']);
        break;
      case 'classes':
        this.router.navigate(['/main/objects/new-class']);
        break;
      case 'academicRanks':
        this.router.navigate(['/main/objects/new-academic-rank']);
        break;
      case 'academicRankDetails':
        this.router.navigate(['/main/objects/new-academic-rank-details']);
        break;
      case 'statusTypes':
        this.router.navigate(['/main/objects/new-status-type']);
        break;
      case 'semesters':
        this.router.navigate(['/main/objects/new-semester']);
        break;
    }
  }
  private fetchAllFaculties(): void {
    this.facultyService.findAllFaculties().subscribe({
      next: (data) => {
        this.faculties.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load faculties', err);
        this._snackBar.open('Kļūda lādējot fakultātes', 'Aizvērt', { duration: 5000 });
        this.isLoading.set(false);
      }
    });
  }
  private fetchAllTeachingStaff() {
    const subscription = this.teachingStaffService.findAllTeachingStaff().subscribe({
      next: (data) => {
        this.tStaff.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this._snackBar.open('Kļūda lādējot docentus', 'Aizvērt', { duration: 5000 });
        this.isLoading.set(false);
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  private fetchAllCourses() {
    const subscription = this.courseService.findAllCourses().subscribe({
      next: (data) => {
        this.courses.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
        this._snackBar.open('Kļūda lādējot studiju programmas', 'Aizvērt', { duration: 5000 });
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  private fetchAllClasses() {
    const subscription = this.myClassService.findAllMyClass().subscribe({
      next: (data) => {
        this.myClasses.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
        this._snackBar.open('Kļūda lādējot kursus', 'Aizvērt', { duration: 5000 });
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  private fetchAllAcademicRanks() {
    const subscription = this.academicRankService.findAllAcademicRank().subscribe({
      next: (data) => {
        this.academicRanks.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
        this._snackBar.open('Kļūda lādējot amatu grupas', 'Aizvērt', { duration: 5000 });
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
  private fetchAllAcademicRankDetails() {
    const subscription = this.academicRankDetailsService.findAllAcademicRankDetails().subscribe({
      next: (data) => {
        this.academicRankDetails.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
        this._snackBar.open('Kļūda lādējot amatu grupu detaļas', 'Aizvērt', { duration: 5000 });
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
  private fetchAllStatusTypes() {
    const subscription = this.statusTypeService.findAllStatusTypes().subscribe({
      next: (data) => {
        this.statusTypes.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
        this._snackBar.open('Kļūda lādējot statusus', 'Aizvērt', { duration: 5000 });
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  private fetchAllSemesters() {
    const subscription = this.semesterService.findAllSemesters().subscribe({
      next: (data) => {
        this.semesters.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
        this._snackBar.open('Kļūda lādējot semestrus', 'Aizvērt', { duration: 5000 });
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
