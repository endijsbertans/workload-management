import {Component, computed, inject} from '@angular/core';

import {WorkloadListSettingsService} from "./workload-list-settings-service";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCard, MatCardTitle} from "@angular/material/card";
import {MatCheckbox} from "@angular/material/checkbox";
import {TitleCasePipe} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-workload-list-settings',
  imports: [
    MatExpansionModule,
    MatCard,
    MatCardTitle,

    MatCheckbox,
    TitleCasePipe,
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
