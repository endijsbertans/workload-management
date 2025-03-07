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
    const currentSettings = this.listSettings();
    const newSettings: WorkloadColumnSettings[] = [];


    ColumnsForWorkloadList.forEach(originalColumn => {

      const userSetting = currentSettings.find(col => col.pathTo === originalColumn.pathTo);

      const groupVisible = visibleGroups[originalColumn.collection as keyof ShownColumns];
      const shouldInclude = groupVisible || originalColumn.isMain;

      if (shouldInclude) {

        newSettings.push({
          ...originalColumn,
          visible: userSetting ? userSetting.visible : originalColumn.visible
        });
      }
    });

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
