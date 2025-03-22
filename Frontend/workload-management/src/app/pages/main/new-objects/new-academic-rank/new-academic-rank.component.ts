import {Component, EventEmitter, inject, OnInit, Output, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AcademicRankRequest} from "../../../../services/models/academic-rank-request";
import {AcademicRankService} from "../../../../services/services/academic-rank.service";

@Component({
  selector: 'app-new-academic-rank',
  imports: [
    FormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './new-academic-rank.component.html',
  standalone: true,
  styleUrls: ['./new-academic-rank.component.scss', '../new-object-style.scss']
})
export class NewAcademicRankComponent implements OnInit {
  @Output() emitMyAcademicRank = new EventEmitter<number>();
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly academicRankService = inject(AcademicRankService);

  errorMessage = signal('');
  editMode = signal(false);
  objectId = signal<number | undefined>(undefined);
  pageTitle = signal('Pievienot jaunu amatu');

  academicRankRequest?: AcademicRankRequest;
  academicRankForm = new FormGroup({
    rankName: new FormControl('', {
      validators: [
        Validators.minLength(3),
        Validators.required],
    }),
    abbreviation: new FormControl('', {
      validators: [
        Validators.minLength(3),
        Validators.required],
    }),
  });

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.objectId.set(+params['id']);
        this.editMode.set(true);
        this.pageTitle.set('Rediģēt amatu');
        this.loadAcademicRankData(this.objectId());
      }
    });
  }

  private loadAcademicRankData(id: number | undefined): void {
    if (!id) return;

    this.academicRankService.findAcademicRankById({ academicRankId: id }).subscribe({
      next: (rankData) => {
        this.academicRankForm.patchValue({
          rankName: rankData.rankName,
          abbreviation: rankData.abbreviation
        });
      },
      error: (err) => {
        this._snackBar.open("Neizdevās ielādēt datus", "Aizvērt", { duration: 5000 });
        console.error(err);
      }
    });
  }

  onSubmit() {
    if (this.academicRankForm.valid) {
      const formData = this.prepareFormData();

      if (this.editMode()) {
        this.updateAcademicRank(formData);
      } else {
        this.createAcademicRank(formData);
      }
    }
  }

  private prepareFormData(): AcademicRankRequest {
    return {
      rankName: this.academicRankForm.value.rankName!,
      abbreviation: this.academicRankForm.value.abbreviation!
    };
  }

  createAcademicRank(data: AcademicRankRequest) {
    this.academicRankService.saveAcademicRank({ body: data }).subscribe({
      next: (id) => {
        this.emitMyAcademicRank.emit(id);
        this._snackBar.open("Amats izveidots", "Aizvērt", { duration: 5000 });
        this.navigateBackFromCreateMode();
      },
      error: (err) => {
        this._snackBar.open(err.error.errorMsg || "Kļūda izveidojot amatu", "Aizvērt", { duration: 5000 });
      }
    });
  }

  private updateAcademicRank(data: AcademicRankRequest): void {
    const id = this.objectId();
    if (id === undefined) return;

    this.academicRankService.updateAcademicRankById({ academicRankId: id, body: data }).subscribe({
      next: () => {
        this._snackBar.open("Izmaiņas saglabātas", "Aizvērt", { duration: 5000 });
        this.navigateBackFromEditMode();
      },
      error: (err) => {
        console.error(err);
        this._snackBar.open(err.error.errorMsg || "Kļūda atjaunojot amatu", "Aizvērt", { duration: 5000 });
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
