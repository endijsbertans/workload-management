import {Component, EventEmitter, inject, Output, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
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
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './new-academic-rank.component.html',
  standalone: true,
  styleUrls: ['./new-academic-rank.component.scss', '../new-object-style.scss']
})
export class NewAcademicRankComponent {
  @Output() emitMyAcademicRank = new EventEmitter<number>();
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly academicRankService = inject(AcademicRankService);
  errorMessage = signal('');
  academicRankRequest?: AcademicRankRequest;
  academicRankForm = new FormGroup({
    rankName: new FormControl('', {
      validators: [
        Validators.minLength(3),
        Validators.required],
    }),
    abbreviation: new FormControl(null, {
      validators: [
        Validators.minLength(3),
        Validators.required],
    }),
  })

  onSubmit() {
    console.log(this.academicRankForm.controls);
    if (this.academicRankForm.value.rankName &&
      this.academicRankForm.value.abbreviation
    ) {
      this.academicRankRequest = {
        rankName: this.academicRankForm.value.rankName,
        abbreviation: this.academicRankForm.value.abbreviation
      };

      this.academicRankService.saveAcademicRank({
        body: this.academicRankRequest
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
