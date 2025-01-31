import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {WorkloadService} from "../../services/services";
import {Router} from "@angular/router";
import {PageResponseWorkloadResponse} from "../../services/models/page-response-workload-response";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {WorkloadResponse} from "../../services/models/workload-response";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-workload-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule
  ],
  templateUrl: './workload-list.component.html',
  styleUrl: './workload-list.component.scss'
})
export class WorkloadListComponent implements OnInit, AfterViewInit{
  private readonly workloadService = inject(WorkloadService);
  private readonly router = inject(Router);
  workloadPageResponse: PageResponseWorkloadResponse = {};
  dataSource = new MatTableDataSource<WorkloadResponse>([]);
  workloadResponse?: WorkloadResponse[];
  columnsToDisplay = ['semester','course.courseName',"teachingStaff.user.name"];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public page = 0;
  public size = 10;
  ngOnInit(){
    this.findAllWorkloads();
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
    let name = key.split('.')
        .reduce((acc, part) => acc?.[part], obj) ?? defaultValue;

    return name;
  }

}
