import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-save-settings-dialog',
  imports: [
    FormsModule,
    MatDialogClose,
    MatCheckbox,
    MatLabel,
    MatFormField,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatInput
  ],
  templateUrl: './save-settings-dialog.component.html',
  standalone: true,
  styleUrl: './save-settings-dialog.component.scss'
})
export class SaveSettingsDialogComponent {
  data: { name: string; isDefault: boolean } = { name: '', isDefault: false };

  constructor(
    public dialogRef: MatDialogRef<SaveSettingsDialogComponent>
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
