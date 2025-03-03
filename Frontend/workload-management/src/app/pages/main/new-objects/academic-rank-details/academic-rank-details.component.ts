import {Component, EventEmitter, inject, Output, signal} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AcademicRankDetailsService} from "../../../../services/services/academic-rank-details.service";
import {AcademicRankDetailsRequest} from "../../../../services/models/academic-rank-details-request";

@Component({
  selector: 'app-academic-rank-details',
  imports: [],
  templateUrl: './academic-rank-details.component.html',
  standalone: true,
  styleUrls: ['./academic-rank-details.component.scss', '../new-object-style.scss']
})
export class AcademicRankDetailsComponent {
  @Output() emitMyAcademicRankDetails = new EventEmitter<number>();
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly academicRankDetailsService = inject(AcademicRankDetailsService);
  errorMessage = signal('');
  academicRankDetailsRequest?: AcademicRankDetailsRequest;
  academicRankForm = new FormGroup({
    cpForFullTime: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.max(5)
      ]
    }),
    salary: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.max(5)
      ]
    }),
    contactHoursForFullTime: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.max(5)
      ]
    }),
    semesterId: new FormControl<number | undefined>(undefined, {
      validators: [
        Validators.required],
    }),
    staffFacultyId: new FormControl<number | undefined>(undefined, {
      validators: [
        Validators.required],
    }),
  })

  onSubmit() {
    console.log(this.academicRankForm.controls);
    if (this.academicRankForm.value.cpForFullTime &&
      this.academicRankForm.value.salary &&
      this.academicRankForm.value.contactHoursForFullTime &&
      this.academicRankForm.value.semesterId&&
      this.academicRankForm.value.staffFacultyId
    ) {
      this.academicRankDetailsRequest = {
        cpForFullTime: this.academicRankForm.value.cpForFullTime,
        salary: this.academicRankForm.value.salary,
        contactHoursForFullTime: this.academicRankForm.value.contactHoursForFullTime,
        semesterId: this.academicRankForm.value.semesterId,
        academicRankId: this.academicRankForm.value.staffFacultyId
      };

      this.academicRankDetailsService.saveAcademicRankDetails({
        body: this.academicRankDetailsRequest
      }).subscribe({
        next: (id) => {
          this.emitMyAcademicRankDetails.emit(id);
          this._snackBar.open("Saglabāts", "Aizvērt", {duration: 5000});
        },
        error: (err) => {
          this._snackBar.open(err.error.errorMsg, "Aizvērt", {duration: 5000});
        }
      })
    }
    this.router.navigate(['..'], {
      relativeTo: this.activeRoute,
      replaceUrl: true
    });
  }

  updateErrorMessage(controlName: keyof typeof this.academicRankForm.controls) {
    const control = this.academicRankForm.controls[controlName];
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
