import {Component, computed, inject, OnInit, signal, ViewChild} from '@angular/core';
import {WorkloadService} from "../../../services/services";
import {NavigationEnd, Router, RouterLink, RouterOutlet} from "@angular/router";
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
import {ColumnFilterDialogComponent} from "./column-filter-dialog/column-filter-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {EnumTranslationService} from "../../../services/translation/EnumTranslationService";
import {MatSnackBar} from "@angular/material/snack-bar";
import {WorkloadSettingsResponse} from "../../../services/models/workload-settings-response";
import {MatOption, MatSelect} from "@angular/material/select";
import {AsyncPipe} from "@angular/common";




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
    MatSelect,
    MatOption,
    AsyncPipe,
  ],
  templateUrl: './workload-list.component.html',
  styleUrl: './workload-list.component.scss'
})
export class WorkloadListComponent implements OnInit {
  enumService = inject(EnumTranslationService);
  private readonly workloadService = inject(WorkloadService);
  private readonly router = inject(Router);
  private readonly columnSettingsService = inject(WorkloadListSettingsService);
  private readonly dialog = inject(MatDialog);
  private readonly _snackBar = inject(MatSnackBar);
  activeFilters: Map<string, {value: string, operator: string}> = new Map();
  availableSettings$ = this.columnSettingsService.availableSettings$;

  columnsToDisplay = computed(() =>
    this.columnSettingsService.listSettings()
      .filter(column => column.visible)
  );
  applySettings(setting: WorkloadSettingsResponse) {
    this.columnSettingsService.applySettings(setting);
    this.findAllWorkloads();
  }
  dataSource = new MatTableDataSource<WorkloadResponse>([]);
  workloadResponse?: WorkloadResponse[];
  isLoadingResults = true;
  clickedWorkloadRow = signal<WorkloadResponse | undefined>(undefined);
  @ViewChild(MatSort) sort!: MatSort;
  length: number | undefined = 50;
  pageSize = 5;
  pageIndex = 0;
  pages: any = [];
  pageSizeOptions = [5, 10, 50];
  sortColumn: Sort = {active: '', direction: ''};
  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.findAllWorkloads();
    this.setupFiltering();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.findAllWorkloads();
      }
    });
  }
  private findAllWorkloads() {
    // Convert the activeFilters Map to a JSON string
    let filtersJson: string | undefined;
    if (this.activeFilters.size > 0) {
      const filtersObject: Record<string, { value: string, operator: string }> = {};
      this.activeFilters.forEach((value, key) => {
        filtersObject[key] = value;
      });
      filtersJson = JSON.stringify(filtersObject);
    }

    this.workloadService.findAllWorkloads({
      page: this.pageIndex,
      size: this.pageSize,
      sort: this.sortColumn.active,
      direction: this.sortColumn.direction,
      filters: filtersJson
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

  getNestedProperty(obj: any, col: WorkloadColumnSettings, defaultValue: any = "") {
    if (col.collection.includes("columnsForWorkloadClasses")) {
      let result: string[] = [];
      let val = this.digInObject(obj, "myClasses");
      val.forEach(function(val: any) {
        result.push(val?.[col.pathTo]);
      });
      return result.join(', ');
    }

    const value = this.digInObject(obj, col.pathTo, defaultValue);
    if (col.pathTo === 'budgetPosition' && value) {
      return this.enumService.translate('budgetPosition', value);
    }

    return value;
  }
  digInObject(obj: any, key: string, defaultValue: any = "") {
    return key.split('.')
      .reduce((acc, part) => acc?.[part], obj) ?? defaultValue;
  }
  mapDisplayedColumns(): string[] {
    return this.columnsToDisplay().map(col => col.pathTo);
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
        (data.semester?.semesterName?.toLowerCase().includes(lowercaseFilter) ?? false) ||
        // Course-related filtering
        (data.course?.courseName?.toLowerCase().includes(lowercaseFilter) ?? false) ||
        (data.course?.courseCode?.toLowerCase().includes(lowercaseFilter) ?? false) ||
        (data.course?.registrationType?.toLowerCase().includes(lowercaseFilter) ?? false) ||
        (data.course?.section?.toLowerCase().includes(lowercaseFilter) ?? false) ||
        // Teaching Staff filtering
        (data.teachingStaff?.staffFullName?.toLowerCase().includes(lowercaseFilter) ?? false) ||
        (data.teachingStaff?.positionTitle?.toLowerCase().includes(lowercaseFilter) ?? false) ||
        (data.teachingStaff?.staffAcademicRank?.rankName?.toLowerCase().includes(lowercaseFilter) ?? false) ||
        (data.teachingStaff?.staffFaculty?.facultyName?.toLowerCase().includes(lowercaseFilter) ?? false) ||

        // Nested user filtering inside TeachingStaff
        (data.teachingStaff?.name?.toLowerCase().includes(lowercaseFilter) ?? false) ||
        (data.teachingStaff?.surname?.toLowerCase().includes(lowercaseFilter) ?? false) ||

        // Array of MyClasses filtering
        (data.myClasses?.some(myClass =>
          myClass.classLevel?.toString().includes(lowercaseFilter) ||
          myClass.classFaculty?.facultyName?.toLowerCase().includes(lowercaseFilter) ||
          myClass.myClassProgram?.toLowerCase().includes(lowercaseFilter)
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
    if(row.workloadId === this.clickedWorkloadRow()?.workloadId) {
      this.clickedWorkloadRow.set(undefined);
      return;
    }
    this.clickedWorkloadRow.set(row);
  }
  onEditWorkload(){
    this.router.navigate(['/main/workload/edit-workload', this.clickedWorkloadRow()?.workloadId]);
  }

  isClicked(row: WorkloadResponse):boolean {
    if(row.workloadId == this.clickedWorkloadRow()?.workloadId) {
      return true;
    }
    return false
  }
  openFilterDialog(event: MouseEvent, column: WorkloadColumnSettings): void {
    event.preventDefault();
    event.stopPropagation();

    const currentFilter = this.activeFilters.get(column.pathTo);

    const dialogRef = this.dialog.open(ColumnFilterDialogComponent, {
      width: '300px',
      data: {
        column: column,
        currentFilter: currentFilter?.value ?? '',
        currentOperator: currentFilter?.operator ?? 'contains'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.clear) {
          this.activeFilters.delete(result.column.pathTo);
        } else {
          this.activeFilters.set(result.column.pathTo, {
            value: result.value,
            operator: result.operator
          });
        }
        this.findAllWorkloads();
      }
    });
  }
  isColumnFiltered(columnPath: string): boolean {
    return this.activeFilters.has(columnPath);
  }

  onDeleteWorkload() {
    const id = this.clickedWorkloadRow()?.workloadId;
    if(id){
    this.workloadService.deleteWorkloadById({workloadId: id}).subscribe({
      next: workload => {
        if (workload) {
          this._snackBar.open("Dzēsts", "Aizvērt", { duration: 5000 });
          this.findAllWorkloads();
        }
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open(err.error.errorMsg, "Aizvērt", { duration: 5000 });
        this.router.navigate(['/main/workload'], { replaceUrl: true });
      }
    });
    }
    }

  isDeleted(element: any, col: WorkloadColumnSettings) {
    const path = col.pathTo;

    if (!path.includes('.')) {
      return false;
    }

    const parts = path.split('.');

    // Remove the last part to get the path to the parent object
    const parentPath = parts.slice(0, -1).join('.');
    // gets object
    const parentObject = this.digInObject(element, parentPath);

    return parentObject?.deleted ?? false;
  }
}
