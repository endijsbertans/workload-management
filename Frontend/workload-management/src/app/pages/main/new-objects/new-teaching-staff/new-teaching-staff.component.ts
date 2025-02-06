import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {FacultyService} from "../../../../services/services";
import {FacultyResponse} from "../../../../services/models/faculty-response";

import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink, RouterOutlet} from "@angular/router";
import {register} from "../../../../services/fn/authentication/register";
import {NewUserComponent} from "../new-user/new-user.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {NewFacultyComponent} from "../new-faculty/new-faculty.component";
import {FacultyRequest} from "../../../../services/models/faculty-request";
import {teeth} from "@igniteui/material-icons-extended";


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
  ],
  templateUrl: './new-teaching-staff.component.html',
  standalone: true,
  styleUrl: './new-teaching-staff.component.scss'
})
export class NewTeachingStaffComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly facultyService = inject(FacultyService)
  isFetching = signal(false);
  faculties = signal<FacultyResponse[] | undefined>(undefined);
  errorMessage = signal('');
  onNewFaculty = signal(false);
  onAddAuthority = signal(false);
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

  protected readonly register = register;
  protected readonly NewUserComponent = NewUserComponent;

  onSubmit() {

  }

  addNewFaculty() {
    this.onNewFaculty.set(!this.onNewFaculty());
  }

  onEmittedFaculty(event: FacultyRequest) {
    this.onNewFaculty.set(false);

    this.fetchFaculties().then(() => {
      const faculties = this.faculties();
      console.log("TEAAAA1");
      if (faculties) {
        const faculty = faculties.find(faculty => faculty.facultyName == event.facultyName);
        console.log(faculties);
        console.log(faculty);
        if (faculty) {
          // Set the form control value and suppress emission to avoid triggering view changes
          this.teachingStaffForm.controls.staffFaculty.setValue(faculty, { emitModelToViewChange: false });
          console.log("TEAAAA");
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
}
