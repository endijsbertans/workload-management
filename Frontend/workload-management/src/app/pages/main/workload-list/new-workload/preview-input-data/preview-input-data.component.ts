import {Component, Input} from "@angular/core";
import {TeachingStaffResponse} from "../../../../../services/models/teaching-staff-response";
import {CourseResponse} from "../../../../../services/models/course-response";
import {MyClassResponse} from "../../../../../services/models/my-class-response";
import {AcademicRankResponse} from "../../../../../services/models/academic-rank-response";
import {StatusTypeResponse} from "../../../../../services/models/status-type-response";
import {ColumnNames} from "../../../new-objects/object-columns";

@Component({
  selector: 'app-preview-input-data',
  standalone: true,
  templateUrl: './preview-input-data.component.html',
  styleUrls: ['./preview-input-data.component.scss'],
  imports: []
})
export class PreviewInputDataComponent {
  @Input() tStaff?: TeachingStaffResponse;
  @Input() courses?: CourseResponse;
  @Input() myClasses?: MyClassResponse[];
  @Input() academicRank?: AcademicRankResponse;
  @Input() statusType?: StatusTypeResponse;
  @Input() displayedColumns?: ColumnNames[] = [];


  get compositeData() {
    return {
      teachingStaff: this.tStaff,
      course: this.courses,
      myClasses: this.myClasses,
      academicRank: this.academicRank,
      statusType: this.statusType,
    };
  }

  getNestedProperty(columns: ColumnNames, defaultValue: any = "") {
    if (columns.collection == "ColumnsForClass") {
      let result: string[] = [];
      let val = this.digInObject(this.compositeData, "myClasses");
      if(val) {
        val.forEach(function (val: any) {
          result.push(val?.[columns.pathTo]);
        });
        return result.join(', ');
      }
    }
    return this.digInObject(this.compositeData, columns.pathTo);
  }

  digInObject(obj: any, key: string, defaultValue: any = "") {
    return key.split('.')
      .reduce((acc, part) => acc?.[part], obj) ?? defaultValue;
  }
}

