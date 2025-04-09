import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CourseResponse} from "../../../../services/models/course-response";
import {MyClassResponse} from "../../../../services/models/my-class-response";
import {AcademicRankResponse} from "../../../../services/models/academic-rank-response";
import {StatusTypeResponse} from "../../../../services/models/status-type-response";
import {SemesterResponse} from "../../../../services/models/semester-response";
import {ColumnNames} from "../../new-objects/object-columns";
import {TeachingStaffResponse} from "../../../../services/models/teaching-staff-response";
import {AcademicRankDetailsResponse} from "../../../../services/models/academic-rank-details-response";
import {EnumTranslationService} from "../../../../services/translation/EnumTranslationService";
import {Router} from "@angular/router";

import {FacultyResponse} from "../../../../services/models/faculty-response";
import {
  AcademicRankDetailsService,
  AcademicRankService, CourseService,
  FacultyService,
  MyClassService, SemesterControllerService, StatusTypeService, TeachingStaffService
} from "../../../../services/services";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-object-list',
  imports: [CommonModule],
  templateUrl: './object-list.component.html',
  standalone: true,
  styleUrl: './object-list.component.scss'
})
export class ObjectListComponent {
  @Input() tStaff?: TeachingStaffResponse[];
  @Input() courses?: CourseResponse[];
  @Input() myClasses?: MyClassResponse[];
  @Input() academicRanks?: AcademicRankResponse[];
  @Input() academicRankDetails?: AcademicRankDetailsResponse[];
  @Input() statusTypes?: StatusTypeResponse[];
  @Input() semesters?: SemesterResponse[];
  @Input() faculties?: FacultyResponse[];
  @Input() displayedColumns?: ColumnNames[] = [];
  @Input() selectedTableType: string = 'teachingStaff';
  @Output() refreshData = new EventEmitter<void>();
  private readonly facultyService = inject(FacultyService);
  private readonly academicRankService = inject(AcademicRankService);
  private readonly academicRankDetailsService = inject(AcademicRankDetailsService);
  private readonly myClassService = inject(MyClassService);
  private readonly teachingStaffService = inject(TeachingStaffService);
  private readonly coursesService = inject(CourseService);
  private readonly statusTypesService = inject(StatusTypeService);
  private readonly semesterService = inject(SemesterControllerService);
  private readonly _snackBar = inject(MatSnackBar);
  enumService = inject(EnumTranslationService)
  private router = inject(Router);

  getDataItems(): any[] {
    switch (this.selectedTableType) {
      case 'teachingStaff':
        return this.tStaff || [];
      case 'courses':
        return this.courses || [];
      case 'classes':
        return this.myClasses || [];
      case 'academicRanks':
        return this.academicRanks || [];
      case 'academicRankDetails':
        return this.academicRankDetails || [];
      case 'statusTypes':
        return this.statusTypes || [];
      case 'semesters':
        return this.semesters || [];
      case 'faculties':
        return this.faculties || [];
      default:
        return [];
    }
  }

  ngOnChanges() {
    console.log(this.getDataItems());
  }

  getNestedPropertyForItem(item: any, column: ColumnNames, defaultValue: any = "") {
    const value = this.digInObject(item, column.pathTo, defaultValue);

    // Check if this is a degree field and translate it
    if (column.pathTo === 'degree' && value) {
      return this.enumService.translate('degree', value);
    }

    return value;
  }

  formatPropertyValue(item: any, column: ColumnNames, defaultValue: any = "") {
    const value = this.getNestedPropertyForItem(item, column, defaultValue);

    if (column.pathTo === 'admin') {
      return value === true ? 'Administrators' : 'Lietotājs';
    }

    if (typeof value === 'boolean') {
      return value ? 'Jā' : 'Nē';
    }

    return value;
  }

  isAdmin(item: any): boolean {
    if (this.selectedTableType === 'teachingStaff') {
      return item.admin === true;
    }
    return false;
  }

