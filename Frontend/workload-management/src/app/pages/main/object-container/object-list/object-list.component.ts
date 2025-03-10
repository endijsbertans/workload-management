import {Component, inject, Input} from '@angular/core';
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
}
