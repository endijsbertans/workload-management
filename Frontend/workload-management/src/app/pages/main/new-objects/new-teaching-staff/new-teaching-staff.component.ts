import {Component, DestroyRef, EventEmitter, inject, OnInit, Output, signal} from '@angular/core';
import {AcademicRankService, FacultyService, TeachingStaffService} from "../../../../services/services";
import {FacultyResponse} from "../../../../services/models/faculty-response";

import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";

import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {NewFacultyComponent} from "../new-faculty/new-faculty.component";
import {FacultyRequest} from "../../../../services/models/faculty-request";
import {NewUserComponent} from "../new-user/new-user.component";
import {RegistrationRequest} from "../../../../services/models/registration-request";
import {TeachingStaffRequest} from "../../../../services/models/teaching-staff-request";
import {AcademicRankResponse} from "../../../../services/models/academic-rank-response";



@Component({
  selector: 'app-new-teaching-staff',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOption,
    MatSelect,
    MatButton,
    NewFacultyComponent,
    NewUserComponent,
  ],
  templateUrl: './new-teaching-staff.component.html',
  standalone: true,
  styleUrl: './new-teaching-staff.component.scss'
})
export class NewTeachingStaffComponent implements OnInit {
  @Output() emitTeachingStaff = new EventEmitter<number>();
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly teachingStaffService = inject(TeachingStaffService)
  private readonly facultyService = inject(FacultyService)
  private readonly academicRankService = inject(AcademicRankService)

  faculties = signal<FacultyResponse[] | undefined>(undefined);
  academicRanks = signal<AcademicRankResponse[] | undefined>(undefined);
  onNewFaculty = signal(false);
  onAddUserAuthDetails = signal(false);
  userAuthDetails = signal< RegistrationRequest | undefined>(undefined);
  authButtonText = signal("Izveidot autentifikācijas detaļas");
  errorMessage = signal('');

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
    positionTitle: new FormControl('', {
      validators: [
        Validators.minLength(3),
        Validators.required],
    }),
    staffFaculty: new FormControl<FacultyResponse | undefined>(undefined, {
      validators: [
        Validators.required],
    }),
    academicRank: new FormControl<AcademicRankResponse | undefined>(undefined, {
      validators: [
        Validators.required],
    }),
  });

  ngOnInit(): void {
    this.fetchFaculties();
    this.fetchAcademicRanks();
  }



  onSubmit() {
      console.log(this.teachingStaffForm.controls);
      if (this.teachingStaffForm.value.name &&
        this.teachingStaffForm.value.surname &&
        this.teachingStaffForm.value.positionTitle &&
        this.teachingStaffForm.value.staffFaculty &&
        this.teachingStaffForm.value.academicRank
      ) {
        this.teachingStaffRequest = {
          name: this.teachingStaffForm.value.name,
          surname: this.teachingStaffForm.value.surname,
          positionTitle: this.teachingStaffForm.value.positionTitle,
          staffFaculty: this.teachingStaffForm.value.staffFaculty,
          staffAcademicRank: this.teachingStaffForm.value.academicRank,
          authDetails: this.userAuthDetails() || undefined
        };
        if(this.userAuthDetails()){
          this.teachingStaffRequest.authDetails = this.userAuthDetails();
        }
        this.teachingStaffService.saveTeachingStaff({
          body: this.teachingStaffRequest
        }).subscribe({
          next: (id) => {
            this.emitTeachingStaff.emit( id );
          },
          error: (err) => {
            console.log(err);
          }
        })
      }

      this.router.navigate(['..'], {
        relativeTo: this.activeRoute,
        replaceUrl: true});
  }

  addNewFaculty() {
    this.onNewFaculty.set(!this.onNewFaculty());
  }
  onEmittedFaculty(event: FacultyRequest) {
    this.onNewFaculty.set(false);

    this.fetchFaculties().then(() => {
      const faculties = this.faculties();
      if (faculties) {
        const faculty = faculties.find(faculty => faculty.facultyName == event.facultyName);
        if (faculty) {
          this.teachingStaffForm.controls.staffFaculty.setValue(faculty, { emitModelToViewChange: false });
          console.log(this.teachingStaffForm.controls.staffFaculty);
        }
      }
    }).catch(err => {
      console.error("Failed to fetch faculties", err);
    });
  }

  private fetchFaculties():Promise<void> {
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
  private fetchAcademicRanks():Promise<void> {
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
  onEmittedUserAuthDetails(authDetails: RegistrationRequest) {
    this.onAddUserAuthDetails.set(false);
    this.userAuthDetails.set(authDetails);
    this.onAddUserAuthDetails.set(false);
    this.authButtonText.set("rediģēt ēpastu");
  }

  closeOrOpenAuthDetails() {
    this.onAddUserAuthDetails.set(!this.onAddUserAuthDetails());
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
}
