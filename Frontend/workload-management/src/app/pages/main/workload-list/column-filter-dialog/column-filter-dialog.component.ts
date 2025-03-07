// src/app/pages/main/workload-list/column-filter-dialog/column-filter-dialog.component.ts
import {Component, inject, Inject, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
  MatDialogTitle,
  MatDialogContent, MatDialogActions
} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSlideToggle} from "@angular/material/slide-toggle";



@Component({
  selector: 'app-column-filter-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions
  ],
  templateUrl: './column-filter-dialog.component.html',
  styleUrl: './column-filter-dialog.component.scss'
})
export class ColumnFilterDialogComponent implements OnInit{
  boolInput = signal<boolean>(false);
  public data = inject(MAT_DIALOG_DATA);
  columnFilter = new FormGroup({
    operatorCtrl: new FormControl('', {
      validators: [
        Validators.required],
    }),
    filterTextCtrl: new FormControl(null, {
      validators: [
        Validators.minLength(2),
        Validators.required],
    }),
    filterBoolCtrl: new FormControl<boolean>(false, {
      validators: [
        Validators.minLength(2),
        Validators.required],
    }),
  })
  ngOnInit(){
    this.columnFilter.get('operatorCtrl')?.valueChanges.subscribe(() => {
        let val = this.columnFilter.controls.operatorCtrl.value;
        if(val === "boolVal"){
          this.boolInput.set(true);
        }else{
          this.boolInput.set(false);
        }
    });
  }
  constructor(
    public dialogRef: MatDialogRef<ColumnFilterDialogComponent>,
  ) {}

  applyFilter(): void {
    this.dialogRef.close({
      value: this.columnFilter.controls.filterTextCtrl.value,
      operator: this.columnFilter.controls.operatorCtrl.value,
      column: this.data.column
    });
  }

  clearFilter(): void {
    this.dialogRef.close({
      value: '',
      operator: '',
      column: this.data.column,
      clear: true
    });
  }

  close(): void {
    this.dialogRef.close();
  }

}
