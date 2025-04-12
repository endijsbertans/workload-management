import {Component, DestroyRef, EventEmitter, inject, OnInit, Output, signal, ViewChild} from '@angular/core';
import {
  AcademicRankService,
  FacultyService,
  StatusTypeService,
  TeachingStaffService
} from "../../../../services/services";
import {FacultyResponse} from "../../../../services/models/faculty-response";

import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";

import {NewUserComponent} from "../new-user/new-user.component";
import {RegistrationRequest} from "../../../../services/models/registration-request";
import {TeachingStaffRequest} from "../../../../services/models/teaching-staff-request";
import {AcademicRankResponse} from "../../../../services/models/academic-rank-response";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StatusTypeResponse} from "../../../../services/models/status-type-response";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'app-new-teaching-staff',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOption,
    MatSelect,
    MatButton,
    NewUserComponent,
    MatProgressBar,
  ],
  templateUrl: './new-teaching-staff.component.html',
  standalone: true,
  styleUrls: ['./new-teaching-staff.component.scss', '../new-object-style.scss']
})
export class NewTeachingStaffComponent implements OnInit {
  @Output() emitTeachingStaff = new EventEmitter<number>();
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly teachingStaffService = inject(TeachingStaffService);
  private readonly facultyService = inject(FacultyService);
  private readonly academicRankService = inject(AcademicRankService);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly statusTypeService = inject(StatusTypeService);

  @ViewChild('userComponent') userComponent!: NewUserComponent;
  statusTypes = signal<StatusTypeResponse[] | undefined>(undefined);
  faculties = signal<FacultyResponse[] | undefined>(undefined);
  academicRanks = signal<AcademicRankResponse[] | undefined>(undefined);
  onAddUserAuthDetails = signal(false);
  userAuthDetails = signal<RegistrationRequest | undefined>(undefined);
  authButtonText = signal("Izveidot autentifikācijas detaļas");
  errorMessage = signal('');

  editMode = signal(false);
  objectId = signal<number | undefined>(undefined);
  pageTitle = signal('Pievienot jaunu docētāju');

  fileLoading = signal(false);
  fileContent: string | null = null;
  bulkMode = signal(false);
  selectedFile: any;
  teachingStaffRequest?: TeachingStaffRequest;
  teachingStaffForm = new FormGroup({
    name: new FormControl('', {
      validators: [
        Validators.minLength(3),
        Validators.required],
    }),
    surname: new FormControl('', {
      validators: [
        Validators.minLength(3),
        Validators.required],
    }),
    statusTypeId: new FormControl<number | undefined>(undefined, {
      validators: [
        Validators.required],
    }),
    staffFacultyId: new FormControl<number | undefined>(undefined, {
      validators: [
        Validators.required],
    }),
    academicRankId: new FormControl<number | undefined>(undefined, {
      validators: [
        Validators.required],
    }),
  });

