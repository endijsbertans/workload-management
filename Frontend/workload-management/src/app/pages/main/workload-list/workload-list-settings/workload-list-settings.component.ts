import {Component, computed, inject} from '@angular/core';

import {WorkloadListSettingsService} from "./workload-list-settings-service";
import {MatCheckbox} from "@angular/material/checkbox";



@Component({
  selector: 'app-workload-list-settings',
  imports: [
    MatCheckbox,
  ],
  templateUrl: './workload-list-settings.component.html',
  standalone: true,
  styleUrl: './workload-list-settings.component.scss'
})
export class WorkloadListSettingsComponent {
  protected readonly columnSettingsService = inject(WorkloadListSettingsService);
  columnsToDisplay? = computed(() => {
    return this.columnSettingsService.getSettings()});

  toggleGroupVisibility(column: string, visible: boolean) {
    this.columnSettingsService.updateWorkloadColumnSetting(column, !visible);
  }

}
