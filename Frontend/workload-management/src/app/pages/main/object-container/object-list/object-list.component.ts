import {Component, inject, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseResponse } from "../../../../services/models/course-response";
import { MyClassResponse } from "../../../../services/models/my-class-response";
import { AcademicRankResponse } from "../../../../services/models/academic-rank-response";
import { StatusTypeResponse } from "../../../../services/models/status-type-response";
import { SemesterResponse } from "../../../../services/models/semester-response";
import { ColumnNames } from "../../new-objects/object-columns";
import { TeachingStaffResponse } from "../../../../services/models/teaching-staff-response";
import {AcademicRankDetailsResponse} from "../../../../services/models/academic-rank-details-response";
import {EnumTranslationService} from "../../../../services/translation/EnumTranslationService";

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
  @Input() displayedColumns?: ColumnNames[] = [];
  @Input() selectedTableType: string = 'teachingStaff';
  enumService = inject(EnumTranslationService)
  getDataItems(): any[] {
    switch (this.selectedTableType) {
      case 'teachingStaff': return this.tStaff || [];
      case 'courses': return this.courses || [];
      case 'classes': return this.myClasses || [];
      case 'academicRanks': return this.academicRanks || [];
      case 'academicRankDetails': return this.academicRankDetails || [];
      case 'statusTypes': return this.statusTypes || [];
      case 'semesters': return this.semesters || [];
      default: return [];
    }
  }
  ngOnChanges(){
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
}
