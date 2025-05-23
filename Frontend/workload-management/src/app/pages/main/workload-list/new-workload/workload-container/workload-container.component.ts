import {Component, inject, OnInit, signal} from '@angular/core';
import {WorkloadRequest} from "../../../../../services/models/workload-request";
import {EMPTY, of, switchMap} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {WorkloadService} from "../../../../../services/services/workload.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WorkloadResponse} from "../../../../../services/models/workload-response";
import {WorkloadFormComponent} from "../workload-form/workload-form.component";

@Component({
  selector: 'app-workload-container',
  imports: [
    WorkloadFormComponent
  ],
  templateUrl: './workload-container.component.html',
  standalone: true,
  styleUrl: './workload-container.component.scss'
})
export class WorkloadContainerComponent implements OnInit{
  workload: WorkloadResponse | null = null;
  initialWorkload = signal<WorkloadResponse | undefined>(undefined);
  editMode: boolean | undefined = undefined;
  private currentWorkloadId: number | null = null;
  private readonly _snackBar = inject(MatSnackBar);
  private readonly workloadService = inject(WorkloadService);
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.activeRoute.url.pipe(
      switchMap(urlSegments => {
        const currentRoute = urlSegments.map(segment => segment.path).join('/');
        if (currentRoute === 'new-workload') {
          this.editMode = false;
          return of(null);
        }
        return this.activeRoute.paramMap.pipe(
          switchMap(params => {
            const idParam = params.get('id');
            const id = idParam ? Number(idParam) : NaN;
            if (isNaN(id) || id <= 0) {
              this.router.navigate(['/main/admin-workload'], { replaceUrl: true });
              this._snackBar.open("Nepareizs id", "Close", { duration: 5000 });
              return EMPTY;
            }
            this.currentWorkloadId = id;
            return this.workloadService.findWorkloadById({ workloadId: id });
          })
        );
      })
    ).subscribe({
      next: workload => {
        if (workload) {
          this.editMode = true;
          this.initialWorkload.set(workload);
        }
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open(err.error.errorMsg, "Aizvērt", { duration: 5000 });
        this.router.navigate(['/main/admin-workload'], { replaceUrl: true });
      }
    });
  }

  handleFormSubmit(request: WorkloadRequest) {
    console.log('Container received form submission:', request);

    if (this.editMode && this.currentWorkloadId) {
      console.log('Updating existing workload with ID:', this.currentWorkloadId);
      this.workloadService.updateWorkloadById({workloadId: this.currentWorkloadId, body: request }).subscribe({
        next: id => {
          console.log('Updated workload id:', id);
          this._snackBar.open("Atjaunots", "Aizvērt", { duration: 5000 });
          this.router.navigate(['/main/admin-workload'], {replaceUrl: true });
        },
        error: err => {
          console.error('Error updating workload:', err);
          this._snackBar.open(err.error?.errorMsg ?? "Kļūda atjaunojot datus", "Aizvērt", { duration: 5000 });
        }
      });
    } else {
      console.log('Creating new workload');
      this.workloadService.saveWorkload({ body: request }).subscribe({
        next: id => {
          console.log('Created workload id:', id);
          this._snackBar.open("Saglabāts", "Aizvērt", { duration: 5000 });
          this.router.navigate(['/main/admin-workload'], { replaceUrl: true });
        },
        error: err => {
          console.error('Error creating workload:', err);
          this._snackBar.open(err.error?.errorMsg ?? "Kļūda saglabājot datus", "Aizvērt", { duration: 5000 });
        }
      });
    }
  }
}