  ngOnInit(): void {
    this.fetchFaculties();
    this.fetchAcademicRanks();
    this.fetchStatusTypes();
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.objectId.set(+params['id']);
        this.editMode.set(true);
        this.pageTitle.set('Rediģēt docentu');
        this.loadTeachingStaffData(this.objectId());
      }
    });
  }

  private loadTeachingStaffData(id: number | undefined): void {
    if (!id) return;
    this.teachingStaffService.findTeachingStaffById({tStaffId: id}).subscribe({
      next: (staff) => {
        console.log('Loaded staff data:', staff);
        // Populate form with existing data
        this.teachingStaffForm.patchValue({
          name: staff.name,
          surname: staff.surname,
          statusTypeId: staff.status?.statusTypeId,
          staffFacultyId: staff.staffFaculty?.facultyId,
          academicRankId: staff.staffAcademicRank?.academicRankId
        });

        if (staff.user) {
          this.userAuthDetails.set({
            email: staff.user.email,
            admin: staff.admin
          });
          this.authButtonText.set("rediģēt ēpastu");
        }
      },
      error: (err) => {
        this._snackBar.open("Neizdevās ielādēt datus", "Aizvērt", {duration: 5000});
        console.error(err);
      }
    });
  }

  onSubmit() {
    if (this.teachingStaffForm.valid) {
      const formData = this.prepareFormData();

      if (this.editMode()) {
        this.updateTeachingStaff(formData);
      } else {
        this.createTeachingStaff(formData);
      }
    }
  }

  private prepareFormData(): TeachingStaffRequest {
    return {
      name: this.teachingStaffForm.value.name!,
      surname: this.teachingStaffForm.value.surname!,
      statusId: this.teachingStaffForm.value.statusTypeId!,
      staffFacultyId: this.teachingStaffForm.value.staffFacultyId!,
      staffAcademicRankId: this.teachingStaffForm.value.academicRankId!,
      authDetails: this.userAuthDetails() || undefined
    };
  }

  private createTeachingStaff(data: TeachingStaffRequest): void {
    this.teachingStaffService.saveTeachingStaff({
      body: data
    }).subscribe({
      next: (id) => {
        this.emitTeachingStaff.emit(id);
        this._snackBar.open("Saglabāts", "Aizvērt", {duration: 5000});
        this.navigateBackFromCreateMode();
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open(err.error.errorMsg, "Aizvērt", {duration: 5000});
      }
    });
  }

  private updateTeachingStaff(data: TeachingStaffRequest): void {
    const id = this.objectId();
    if (id === undefined) return;
    this.teachingStaffService.updateTeachingStaffById({tStaffId: id, body: data}).subscribe({
      next: () => {
        this._snackBar.open("Izmaiņas saglabātas", "Aizvērt", {duration: 5000});
        this.navigateBackFromEditMode();
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open(err.error.errorMsg, "Aizvērt", {duration: 5000});
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

  private fetchFaculties(): Promise<void> {
    return new Promise((resolve, reject) => {
      const subscription = this.facultyService.findAllFaculties().subscribe({
        next: (faculties) => {
          if (faculties) {
            this.faculties.set(faculties);
          }
        },
        error: (err) => {
          reject(err);
        }
      });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    });
  }

  private fetchAcademicRanks(): Promise<void> {
    return new Promise((resolve, reject) => {
      const subscription = this.academicRankService.findAllAcademicRank().subscribe({
        next: (ranks) => {
          if (ranks) {
            this.academicRanks.set(ranks);
          }
        },
        error: (error) => {
          reject(error);
        }
      });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    });
  }

  private fetchStatusTypes(callback?: () => void) {
    const subscription = this.statusTypeService.findAllStatusTypes().subscribe({
      next: (statusTypes) => {
        this.statusTypes.set(statusTypes);
        if (callback) callback();
      },
      error: (err) => console.log(err)
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onEmittedUserAuthDetails(authDetails: RegistrationRequest) {
    this.onAddUserAuthDetails.set(false);
    this.userAuthDetails.set(authDetails);
    this.onAddUserAuthDetails.set(false);
    this.authButtonText.set("rediģēt ēpastu");
  }

  closeOrOpenAuthDetails() {
    this.onAddUserAuthDetails.set(!this.onAddUserAuthDetails());

    if (this.onAddUserAuthDetails() && this.userAuthDetails()) {
      // Set the form values when opening the user component
      setTimeout(() => {
        if (this.userComponent) {
          this.userComponent.setFormValues(
            this.userAuthDetails()?.email || '',
            this.userAuthDetails()?.admin || false
          );
        }
      });
    }
  }

  updateErrorMessage(controlName: keyof typeof this.teachingStaffForm.controls) {
    const control = this.teachingStaffForm.controls[controlName];
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
  onSelectBulkMode() {
    this.pageTitle.set("pievienot no faila");
    this.bulkMode.set(true);
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      this._snackBar.open("Lūdzu atlasiet CSV failu", "Aizvērt", {duration: 5000});
      return;
    }

    this.fileLoading.set(true);
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.fileContent = reader.result as string;
      this.fileLoading.set(false);
    };
    reader.onerror = () => {
      this._snackBar.open("Kļūda nolasot failu", "Aizvērt", {duration: 5000});
      this.fileLoading.set(false);
      this.selectedFile = null;
    };
    reader.readAsText(file);
  }

  submitFileToBackend() {
    if (!this.selectedFile) return;

    this.fileLoading.set(true);

    // Match the expected interface structure
    this.teachingStaffService.uploadTeachingStaff({
      body: {
        file: this.selectedFile
      }
    }).subscribe({
      next: (response) => {
        this._snackBar.open(response + " Docenti veiksmīgi pievienoti", "Aizvērt", {duration: 5000});
        this.navigateBackFromCreateMode();
        this.fileLoading.set(false);
      },
      error: (err) => {
        this._snackBar.open(err.error.errorMsg, "Aizvērt", {duration: 5000});
        this.fileLoading.set(false);
      }
    });
  }
  downloadCsv() {
    this.fileLoading.set(true);
    this.teachingStaffService.getTStaffCsvTemplate().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tStaff_import_template.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      },
      complete: () => {
        this._snackBar.open( "Ielāde veiksmīga", "Aizvērt", {duration: 5000});
        this.fileLoading.set(false);
      },
      error: (err) => {
        this._snackBar.open(err.error.errorMsg, "Aizvērt", {duration: 5000});
        this.fileLoading.set(false);
      }
    });
  }
}
