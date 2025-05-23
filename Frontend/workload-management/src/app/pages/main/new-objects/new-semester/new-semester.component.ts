import {Component, DestroyRef, EventEmitter, inject, OnInit, Output, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";


import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SemesterRequest} from "../../../../services/models/semester-request";
import {SemesterControllerService} from "../../../../services/services/semester-controller.service";
import {SemesterResponse} from "../../../../services/models/semester-response";
import {of, switchMap} from "rxjs";

import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatProgressSpinner} from "@angular/material/progress-spinner";


@Component({
  selector: 'app-new-semester',
  imports: [
    FormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatOption,
    MatSelect,
    MatCheckbox,
    MatProgressSpinner
  ],
  templateUrl: './new-semester.component.html',
  standalone: true,
  styleUrls: ['./new-semester.component.scss', '../new-object-style.scss']
})
export class NewSemesterComponent implements OnInit{
  @Output() emitMyAcademicRank = new EventEmitter<number>();
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly semesterService = inject(SemesterControllerService);
  private readonly destroyRef = inject(DestroyRef);
  errorMessage = signal('');
  loading = signal(false);
  mostRecentSemester = signal<SemesterResponse | null>(null);
  correspondingSemester = signal<SemesterResponse | null>(null);
  allSemesters = signal<SemesterResponse[]>([]);
  editMode = signal(false);
  objectId = signal<number | undefined>(undefined);
  pageTitle = signal('Jauna semestra konfigurācija');
  semesterForm = new FormGroup({
    semesterName: new FormControl<"PAVASARIS" | "RUDENS">("RUDENS", {
      validators: [
        Validators.minLength(2),
        Validators.required],
    }),
    year: new FormControl<number | undefined>(undefined, {
      validators: [
        Validators.min(2024),
        Validators.required],
    }),
    sourceSemesterId: new FormControl<number | null>(null),
    copyAcademicRanks: new FormControl<boolean>(false),
    copySemesterData: new FormControl<boolean>(false)
  })
  ngOnInit(){
    this.loadAllSemesters();

    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.objectId.set(+params['id']);
        this.editMode.set(true);
        this.pageTitle.set('Rediģēt semestri');
        this.loadSemesterData(this.objectId());
      } else {
        this.loadMostRecentSemester();
      }
    });

    this.semesterForm.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.findCorrespondingSemester();
    });

    this.semesterForm.controls.sourceSemesterId.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
        this.semesterForm.patchValue({
          copyAcademicRanks: false,
          copySemesterData: false
        });
    });
  }

  private loadAllSemesters(): void {
    this.loading.set(true);
    this.semesterService.findAllSemesters().subscribe({
      next: (semesters) => {
        const sortedSemesters = [...semesters].sort((a, b) => {
          const yearA = a.year ?? 0;
          const yearB = b.year ?? 0;
          if (yearA !== yearB) {
            return yearB - yearA; // Descending by year
          }
          // If same year, sort by semester name (spring after fall)
          return a.semesterName === 'PAVASARIS' ? -1 : 1;
        });
        this.allSemesters.set(sortedSemesters);
      },
      error: () => {
        this._snackBar.open("Neizdevās ielādēt semestrus", "Aizvērt", { duration: 5000 });
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }

  private findCorrespondingSemester(): void {
    const year = this.semesterForm.value.year;
    const semesterName = this.semesterForm.value.semesterName;

    if (!year || !semesterName) {
      this.correspondingSemester.set(null);
      return;
    }

    const previousYear = year ? year - 1 : 0;

    // Find the corresponding semester from the previous year (for backward compatibility)
    const matchingSemester = this.allSemesters().find(semester =>
      semester.year === previousYear && semester.semesterName === semesterName);

    this.correspondingSemester.set(matchingSemester || null);

    // If we found a matching semester and no source semester is selected yet, select it by default
    if (matchingSemester && !this.semesterForm.value.sourceSemesterId) {
      this.semesterForm.patchValue({
        sourceSemesterId: matchingSemester.semesterId
      });
    }
  }

  private loadMostRecentSemester(): void {
    this.loading.set(true);
    this.semesterService.findMostRecentSemester()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (semester) => {
          this.mostRecentSemester.set(semester);
          // Pre-fill the year field with the next year
          if (semester && semester.year) {
            this.semesterForm.patchValue({
              year: semester.year + 1,
              semesterName: semester.semesterName
            });

          } else {
            // If no previous semester, disable copy options
            this.semesterForm.patchValue({
              copyAcademicRanks: false,
              copySemesterData: false
            });
          }
        },
        error: () => {
          this.correspondingSemester.set(null);
          this._snackBar.open("Neizdevās ielādēt iepriekšējos semestrus", "Aizvērt", { duration: 5000 });
        },
        complete: () => {
          this.loading.set(false);
        }
      });
  }
  private loadSemesterData(id: number | undefined): void {
    if (!id) return;
    this.semesterService.findSemesterById({ "semesterId": id }).subscribe({
      next: (semester) => {
        this.semesterForm.patchValue({
          semesterName: semester.semesterName,
          year: semester.year
        });
      },
      error: (err) => {
        this._snackBar.open("Neizdevās ielādēt datus", "Aizvērt", { duration: 5000 });
        console.error(err);
      }
    });
  }
  onSubmit() {
    if (this.semesterForm.valid) {
      const formData = this.prepareFormData();

      if (this.editMode()) {
        this.updateSemester(formData);
      } else {
        this.createSemester(formData);
      }
    }
  }
  private prepareFormData(): SemesterRequest {
    return {
      semesterName: this.semesterForm.value.semesterName!,
      year: this.semesterForm.value.year!
    };
  }

  private validateSemesterCreation(): boolean {
    if (!this.semesterForm.valid) {
      this._snackBar.open("Lūdzu aizpildiet visus obligātos laukus", "Aizvērt", { duration: 5000 });
      return false;
    }

    if ((this.semesterForm.value.copyAcademicRanks || this.semesterForm.value.copySemesterData) &&
        this.semesterForm.value.sourceSemesterId === null) {
      this._snackBar.open("Lūdzu izvēlieties semestri, no kura kopēt datus", "Aizvērt", { duration: 5000 });
      return false;
    }

    return true;
  }

  createSemester(data: SemesterRequest) {
    if (!this.validateSemesterCreation()) return;

    this.loading.set(true);

    this.semesterService.findAllSemesters().subscribe({
      next: (semesters) => {
        const semesterExists = semesters.some(semester =>
          semester.year === data.year && semester.semesterName === data.semesterName);

        if (semesterExists) {
          this._snackBar.open(`Semestris ${data.semesterName} ${data.year} jau eksistē`, "Aizvērt", { duration: 5000 });
          this.loading.set(false);
          return;
        }

        this.proceedWithSemesterCreation(data);
      },
      error: (err) => {
        console.error('Error checking existing semesters:', err);
        this._snackBar.open("Kļūda pārbaudot esošos semestrus", "Aizvērt", { duration: 5000 });
        this.loading.set(false);
      }
    });
  }

  private proceedWithSemesterCreation(data: SemesterRequest) {
    this.semesterService.saveSemester({
      body: data
    }).pipe(
      switchMap(newSemesterId => {

        if (this.semesterForm.value.copyAcademicRanks && this.semesterForm.value.sourceSemesterId) {
          const sourceSemesterId = this.semesterForm.value.sourceSemesterId;

          return this.semesterService.copyAcademicRanksFromSemester({
            targetSemesterId: newSemesterId,
            sourceSemesterId: sourceSemesterId
          }).pipe(
            switchMap(() => {
              if (this.semesterForm.value.copySemesterData) {
                return this.semesterService.copyWorkloadsFromSemester({
                  targetSemesterId: newSemesterId,
                  sourceSemesterId: sourceSemesterId
                });
              }
              return of(0);
            }),
            switchMap(() => of(newSemesterId))
          );
        }

        return of(newSemesterId);
      })
    ).subscribe({
      next: (id) => {
        this.emitMyAcademicRank.emit(id);
        let message = "Semestris izveidots veiksmīgi";
        if (this.semesterForm.value.copyAcademicRanks) {
          const sourceSemester = this.allSemesters().find(s => s.semesterId === this.semesterForm.value.sourceSemesterId);
          const semesterInfo = sourceSemester ? `${sourceSemester.semesterName ?? ''} ${sourceSemester.year ?? ''}` : '';
          message += `, akadēmiskie amati nokopēti no ${semesterInfo} semestra`;
        }
        if (this.semesterForm.value.copySemesterData) {
          message += ", darba slodzes nokopētas";
        }
        this._snackBar.open(message, "Aizvērt", { duration: 5000 });
        this.navigateBackFromCreateMode();
      },
      error: (err) => {
        console.error('Error creating semester:', err);
        this._snackBar.open(err.error?.errorMsg ?? "Kļūda veidojot semestri", "Aizvērt", { duration: 5000 });
        this.loading.set(false);
      },
      complete: () => {
        this.loading.set(false);
      }
    });
  }
  private updateSemester(data: SemesterRequest): void {
    const id = this.objectId();
    if (id === undefined) return;
    this.semesterService.updateSemesterById({"semesterId":id, body: data}).subscribe({
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
  updateErrorMessage(controlName: keyof typeof this.semesterForm.controls) {
    const control = this.semesterForm.controls[controlName];
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

  getSelectedSemesterName(): string | null {
    const sourceSemesterId = this.semesterForm.value.sourceSemesterId;
    if (!sourceSemesterId) return null;

    const selectedSemester = this.allSemesters().find(s => s.semesterId === sourceSemesterId);
    if (!selectedSemester) return null;

    return `${selectedSemester.semesterName ?? ''} ${selectedSemester.year ?? ''}`;
  }
}
