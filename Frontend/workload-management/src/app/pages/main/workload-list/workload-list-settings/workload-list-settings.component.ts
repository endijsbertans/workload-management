import {Component,inject, linkedSignal,signal} from '@angular/core';

import {WorkloadListSettingsService} from "./workload-list-settings-service";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatFormField, MatLabel, MatOption, MatSelect, MatSelectChange} from "@angular/material/select";

import {AsyncPipe} from "@angular/common";
import {SaveSettingsDialogComponent} from "./save-settings-dialog/save-settings-dialog.component";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatSlideToggle} from "@angular/material/slide-toggle";


@Component({
  selector: 'app-workload-list-settings',
  imports: [
    MatCheckbox,
    MatSelect,
    MatOption,
    MatLabel,
    MatFormField,
    AsyncPipe,
    MatButton,
    RouterLink,
    MatSlideToggle,
  ],
  templateUrl: './workload-list-settings.component.html',
  standalone: true,
  styleUrl: './workload-list-settings.component.scss'
})
export class WorkloadListSettingsComponent {
  protected readonly columnSettingsService = inject(WorkloadListSettingsService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  availableSettings$ = this.columnSettingsService.availableSettings$;
  selectedSetting = linkedSignal(() => this.columnSettingsService.currentSettings());
  isDefault = signal(this.selectedSetting()?.default || false);
  hasUnsavedChanges = signal(false);

  loadedSettings = signal(this.columnSettingsService.listSettings());

  toggleGroupVisibility(column: string, visible: boolean) {
    this.loadedSettings.update(settings =>
      settings.map(col =>
        col.pathTo === column ? { ...col, visible: !visible } : col
      )
    );
    this.hasUnsavedChanges.set(true);
  }

  onSettingSelected(event: MatSelectChange) {
    const selectedSetting = event.value;
    if (selectedSetting) {
      this.selectedSetting.set(selectedSetting);
      this.isDefault.set(selectedSetting.default || false);

      this.loadedSettings.set(this.columnSettingsService.listSettings().map(col => ({
        ...col,
        visible: selectedSetting.visibleColumns?.includes(col.pathTo) || false
      })));

      this.hasUnsavedChanges.set(false);
    }
  }

  openSaveDialog() {
    const dialogRef = this.dialog.open(SaveSettingsDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.columnSettingsService.createNewSettings(result.name, result.isDefault, this.loadedSettings());
        this.snackBar.open('Iestatījumu šablons saglabāts', 'Aizvērt', {duration: 3000});
      }
    });
  }

  toggleDefaultSetting(isDefault: boolean) {
    this.isDefault.set(isDefault);
    this.hasUnsavedChanges.set(true);
  }

  saveChanges() {

    this.columnSettingsService.listSettings.set(this.loadedSettings());

    const selectedSetting = this.selectedSetting();
    if (selectedSetting) {
      this.columnSettingsService.updateCurrentSettings(this.isDefault());
      this.snackBar.open('Iestatījumi saglabāti', 'Aizvērt', {duration: 3000});
      this.hasUnsavedChanges.set(false);
    }
  }

  getMainSettings() {
    return this.columnSettingsService.getMainSettings();
  }

  getSubSettings(collection: string) {
    return this.loadedSettings().filter(column => column.collection === collection && !column.isMain);
  }
  deleteCurrentSetting() {
    const selectedSetting = this.selectedSetting();
    if (selectedSetting?.workloadSettingsId) {
      if (confirm('Vai tiešām vēlaties dzēst šo iestatījumu šablonu?')) {
        this.columnSettingsService.deleteSettings(selectedSetting.workloadSettingsId);
        this.snackBar.open('Iestatījumu šablons dzēsts', 'Aizvērt', {duration: 3000});
        this.hasUnsavedChanges.set(false);
      }
    } else {
      this.snackBar.open('Nav izvēlēts iestatījumu šablons', 'Aizvērt', {duration: 3000});
    }
  }
}
