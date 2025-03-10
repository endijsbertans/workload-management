import {Component, DestroyRef, EventEmitter, inject, OnInit, Output, signal} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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
    MatButton
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
  editMode = signal(false);
  objectId = signal<number | undefined>(undefined);
  pageTitle = signal('Pievienot jaunas amata detaļas');

  academicRankDetailsRequest?: AcademicRankDetailsRequest;
  academicRankDetailsForm = new FormGroup({
    cpForFullTime: new FormControl(1, {
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.max(30)
      ]
    }),
    salary: new FormControl(1, {
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.max(10000)
      ]
    }),
    contactHoursForFullTime: new FormControl(1, {
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
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.objectId.set(+params['id']);
        this.editMode.set(true);
        this.pageTitle.set('Rediģēt amata detaļas');
        this.fetchSemesters(() => {
          this.fetchAllAcademicRanks(() => {
            this.loadAcademicRankDetailsData(this.objectId());
          });
        });
      } else {
        this.fetchSemesters();
        this.fetchAllAcademicRanks();
      }
    });
  }

  private loadAcademicRankDetailsData(id: number | undefined): void {
    if (!id) return;

    this.academicRankDetailsService.findAcademicRankDetailsById({ "academic-rank-id": id }).subscribe({
      next: (detailsData) => {
        this.academicRankDetailsForm.patchValue({
          cpForFullTime: detailsData.cpForFullTime,
          salary: detailsData.salary,
          contactHoursForFullTime: detailsData.contactHoursForFullTime,
          semesterId: detailsData.semester?.semesterId,
          academicRankId: detailsData.academicRank?.academicRankId
        });
      },
      error: (err) => {
        this._snackBar.open("Neizdevās ielādēt datus", "Aizvērt", { duration: 5000 });
        console.error(err);
      }
    });
  }

  onSubmit() {
    if (this.academicRankDetailsForm.valid) {
      const formData = this.prepareFormData();

      if (this.editMode()) {
        this.updateAcademicRankDetails(formData);
      } else {
        this.createAcademicRankDetails(formData);
      }
    }
  }

  private prepareFormData(): AcademicRankDetailsRequest {
    return {
      cpForFullTime: this.academicRankDetailsForm.value.cpForFullTime!,
      salary: this.academicRankDetailsForm.value.salary!,
      contactHoursForFullTime: this.academicRankDetailsForm.value.contactHoursForFullTime!,
      semesterId: this.academicRankDetailsForm.value.semesterId!,
      academicRankId: this.academicRankDetailsForm.value.academicRankId!
    };
  }

  private createAcademicRankDetails(data: AcademicRankDetailsRequest) {
    this.academicRankDetailsService.saveAcademicRankDetails({
      body: data
    }).subscribe({
      next: (id) => {
        this.emitMyAcademicRankDetails.emit(id);
        this._snackBar.open("Saglabāts", "Aizvērt", {duration: 5000});
        this.navigateBackFromCreateMode();
      },
      error: (err) => {
        this._snackBar.open(err.error.errorMsg, "Aizvērt", {duration: 5000});
      }
    });
  }

  private updateAcademicRankDetails(data: AcademicRankDetailsRequest): void {
    const id = this.objectId();
    if (id === undefined) return;

    this.academicRankDetailsService.updateAcademicRankDetailsById({ "academic-rank-id": id, body: data }).subscribe({
      next: () => {
        this._snackBar.open("Izmaiņas saglabātas", "Aizvērt", { duration: 5000 });
        this.navigateBackFromEditMode();
      },
      error: (err) => {
        console.error(err);
        this._snackBar.open(err.error.errorMsg || "Kļūda atjaunojot amata detaļas", "Aizvērt", { duration: 5000 });
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
