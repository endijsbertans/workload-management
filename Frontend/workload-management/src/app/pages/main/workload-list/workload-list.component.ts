import {Component, computed, inject, OnInit, signal, ViewChild} from '@angular/core';
import {WorkloadService} from "../../../services/services";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {WorkloadResponse} from "../../../services/models/workload-response";
import {MatSort, MatSortModule, Sort} from "@angular/material/sort";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatFormField} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {WorkloadListSettingsComponent} from "./workload-list-settings/workload-list-settings.component";
import {WorkloadListSettingsService} from "./workload-list-settings/workload-list-settings-service";
import {ShownColumns, WorkloadColumnSettings} from "./workload-list-columns";



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
    MatPaginator,
    MatProgressSpinner,
    WorkloadListSettingsComponent,
  ],
  templateUrl: './workload-list.component.html',
  styleUrl: './workload-list.component.scss'
})
export class WorkloadListComponent implements OnInit {
  private readonly workloadService = inject(WorkloadService);
  private readonly router = inject(Router);
  private readonly columnSettingsService = inject(WorkloadListSettingsService);
  columnsToDisplay? = computed(() => {
    return this.columnSettingsService.getSettings().filter((column) => column.visible) ?? []
  });
  dataSource = new MatTableDataSource<WorkloadResponse>([]);
  workloadResponse?: WorkloadResponse[];
  isLoadingResults = true;
  clickedWorkloadRow?: WorkloadResponse;
  @ViewChild(MatSort) sort!: MatSort;
  length: number | undefined = 50;
  pageSize = 10;
  pageIndex = 0;
  pages: any = [];
  pageSizeOptions = [10, 25, 50];
  sortColumn: Sort = {active: '', direction: ''};
  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.findAllWorkloads();
    this.setupFiltering();
  }
  private findAllWorkloads() {
    this.workloadService.findAllWorkloads({
      page: this.pageIndex,
      size: this.pageSize,
      sort: this.sortColumn.active,
      direction: this.sortColumn.direction
    }).subscribe({
      next: (workloads) => {
        this.isLoadingResults = true;
        if (workloads.content) {
          this.dataSource.data = workloads.content;
          this.pages = Array(workloads.totalPages)
            .fill(0)
            .map((x, i) => i);
          this.length = workloads.totalElements;
          console.log(this.pages);
        }
        this.workloadResponse = workloads.content;
        console.log(this.workloadResponse);
      },
      complete: () => {
        this.isLoadingResults = false;
      }
    });
  }

  getNestedProperty(obj: any, col: WorkloadColumnSettings) {
    if (col.collection.includes("columnsForWorkloadClasses")) {
      let result: string[] = [];
      let val = this.digInObject(obj, "myClasses");
      val.forEach(function (val: any) {
          result.push(val?.[col.pathTo]);
      });
      return result.join(', ');
    }
    return this.digInObject(obj, col.pathTo);
  }
  digInObject(obj: any, key: string, defaultValue: any = "") {
    return key.split('.')
      .reduce((acc, part) => acc?.[part], obj) ?? defaultValue;
  }
  mapDisplayedColumns(): string[] {
    if (this.columnsToDisplay) {
      return this.columnsToDisplay().map(col => col.pathTo);
    }
    return [];
  }
  clickEvent(event: MouseEvent, name: string) {
    event.preventDefault();
    event.stopPropagation();
    this.columnSettingsService.hideWorkloadGroup(name as keyof ShownColumns);
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
        (data.semester?.semesterName?.toLowerCase().includes(lowercaseFilter) ?? false) ||
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
  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.findAllWorkloads();
  }
  announceSortChange(e: Sort) {
    this.sortColumn = e;
    this.findAllWorkloads();
  }

  clickedRow(row: WorkloadResponse) {
    this.clickedWorkloadRow = row;
    this.router.navigate(['/main/workload/edit-workload', row.workloadId]);

  }

  isClicked(row: WorkloadResponse):boolean {
    if(row.workloadId == this.clickedWorkloadRow?.workloadId) {
      return true;
    }
    return false
  }
}
