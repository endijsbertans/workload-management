import { inject, Injectable, signal } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { WorkloadSettingsService } from "../../../../services/services";
import { WorkloadSettingsResponse } from "../../../../services/models/workload-settings-response";
import { WorkloadSettingsRequest } from "../../../../services/models/workload-settings-request";
import { ColumnsForWorkloadList, WorkloadColumnSettings } from "../workload-list-columns";

@Injectable({
  providedIn: 'root'
})
export class WorkloadListSettingsService {
  private readonly workloadListSettingsService = inject(WorkloadSettingsService);
  private readonly availableSettings = new BehaviorSubject<WorkloadSettingsResponse[]>([]);
  availableSettings$ = this.availableSettings.asObservable();

  currentSettings = signal<WorkloadSettingsResponse | null>(null);
  listSettings = signal<WorkloadColumnSettings[]>([...ColumnsForWorkloadList]);

  constructor() {
    this.loadSettingsFromServer();
  }

  loadSettingsFromServer() {
    this.workloadListSettingsService.findAllWorkloadSettings().subscribe({
      next: (settings) => {
        this.availableSettings.next(settings);
        if (settings.length > 0) {
          const defaultSetting = settings.find(s => s.default) || settings[0];
          this.applySettings(defaultSetting);
        }
      }
    });
  }

  applySettings(settings: WorkloadSettingsResponse) {
    this.currentSettings.set(settings);

    const newListSettings = ColumnsForWorkloadList.map(col => ({
      ...col,
      visible: settings?.visibleColumns?.includes(col.pathTo) || false
    }));

    this.listSettings.set(newListSettings);
  }

  createNewSettings(name: string, isDefault: boolean = false, currentSettings?: WorkloadColumnSettings[]) {
  const settingsToUse = currentSettings || this.listSettings();

    const currentVisibleColumns = settingsToUse
      .filter(col => col.visible)
      .map(col => col.pathTo);

    const newSettings: WorkloadSettingsRequest = {
      settingName: name,
      visibleColumns: currentVisibleColumns,
      isDefault: isDefault
    };

    this.workloadListSettingsService.saveWorkloadSettings({body: newSettings}).subscribe({
      next: (result) => {
        this.loadSettingsFromServer();
      }
    });
  }

  updateCurrentSettings(isDefault: boolean) {
    const currentSetting = this.currentSettings();
    if (!currentSetting) return;

    const currentVisibleColumns = this.listSettings()
      .filter(col => col.visible)
      .map(col => col.pathTo);

    const updatedSettings: WorkloadSettingsRequest = {
      settingName: currentSetting.settingName,
      visibleColumns: currentVisibleColumns,
      isDefault: isDefault
    };
    if(currentSetting.workloadSettingsId) {
    this.workloadListSettingsService.updateWorkloadSettingsById({
      semesterId: currentSetting.workloadSettingsId,
      body: updatedSettings
    }).subscribe({
      next: () => {
        this.loadSettingsFromServer();
      }
    });
  }
  }
  getMainSettings(): ({ name: string; collection: string }[]) {
    return [
      {collection: "columnsForTeacher", name: "Docenti"},
      {collection: "columnsForCourse", name: "StudijuPriekšmeti"},
      {collection: "columnsForCalc", name: "Aprēķini"},
      {collection: "columnsForWorkloadClasses", name: "Kursi"},
      {collection: "columnsForSalary", name: "Budžeta"}
    ];
  }
}
