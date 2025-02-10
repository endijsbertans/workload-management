import {AfterViewInit, Component, inject, OnInit, signal, ViewChild} from '@angular/core';
import {WorkloadService} from "../../../services/services";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {WorkloadResponse} from "../../../services/models/workload-response";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {
  CollapseData,
  ColumnNames, ColumnsForActions,
  ColumnsForCalc,
  ColumnsForCourse,
  ColumnsForGeneralInfo, ColumnsForSalary,
  ColumnsForTeacher
} from "./workload-list-columns";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatFormField} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {component} from "@igniteui/angular-schematics/src/component";
import {NewTeachingStaffComponent} from "../new-objects/new-teaching-staff/new-teaching-staff.component";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-workload-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatIcon,
    MatIconButton,
    MatTooltip,
    MatFormField,
    MatInputModule,
    RouterLink,
    MatButton,
    RouterOutlet,
  ],
  templateUrl: './workload-list.component.html',
  styleUrl: './workload-list.component.scss'
})
export class WorkloadListComponent implements OnInit, AfterViewInit {
  private readonly workloadService = inject(WorkloadService);
  private readonly router = inject(Router);
  dataSource = new MatTableDataSource<WorkloadResponse>([]);
  workloadResponse?: WorkloadResponse[];
  columnsToDisplay?: ColumnNames[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isAddingWorkload = false;
  public page = 0;
  public size = 10;
  columnsForTeacher = signal(true);
  columnsForCourse = signal(true);
  columnsForCalc = signal(true);
  columnsForGeneralInfo = signal(true);
  columnsForSalary = signal(true);

  ngOnInit() {
    this.findAllWorkloads();
    this.setupFiltering();
    this.columnsToDisplay = this.displayedColumns();
    console.log(this.columnsToDisplay);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private findAllWorkloads() {
    this.workloadService.findAllWorkloads({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (workloads) => {
        if (workloads.content) {
          this.dataSource.data = workloads.content;
          console.log(this.dataSource.data);
        }
        this.workloadResponse = workloads.content;
      }
    });
  }

  getNestedProperty(obj: any, key: string, defaultValue: any = "") {
    if (key == "myClasses") {
      let result: string[] = [];
      let val = this.digInObject(obj, key);
      val.forEach(function (val: any) {
        result.push(val.className);
      });
      return result.join(', ');
    }
    return this.digInObject(obj, key);
  }

  digInObject(obj: any, key: string, defaultValue: any = "") {
    return key.split('.')
      .reduce((acc, part) => acc?.[part], obj) ?? defaultValue;

  }

  mapDisplayedColumns(): string[] {
    return this.displayedColumns().map(col => col.pathTo);

  }

  displayedColumns(): ColumnNames[] {
    let columns: ColumnNames[] = [];
    columns.push(...ColumnsForActions);
    if (this.columnsForTeacher()) columns.push(...ColumnsForTeacher);
    else {
      columns.push(
        CollapseData[0]
      );
    }
    if (this.columnsForCourse()) columns.push(...ColumnsForCourse);
    else {
      columns.push(
        CollapseData[1]
      );
    }
    if (this.columnsForCalc()) columns.push(...ColumnsForCalc);
    else {
      columns.push(
        CollapseData[2]
      );
    }
    if (this.columnsForGeneralInfo()) columns.push(...ColumnsForGeneralInfo);
    if (this.columnsForSalary()) columns.push(...ColumnsForSalary);
    else {
      columns.push(
        CollapseData[3]
      );
    }
    return columns;
  }

  classExpression(collection: string) {
    switch (collection) {
      case 'ColumnsForTeacher':
        return 'teacher-header';
      case 'ColumnsForCourse':
        return 'course-header';
      case 'ColumnsForCalc':
        return 'calc-header';
      case 'ColumnsForSalary':
        return 'salary-header';
      case 'ColumnsForGeneralInfo':
        return 'general-header';
      default:
        return '';
    }
  }

  clickEvent(event: MouseEvent, name: string) {
    event.preventDefault();
    event.stopPropagation();

    switch (name) {
      case 'ColumnsForTeacher':
        this.columnsForTeacher.set(!this.columnsForTeacher());
        break;
      case 'ColumnsForCourse':
        this.columnsForCourse.set(!this.columnsForCourse());
        break;
      case 'ColumnsForCalc':
        this.columnsForCalc.set(!this.columnsForCalc());
        break;

      case 'ColumnsForSalary':
        this.columnsForSalary.set(!this.columnsForSalary());
        break;
    }
    this.displayedColumns();
  }

  onCancelAddWorkload() {
    this.isAddingWorkload = false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(this.dataSource);
    if (this.workloadResponse) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  setupFiltering() {
    this.dataSource.filterPredicate = (data: WorkloadResponse, filter: string) => {
      const lowercaseFilter = filter.trim().toLowerCase();

      return (
        // Top-level properties
        (data.comments?.toLowerCase().includes(lowercaseFilter) ?? false) ||
        (data.program?.toLowerCase().includes(lowercaseFilter) ?? false) ||
        (data.semester?.toLowerCase().includes(lowercaseFilter) ?? false) ||
        // Course-related filtering
        (data.course?.courseName?.toLowerCase().includes(lowercaseFilter) ?? false) ||
        (data.course?.courseCode?.toLowerCase().includes(lowercaseFilter) ?? false) ||
        (data.course?.registrationType?.toLowerCase().includes(lowercaseFilter) ?? false) ||
        (data.course?.section?.toLowerCase().includes(lowercaseFilter) ?? false) ||
        (data.course?.necessaryRank?.rankName?.toLowerCase().includes(lowercaseFilter) ?? false) ||

        // Teaching Staff filtering
        (data.teachingStaff?.staffFullName?.toLowerCase().includes(lowercaseFilter) ?? false) ||
        (data.teachingStaff?.positionTitle?.toLowerCase().includes(lowercaseFilter) ?? false) ||
        (data.teachingStaff?.staffAcademicRank?.rankName?.toLowerCase().includes(lowercaseFilter) ?? false) ||
        (data.teachingStaff?.staffFaculty?.facultyName?.toLowerCase().includes(lowercaseFilter) ?? false) ||

        // Nested user filtering inside TeachingStaff
        (data.teachingStaff?.name?.toLowerCase().includes(lowercaseFilter) ?? false) ||
        (data.teachingStaff?.surname?.toLowerCase().includes(lowercaseFilter) ?? false) ||

        // Status Type filtering
        (data.statusType?.statusTypeName?.toLowerCase().includes(lowercaseFilter) ?? false) ||

        // Array of MyClasses filtering
        (data.myClasses?.some(myClass =>
          myClass.className?.toLowerCase().includes(lowercaseFilter) ||
          myClass.classFaculty?.facultyName?.toLowerCase().includes(lowercaseFilter) ||
          myClass.classYear?.toLowerCase().includes(lowercaseFilter)
        ) ?? false)
      );
    };
  }

}
