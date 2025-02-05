import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatStep, MatStepper, MatStepperNext} from "@angular/material/stepper";
import {TeachingStaffService} from "../../../../services/services/teaching-staff.service";
import {TeachingStaffResponse} from "../../../../services/models/teaching-staff-response";
import {ReplaySubject, Subject, take, takeUntil} from "rxjs";
import {MatFormField, MatOption, MatSelect} from "@angular/material/select";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {AsyncPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {RouterLink, RouterOutlet} from "@angular/router";
import {NewUserComponent} from "./new-user/new-user.component";

@Component({
  selector: 'app-new-workload',
  imports: [
    MatStepper,
    MatStep,
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    NgxMatSelectSearchModule,
    AsyncPipe,
    MatStepperNext,
    MatButton,
    RouterLink,
    RouterOutlet

  ],
  templateUrl: './new-workload.component.html',
  standalone: true,
  styleUrl: './new-workload.component.scss'
})
export class NewWorkloadComponent implements OnInit{
  private readonly teachingStaffService = inject(TeachingStaffService);
  errorMsg = '';
  tStaff: TeachingStaffResponse[] = [];

  public filteredTeachingStaff: ReplaySubject<TeachingStaffResponse[]> = new ReplaySubject<TeachingStaffResponse[]>(1);
  @ViewChild('singleSelect', {static: true}) singleSelect!: MatSelect;
  protected _onDestroy = new Subject<void>();
  onSubmit() {}
  form = new FormGroup({
    tStaffCtrl: new FormControl<TeachingStaffResponse | null >(null),
    tStaffFilterCtrl: new FormControl<string>('')
  });

  isLinear = false;
  ngOnInit() {
    console.log(this.form.controls);
    // set initial selection
    //this.tStaffCtrl.setValue(this.tStaffCtrl[0]);
    this.findAllTeachingStaff();
    // load the initial bank list

    console.log("LOADINGIN LIST");
    console.log(this.filteredTeachingStaff)
    // listen for search field value changes

    this.form.controls.tStaffFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterTeachingStaff();
      });
  }
  private findAllTeachingStaff() {
    this.teachingStaffService.findAllTeachingStaff().subscribe({
      next: (tStaff) => {
        if (tStaff) {
          this.tStaff = tStaff;
          console.log(this.tStaff);
          this.filteredTeachingStaff.next(this.tStaff.slice());
        }
      }
    });
  }
  ngAfterViewInit() {
    this.setInitialValue();
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  protected setInitialValue() {
    this.filteredTeachingStaff
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {

        this.singleSelect.compareWith = (a: TeachingStaffResponse, b: TeachingStaffResponse) => a && b && a.teachingStaffId === b.teachingStaffId;
      });
  }
  protected filterTeachingStaff() {
    if (!this.tStaff) {
      return;
    }
    // get the search keyword
    let search = this.form.controls.tStaffFilterCtrl.value;
    if (!search) {
      this.filteredTeachingStaff.next(this.tStaff.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredTeachingStaff.next(
      this.tStaff.filter(tStaff => tStaff.user && tStaff.user.name && tStaff.user.name.toLowerCase().indexOf(search) > -1)
    );
  }
}
