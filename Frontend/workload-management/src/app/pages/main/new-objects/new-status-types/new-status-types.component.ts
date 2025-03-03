import {Component, EventEmitter, inject, Output, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {StatusTypeRequest} from "../../../../services/models/status-type-request";
import {StatusTypeService} from "../../../../services/services";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-new-status-types',
  imports: [
    FormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './new-status-types.component.html',
  standalone: true,
  styleUrls: ['./new-status-types.component.scss', '../new-object-style.scss']
})
export class NewStatusTypesComponent {
  @Output() emitMyAcademicRank = new EventEmitter<number>();
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly statusTypeService = inject(StatusTypeService);
  errorMessage = signal('');
  statusTypeRequest?: StatusTypeRequest;
  statusTypeForm = new FormGroup({
    statusTypeName: new FormControl('', {
      validators: [
        Validators.minLength(2),
        Validators.required],
    })
  })

  onSubmit() {
    console.log(this.statusTypeForm.controls);
    if (this.statusTypeForm.value.statusTypeName
    ) {
      this.statusTypeRequest = {
        statusTypeName: this.statusTypeForm.value.statusTypeName,
      };

      this.statusTypeService.saveStatusType({
        body: this.statusTypeRequest
      }).subscribe({
        next: (id) => {
          this.emitMyAcademicRank.emit( id );
          this._snackBar.open("Saglabāts", "Aizvērt", { duration: 5000 });
        },
        error: (err) => {
          this._snackBar.open(err.error.errorMsg, "Aizvērt", { duration: 5000 });
        }
      })
    }
    this.router.navigate(['..'], {
      relativeTo: this.activeRoute,
      replaceUrl: true});
  }

  updateErrorMessage(controlName: keyof typeof this.statusTypeForm.controls) {
    const control = this.statusTypeForm.controls[controlName];
    if (control.errors) {
      if (control.hasError('required')) {
        this.errorMessage.set('Lauks nevar būt tukšs');
      } else if (control.hasError('minlength')) {
        this.errorMessage.set('Ievadītā vērtība ir pārāk īsa');
      } else if (control.hasError('maxlength')) {
        this.errorMessage.set('Ievadītā vērtība ir pārāk gara');
      } else if (control.hasError('min')) {
        this.errorMessage.set('Ievadītā vērtība ir pārāk maza');
      } else if (control.hasError('max')) {
        this.errorMessage.set('Ievadītā vērtība ir pārāk liela');
      } else {
        this.errorMessage.set('Nederīga vērtība');
      }
    } else {
      this.errorMessage.set('');
    }
  }
}