  digInObject(obj: any, path: string, defaultValue: any = "") {

    if (!obj || !path) return defaultValue;
    return path.split('.')
      .reduce((acc, part) => acc && acc[part] !== undefined ? acc[part] : defaultValue, obj);
  }

  editRow(clickedRow: any) {
    const route = this.getEditRoute(clickedRow);
    if (route) {
      this.router.navigate([route]);
    }
  }

  private getEditRoute(item: any): string | null {
    switch (this.selectedTableType) {
      case 'teachingStaff':
        return `/main/objects/edit-teaching-staff/${item.teachingStaffId}`;
      case 'courses':
        return `/main/objects/edit-course/${item.courseId}`;
      case 'classes':
        return `/main/objects/edit-my-class/${item.classId}`;
      case 'academicRanks':
        return `/main/objects/edit-academic-rank/${item.academicRankId}`;
      case 'academicRankDetails':
        return `/main/objects/edit-academic-rank-details/${item.academicRankDetailsId}`;
      case 'statusTypes':
        return `/main/objects/edit-status-type/${item.statusTypeId}`;
      case 'semesters':
        return `/main/objects/edit-semester/${item.semesterId}`;
      case 'faculties':
        return `/main/objects/edit-faculties/${item.facultyId}`;
      default:
        return null;
    }
  }

  deleteRow(item: any): void {
    const confirmDelete = window.confirm('Vai tiešām vēlaties dzēst šo ierakstu?');

    if (!confirmDelete) {
      return;
    }
    const id = this.getItemId(item);

    if (!id) {
      this._snackBar.open("Neizdevās atrast ieraksta ID", "Aizvērt", { duration: 5000 });
      return;
    }
    let deleteOperation;

    switch(this.selectedTableType) {
      case 'faculties':
        deleteOperation = this.facultyService.deleteFacultyIdById({ facultyId: id });
        break;
      case 'academicRanks':
        deleteOperation = this.academicRankService.deleteAcademicRankById({ academicRankId: id });
        break;
      case 'academicRankDetails':
        deleteOperation = this.academicRankDetailsService.deleteAcademicRankDetailsById({ academicRankDetailsId: id });
        break;
      case 'classes':
        deleteOperation = this.myClassService.deleteMyClassById({ myClassId: id });
        break;
      case 'teachingStaff':
        deleteOperation = this.teachingStaffService.deleteTeachingStaffById({ tStaffId: id });
        break;
      case 'courses':
        deleteOperation = this.coursesService.deleteCourseById({courseId: id}) ;
        break;
      case 'statusTypes':
          deleteOperation = this.statusTypesService.deleteStatusTypeById({statusTypeId: id});
        break;
      case 'semesters':
        deleteOperation = this.semesterService.deleteSemesterById({semesterId: id});
        break;
      default:
        this._snackBar.open(`Dzēšana nav implementēta šim objekta tipam: ${this.selectedTableType}`, "Aizvērt", { duration: 5000 });
        return;
    }

    if (deleteOperation) {
      deleteOperation.subscribe({
        next: () => {
          this._snackBar.open("Ieraksts dzēsts veiksmīgi", "Aizvērt", { duration: 5000 });
          this.refreshData.emit();
        },
        error: (err) => {
          console.error('Error deleting item:', err);
          this._snackBar.open(
            err.error?.errorMsg || "Kļūda dzēšot ierakstu",
            "Aizvērt",
            { duration: 5000 }
          );
        }
      });
    }
  }

  private getItemId(item: any): number | undefined {
    switch(this.selectedTableType) {
      case 'faculties':
        return item.facultyId;
      case 'academicRanks':
        return item.academicRankId;
      case 'academicRankDetails':
        return item.academicRankDetailsId;
      case 'classes':
        return item.classId;
      case 'teachingStaff':
        return item.teachingStaffId;
      case 'courses':
        return item.courseId;
      case 'statusTypes':
        return item.statusTypeId;
      case 'semesters':
        return item.semesterId;
      default:
        return undefined;
    }
  }
}
