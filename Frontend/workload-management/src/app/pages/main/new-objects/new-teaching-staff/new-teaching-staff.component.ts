import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {FacultyService, TeachingStaffService} from "../../../../services/services";
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
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly teachingStaffService = inject(TeachingStaffService)
  private readonly facultyService = inject(FacultyService)

  isFetching = signal(false);
  faculties = signal<FacultyResponse[] | undefined>(undefined);
  errorMessage = signal('');
  onNewFaculty = signal(false);
  onAddUserAuthDetails = signal(false);
  userAuthDetails = signal< RegistrationRequest | undefined>(undefined);
  authButtonText = signal("Izveidot autentifikācijas detaļas");

  teachingStaffRequest: TeachingStaffRequest =
    {name: '', surname: '', positionTitle: '', staffFaculty: {facultyName: '', facultyFullName: ''}, authDetails:undefined}
  errorMsg: Array<string> = [];
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
        Validators.minLength(3),
        Validators.required],
    }),
  });

  ngOnInit(): void {
    this.isFetching.set(true);
    this.fetchFaculties();

  }

  updateErrorMessage() {
    // TODO
    if (this.teachingStaffForm.controls.name.hasError('required')) {
      this.errorMessage.set('Vārds ir obligāts');
    } else if (this.teachingStaffForm.controls.name.hasError('email')) {
      this.errorMessage.set('Nepareizs ēpasts');
    } else {
      this.errorMessage.set('');
    }
  }

  onSubmit() {
      console.log(this.teachingStaffForm.controls);
      if (this.teachingStaffForm.value.name &&
        this.teachingStaffForm.value.surname &&
        this.teachingStaffForm.value.positionTitle &&
        this.teachingStaffForm.value.staffFaculty
      ) {
        this.teachingStaffRequest.name = this.teachingStaffForm.value.name;
        this.teachingStaffRequest.surname = this.teachingStaffForm.value.surname;
        this.teachingStaffRequest.positionTitle = this.teachingStaffForm.value.positionTitle;
        this.teachingStaffRequest.staffFaculty = this.teachingStaffForm.value.staffFaculty;
        if(this.userAuthDetails()){
          this.teachingStaffRequest.authDetails = this.userAuthDetails();
        }
        this.teachingStaffService.saveTeachingStaff({
          body: this.teachingStaffRequest
        }).subscribe({
          next: () => {

          },
          error: (err) => {
            console.log(this.errorMsg);
            this.errorMsg = err.error.validationErrors;

          }
        })
      }

      this.router.navigate(['..'], { relativeTo: this.activeRoute });
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
        complete: () => {
          this.isFetching.set(false);
          resolve();
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

  onEmittedUserAuthDetails(authDetails: RegistrationRequest) {
    this.onAddUserAuthDetails.set(false);
    this.userAuthDetails.set(authDetails);
    this.onAddUserAuthDetails.set(false);
    this.authButtonText.set("rediģēt ēpastu");
  }

  closeOrOpenAuthDetails() {
    this.onAddUserAuthDetails.set(!this.onAddUserAuthDetails());
  }
}
