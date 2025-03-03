import {Component, DestroyRef, EventEmitter, inject, OnInit, Output, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AcademicRankDetailsService} from "../../../../services/services/academic-rank-details.service";
import {AcademicRankDetailsRequest} from "../../../../services/models/academic-rank-details-request";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {AcademicRankService, SemesterControllerService} from "../../../../services/services";
import {SemesterResponse} from "../../../../services/models/semester-response";
import {MatButton} from "@angular/material/button";
import {AcademicRankResponse} from "../../../../services/models/academic-rank-response";

@Component({
  selector: 'app-new-academic-rank-details',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatButton,
    RouterLink
  ],
  templateUrl: './new-academic-rank-details.component.html',
  standalone: true,
  styleUrls: ['./new-academic-rank-details.component.scss', '../new-object-style.scss']
})
export class NewAcademicRankDetailsComponent implements OnInit{
  @Output() emitMyAcademicRankDetails = new EventEmitter<number>();
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly academicRankDetailsService = inject(AcademicRankDetailsService);
  private readonly academicRankService = inject(AcademicRankService);
  private readonly semesterService = inject(SemesterControllerService);
  private readonly destroyRef = inject(DestroyRef);
  semesters = signal<SemesterResponse[] | undefined>(undefined);
  academicRanks = signal<AcademicRankResponse[] | undefined>(undefined);

  errorMessage = signal('');
  academicRankDetailsRequest?: AcademicRankDetailsRequest;
  academicRankDetailsForm = new FormGroup({
    cpForFullTime: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.max(30)
      ]
    }),
    salary: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.max(10000)
      ]
    }),
    contactHoursForFullTime: new FormControl(null, {
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.max(30)
      ]
    }),
    semesterId: new FormControl<number | undefined>(undefined, {
      validators: [
        Validators.required],
    }),
    academicRankId: new FormControl<number | undefined>(undefined, {
      validators: [
        Validators.required],
    }),
  })
  ngOnInit(){
    this.fetchSemesters();
    this.fetchAllAcademicRanks();
  }
  onSubmit() {
    console.log(this.academicRankDetailsForm.controls);
    if (this.academicRankDetailsForm.value.cpForFullTime &&
      this.academicRankDetailsForm.value.salary &&
      this.academicRankDetailsForm.value.contactHoursForFullTime &&
      this.academicRankDetailsForm.value.semesterId&&
      this.academicRankDetailsForm.value.academicRankId
    ) {
      this.academicRankDetailsRequest = {
        cpForFullTime: this.academicRankDetailsForm.value.cpForFullTime,
        salary: this.academicRankDetailsForm.value.salary,
        contactHoursForFullTime: this.academicRankDetailsForm.value.contactHoursForFullTime,
        semesterId: this.academicRankDetailsForm.value.semesterId,
        academicRankId: this.academicRankDetailsForm.value.academicRankId
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

  private fetchSemesters(callback?: () => void) {
    const subscription = this.semesterService.findAllSemesters().subscribe({
      next: (semesters) => {
        this.semesters.set(semesters);
        if (callback) callback();
      },
      error: (err) => console.log(err)
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
  private fetchAllAcademicRanks(callback?: () => void) {
    const subscription = this.academicRankService.findAllAcademicRank().subscribe({
      next: (academicRanks) => {
        this.academicRanks.set(academicRanks);
        if (callback) callback();
      },
      error: (err) => console.log(err)
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
  updateErrorMessage(controlName: keyof typeof this.academicRankDetailsForm.controls) {
    const control = this.academicRankDetailsForm.controls[controlName];
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
