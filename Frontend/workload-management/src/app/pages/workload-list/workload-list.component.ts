import {AfterViewInit, Component, inject, OnInit, signal, ViewChild} from '@angular/core';
import {WorkloadService} from "../../services/services";
import {Router} from "@angular/router";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {WorkloadResponse} from "../../services/models/workload-response";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {
  ColumnNames,
  ColumnsForCalc,
  ColumnsForCourse,
  ColumnsForGeneralInfo, ColumnsForSalary,
  ColumnsForTeacher
} from "./workload-list-columns";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatSuffix} from "@angular/material/form-field";

@Component({
  selector: 'app-workload-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatIcon,
    MatIconButton,
    MatSuffix
  ],
  templateUrl: './workload-list.component.html',
  styleUrl: './workload-list.component.scss'
})
export class WorkloadListComponent implements OnInit, AfterViewInit{
  private readonly workloadService = inject(WorkloadService);
  private readonly router = inject(Router);
  dataSource = new MatTableDataSource<WorkloadResponse>([]);
  workloadResponse?: WorkloadResponse[];
  columnsToDisplay?: ColumnNames[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public page = 0;
  public size = 10;
  columnsForTeacher= signal(true);
  columnsForCourse = signal(true);
  columnsForCalc = signal(true);
  columnsForGeneralInfo = signal(true);
  columnsForSalary = signal(true);


  clickEvent(event: MouseEvent, name: string) {
    if(name == 'ColumnsForTeacher')this.columnsForTeacher.set(!this.columnsForTeacher());
    if(name == 'ColumnsForCourse')this.columnsForCourse.set(!this.columnsForCourse());
    if(name == 'ColumnsForCalc')this.columnsForCalc.set(!this.columnsForCalc());
    if(name == 'ColumnsForGeneralInfo')this.columnsForGeneralInfo.set(!this.columnsForGeneralInfo());
    if(name == 'ColumnsForSalary')this.columnsForSalary.set(!this.columnsForSalary());

    event.preventDefault();
    event.stopPropagation();
    this.displayedColumns()
  }
  ngOnInit(){
    this.findAllWorkloads();
    this.columnsToDisplay = this.displayedColumns();
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
    if(key == "myClasses"){
      let result: string[] = [];
      let val = this.digInObject(obj, key);
      val.forEach(function(val: any){
        result.push(val.className);
      });
      return result.join(', ');
    }
    return this.digInObject(obj, key);
  }
  digInObject(obj: any, key: string, defaultValue: any = ""){
    return key.split('.')
      .reduce((acc, part) => acc?.[part], obj) ?? defaultValue;

  }
  mapDisplayedColumns():string[]{
    return this.displayedColumns().map(col => col.pathTo);

  }
  displayedColumns(): ColumnNames[] {
    let columns: ColumnNames[] = [];
    if (this.columnsForTeacher()) columns.push(...ColumnsForTeacher);
    else{
      const fallbackColumn = ColumnsForTeacher.at(0);
      if (fallbackColumn) columns.push(fallbackColumn);
    }
    if (this.columnsForCourse()) columns.push(...ColumnsForCourse);
    if (this.columnsForCalc()) columns.push(...ColumnsForCalc);
    if (this.columnsForGeneralInfo()) columns.push(...ColumnsForGeneralInfo);
    if (this.columnsForSalary()) columns.push(...ColumnsForSalary);
    return columns;
  }



}
