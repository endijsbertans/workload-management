import { Injectable, signal } from "@angular/core";
import {
  ColumnsForWorkloadList,
  ShownColumns,
  WorkloadColumnSettings
} from "../workload-list-columns";

@Injectable({
  providedIn: 'root'
})
export class WorkloadListSettingsService {
  listSettings = signal<WorkloadColumnSettings[]>([...ColumnsForWorkloadList]);

  getSettings = this.listSettings.asReadonly();

  visibleWorkloadGroups = signal<ShownColumns>({
    columnsForTeacher: true,
    columnsForCourse: true,
    columnsForCalc: true,
    columnsForGeneralInfo: true,
    columnsForSalary: true,
    columnsForWorkloadClasses: true
  });

  hideWorkloadGroup(columnGroup: keyof ShownColumns) {
    this.visibleWorkloadGroups.set({
      ...this.visibleWorkloadGroups(),
      [columnGroup]: !this.visibleWorkloadGroups()[columnGroup]
    });
    this.updateWorkloadGroup();
  }
  updateWorkloadColumnSetting(pathTo: string, newVisible: boolean) {
    console.log(pathTo + " " + newVisible)
    this.listSettings.update((old) =>
      old.map((column) =>
        column.pathTo === pathTo ? { ...column, visible: newVisible } : column
      )
    );
    console.log(this.listSettings());
  }

  updateWorkloadGroup() {
    const visibleGroups = this.visibleWorkloadGroups();
    const newSettings: WorkloadColumnSettings[] = [];
    newSettings.push(
      ...(visibleGroups.columnsForTeacher ?
        ColumnsForWorkloadList.filter((column) =>
          column.collection === "columnsForTeacher")
        : ColumnsForWorkloadList.filter((column) =>
          column.collection === "columnsForTeacher" && column.isMain)),

      ...(visibleGroups.columnsForCourse ?
        ColumnsForWorkloadList.filter((column) =>
          column.collection === "columnsForCourse")
        : ColumnsForWorkloadList.filter((column) =>
          column.collection === "columnsForCourse" && column.isMain)),

      ...(visibleGroups.columnsForCalc ?
        ColumnsForWorkloadList.filter((column) =>
          column.collection === "columnsForCalc")
        : ColumnsForWorkloadList.filter((column) =>
          column.collection === "columnsForCalc" && column.isMain)),

      ...(visibleGroups.columnsForWorkloadClasses ?
        ColumnsForWorkloadList.filter((column) =>
          column.collection === "columnsForWorkloadClasses")
        : ColumnsForWorkloadList.filter((column) =>
          column.collection === "columnsForWorkloadClasses" && column.isMain)),

      ...(visibleGroups.columnsForGeneralInfo ?
        ColumnsForWorkloadList.filter((column) =>
          column.collection === "columnsForGeneralInfo")
        : ColumnsForWorkloadList.filter((column) =>
          column.collection === "columnsForGeneralInfo" && column.isMain)),

      ...(visibleGroups.columnsForSalary ?
        ColumnsForWorkloadList.filter((column) =>
          column.collection === "columnsForSalary")
        : ColumnsForWorkloadList.filter((column) =>
          column.collection === "columnsForSalary" && column.isMain)),

    );

    this.listSettings.set(newSettings);
  }

}
