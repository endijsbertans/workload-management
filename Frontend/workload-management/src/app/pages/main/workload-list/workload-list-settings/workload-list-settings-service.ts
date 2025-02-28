import {Injectable, OnInit, signal} from "@angular/core";
import {
  ColumnsForWorkloadList,
  ShownColumns,
  WorkloadColumnSettings
} from "../workload-list-columns";

@Injectable({
  providedIn: 'root'
})
export class WorkloadListSettingsService implements OnInit{
  private readonly STORAGE_KEY_LIST_SETTINGS = "workloadListSettings";
  private readonly STORAGE_KEY_VISIBLE_GROUPS = "visibleWorkloadGroups";

  listSettings = signal<WorkloadColumnSettings[]>(this.loadListSettings());
  visibleWorkloadGroups = signal<ShownColumns>(this.loadVisibleWorkloadGroups());

  getSettings = this.listSettings.asReadonly();
  ngOnInit() {
    this.saveSettings();
  }

  hideWorkloadGroup(columnGroup: keyof ShownColumns) {
    this.visibleWorkloadGroups.set({
      ...this.visibleWorkloadGroups(),
      [columnGroup]: !this.visibleWorkloadGroups()[columnGroup]
    });
    this.updateWorkloadGroup();
    this.saveSettings();
  }

  updateWorkloadColumnSetting(pathTo: string, newVisible: boolean) {
    this.listSettings.update((old) =>
      old.map((column) =>
        column.pathTo === pathTo ? { ...column, visible: newVisible } : column
      )
    );
    this.saveSettings();
  }

  updateWorkloadGroup() {
    const visibleGroups = this.visibleWorkloadGroups();
    const newSettings: WorkloadColumnSettings[] = [];

    newSettings.push(
      ...(visibleGroups.columnsForTeacher
        ? ColumnsForWorkloadList.filter(column => column.collection === "columnsForTeacher")
        : ColumnsForWorkloadList.filter(column => column.collection === "columnsForTeacher" && column.isMain)),

      ...(visibleGroups.columnsForCourse
        ? ColumnsForWorkloadList.filter(column => column.collection === "columnsForCourse")
        : ColumnsForWorkloadList.filter(column => column.collection === "columnsForCourse" && column.isMain)),

      ...(visibleGroups.columnsForCalc
        ? ColumnsForWorkloadList.filter(column => column.collection === "columnsForCalc")
        : ColumnsForWorkloadList.filter(column => column.collection === "columnsForCalc" && column.isMain)),

      ...(visibleGroups.columnsForWorkloadClasses
        ? ColumnsForWorkloadList.filter(column => column.collection === "columnsForWorkloadClasses")
        : ColumnsForWorkloadList.filter(column => column.collection === "columnsForWorkloadClasses" && column.isMain)),

      ...(visibleGroups.columnsForGeneralInfo
        ? ColumnsForWorkloadList.filter(column => column.collection === "columnsForGeneralInfo")
        : ColumnsForWorkloadList.filter(column => column.collection === "columnsForGeneralInfo" && column.isMain)),

      ...(visibleGroups.columnsForSalary
        ? ColumnsForWorkloadList.filter(column => column.collection === "columnsForSalary")
        : ColumnsForWorkloadList.filter(column => column.collection === "columnsForSalary" && column.isMain))
    );

    this.listSettings.set(newSettings);
    this.saveSettings();
  }

  private saveSettings() {
    localStorage.setItem(this.STORAGE_KEY_LIST_SETTINGS, JSON.stringify(this.listSettings()));
    localStorage.setItem(this.STORAGE_KEY_VISIBLE_GROUPS, JSON.stringify(this.visibleWorkloadGroups()));
  }

  private loadListSettings(): WorkloadColumnSettings[] {
    const savedSettings = localStorage.getItem(this.STORAGE_KEY_LIST_SETTINGS);
    return savedSettings ? JSON.parse(savedSettings) : [...ColumnsForWorkloadList];
  }

  private loadVisibleWorkloadGroups(): ShownColumns {
    const savedGroups = localStorage.getItem(this.STORAGE_KEY_VISIBLE_GROUPS);
    return savedGroups
      ? JSON.parse(savedGroups)
      : {
        columnsForTeacher: true,
        columnsForCourse: true,
        columnsForCalc: true,
        columnsForGeneralInfo: true,
        columnsForSalary: true,
        columnsForWorkloadClasses: true
      };
  }
}
