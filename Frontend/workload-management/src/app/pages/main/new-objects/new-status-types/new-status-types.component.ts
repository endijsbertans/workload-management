import {Component, EventEmitter, inject, OnInit, Output, signal} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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
    ReactiveFormsModule
  ],
  templateUrl: './new-status-types.component.html',
  standalone: true,
  styleUrls: ['./new-status-types.component.scss', '../new-object-style.scss']
})
export class NewStatusTypesComponent implements OnInit{
  @Output() emitMyAcademicRank = new EventEmitter<number>();
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly statusTypeService = inject(StatusTypeService);
  errorMessage = signal('');
  editMode = signal(false);
  objectId = signal<number | undefined>(undefined);
  pageTitle = signal('Pievienot jaunu statusu!');
  statusTypeForm = new FormGroup({
    statusTypeName: new FormControl('', {
      validators: [
        Validators.minLength(2),
        Validators.required],
    })
  })

  ngOnInit(){
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.objectId.set(+params['id']);
        this.editMode.set(true);
        this.pageTitle.set('Rediģēt statusu');
        this.loadStatusTypeData(this.objectId());
      }
    });
  }
  private loadStatusTypeData(id: number | undefined): void {
    if (!id) return;
    this.statusTypeService.findStatusTypeById({ "statusTypeId": id }).subscribe({
      next: (statusType) => {
        this.statusTypeForm.patchValue({
          statusTypeName: statusType.statusTypeName
        });
      },
      error: (err) => {
        this._snackBar.open("Neizdevās ielādēt datus", "Aizvērt", { duration: 5000 });
        console.error(err);
      }
    });
  }
  onSubmit() {
    if (this.statusTypeForm.valid) {
      const formData = this.prepareFormData();

      if (this.editMode()) {
        this.updateStatusType(formData);
      } else {
        this.createStatusType(formData);
      }
    }
  }
  private prepareFormData(): StatusTypeRequest {
    return {
      statusTypeName: this.statusTypeForm.value.statusTypeName!
    };
  }
  createStatusType(data: StatusTypeRequest) {
    if (this.statusTypeForm.valid) {
      this.statusTypeService.saveStatusType({
        body: data
      }).subscribe({
        next: (id) => {
          this.emitMyAcademicRank.emit( id );
          this._snackBar.open("Saglabāts", "Aizvērt", { duration: 5000 });
          this.navigateBackFromCreateMode();
        },
        error: (err) => {
          this._snackBar.open(err.error.errorMsg, "Aizvērt", { duration: 5000 });
        }
      })
    }
  }
  private updateStatusType(data: StatusTypeRequest): void {
    const id = this.objectId();
    if (id === undefined) return;
    this.statusTypeService.updateStatusTypeById({"statusTypeId":id, body: data}).subscribe({
      next: () => {
        this._snackBar.open("Izmaiņas saglabātas", "Aizvērt", { duration: 5000 });
        this.navigateBackFromEditMode();
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open(err.error.errorMsg, "Aizvērt", { duration: 5000 });
      }
    });
  }
  public navigateBackFromEditMode(): void {
    this.router.navigate(['../../'], {
      relativeTo: this.activeRoute,
      replaceUrl: true
    });
  }
  public navigateBackFromCreateMode(): void {
    this.router.navigate(['..'], {
      relativeTo: this.activeRoute,
      replaceUrl: true
    });
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
