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
import {WorkloadListSettingsService} from "./workload-list-settings/workload-list-settings-service";
import {WorkloadColumnSettings} from "./workload-list-columns";
import {ColumnFilterDialogComponent} from "./column-filter-dialog/column-filter-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {EnumTranslationService} from "../../../services/translation/EnumTranslationService";
import {MatSnackBar} from "@angular/material/snack-bar";
import {WorkloadSettingsResponse} from "../../../services/models/workload-settings-response";
import {MatOption, MatSelect} from "@angular/material/select";
import {AsyncPipe} from "@angular/common";
import {TokenService} from "../../../services/token/token.service";
import {BehaviorSubject} from "rxjs";
import {SemesterControllerService} from "../../../services/services/semester-controller.service";
import {SemesterResponse} from "../../../services/models/semester-response";




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
  private readonly tokenService = inject(TokenService);
  isAdmin = signal(this.tokenService.isAdmin());

  enumService = inject(EnumTranslationService);
  private readonly workloadService = inject(WorkloadService);
  private readonly semesterService = inject(SemesterControllerService);
  private readonly router = inject(Router);
  public readonly columnSettingsService = inject(WorkloadListSettingsService);
  private readonly dialog = inject(MatDialog);
  private readonly _snackBar = inject(MatSnackBar);
  activeFilters: Map<string, {value: string, operator: string}> = new Map();

  // Semester filter
  semesters$ = new BehaviorSubject<SemesterResponse[]>([]);
  selectedSemester = signal<SemesterResponse | null>(null);
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
  //totals row logic
  totalsRow = new BehaviorSubject<any>({});
  showTotals = signal<boolean>(true);
  sumColumns: string[] = [
    'groupAmount', 'contactHours', 'creditPointsPerGroup', 'totalCreditPoints',
    'expectedSalary', 'salaryPerMonth', 'monthSum', 'cpProportionOnFullTime'
  ];
  averageColumns: string[] = [
    'industryCoefficient', 'programCoefficient', 'vacationMonths'
  ];
  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.setupFiltering();

    this.loadSemesters();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.findAllWorkloads();
      }
    });
  }
  private loadSemesters() {
    this.semesterService.findAllSemesters().subscribe({
      next: (semesters) => {
        this.semesters$.next(semesters);

        if (semesters.length > 0) {
          const currentYear = new Date().getFullYear();

          // Try to find current year's semester
          const currentYearSemester = semesters.find(s => s.year === currentYear);

          if (currentYearSemester) {
            this.selectedSemester.set(currentYearSemester);
          } else {
            // Otherwise, select the most recent semester
            const sortedSemesters = [...semesters].sort((a, b) => (b.year || 0) - (a.year || 0));
            this.selectedSemester.set(sortedSemesters[0]);
          }
          this.findAllWorkloads();
        }
      },
      error: (err) => {
        console.error('Error loading semesters:', err);
        this._snackBar.open('Failed to load semesters', 'Close', { duration: 5000 });
      }
    });
  }

  onSemesterChange(semester: SemesterResponse) {
    this.selectedSemester.set(semester);
    this.findAllWorkloads();
  }

  private findAllWorkloads() {
    let filtersJson: string | undefined;
    const filtersObject: Record<string, { value: string, operator: string }> = {};

    // Add active filters
    this.activeFilters.forEach((value, key) => {
      filtersObject[key] = value;
    });

    // Add semester filter if selected
    if (this.selectedSemester()) {
      filtersObject['semester.semesterId'] = {
        value: this.selectedSemester()?.semesterId?.toString() || '',
        operator: 'equals'
      };
    }

    // Only create JSON if we have filters
    if (Object.keys(filtersObject).length > 0) {
      filtersJson = JSON.stringify(filtersObject);
    }
    if (this.router.url.includes('admin-workload')) {
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
          this.calculateTotals();
        },
        complete: () => {
          this.isLoadingResults = false;
        }
      });
    } else {
      this.workloadService.findAllMyWorkloads({
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
          this.calculateTotals();
        },
        complete: () => {
          this.isLoadingResults = false;
        }
      });
    }
  }


  getNestedProperty(obj: any, col: WorkloadColumnSettings, defaultValue: any = "") {
    if (col.collection.includes("columnsForWorkloadClasses")) {
      let result: string[] = [];
      let val = this.digInObject(obj, "myClasses");

      if (Array.isArray(val)) {
        val.forEach(function(val: any) {
          result.push(val?.[col.pathTo]);
        });
        return result.join(', ');
      }

      if (this.isTotalsRow(obj)) {
        return '';
      }

      return defaultValue;
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
          myClass.classProgram?.toLowerCase().includes(lowercaseFilter)
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
    this.router.navigate(['/main/admin-workload/edit-workload', this.clickedWorkloadRow()?.workloadId]);
  }

  isClicked(row: WorkloadResponse):boolean {
    return row.workloadId == this.clickedWorkloadRow()?.workloadId;

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
        this.router.navigate(['/main/admin-workload'], { replaceUrl: true });
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

    const parentPath = parts.slice(0, -1).join('.');
    const parentObject = this.digInObject(element, parentPath);

    return parentObject?.deleted ?? false;
  }

  /**
   * Calculates totals for numeric columns in the workload data
   */
  calculateTotals() {
    if (!this.workloadResponse || this.workloadResponse.length === 0) {
      this.totalsRow.next({});
      return;
    }

    const totals: any = {};
    const counts: any = {};

    this.columnsToDisplay().forEach(col => {
      if (this.sumColumns.includes(col.pathTo) || this.averageColumns.includes(col.pathTo)) {
        totals[col.pathTo] = 0;
        counts[col.pathTo] = 0;
      }
    });

    this.workloadResponse.forEach(row => {
      this.columnsToDisplay().forEach(col => {
        if (this.sumColumns.includes(col.pathTo) || this.averageColumns.includes(col.pathTo)) {
          const value = this.digInObject(row, col.pathTo);
          if (value !== undefined && value !== null && !isNaN(Number(value))) {
            totals[col.pathTo] += Number(value);
            counts[col.pathTo]++;
          }
        }
      });
    });

    this.averageColumns.forEach(colPath => {
      if (counts[colPath] > 0) {
        totals[colPath] = parseFloat((totals[colPath] / counts[colPath]).toFixed(3));
      }
    });

    this.sumColumns.forEach(colPath => {
      if (totals[colPath] !== undefined && totals[colPath] !== null) {
        totals[colPath] = parseFloat(totals[colPath].toFixed(3));
      }
    });

    totals['isTotalsRow'] = true;
    totals['teachingStaff'] = { rankFullName: 'Kopā:' };

    this.totalsRow.next(totals);
  }

  isTotalsRow(element: any): boolean {
    return element?.isTotalsRow === true;
  }

  getDataSourceWithTotals() {
    if (this.showTotals() && this.dataSource.data.length > 0) {
      return [...this.dataSource.data, this.totalsRow.value];
    }
    return this.dataSource.data;
  }
}
