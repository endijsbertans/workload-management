import {Component, inject} from '@angular/core';
import {WorkloadService} from "../../services/services";
import {Router} from "@angular/router";
import {PageResponseWorkloadResponse} from "../../services/models/page-response-workload-response";
import {WorkloadResponse} from "../../services/models/workload-response";
import {findAllWorkloads} from "../../services/fn/workload/find-all-workloads";

@Component({
  selector: 'app-workload-list',
  standalone: true,
  imports: [],
  templateUrl: './workload-list.component.html',
  styleUrl: './workload-list.component.scss'
})
export class WorkloadListComponent {
  private readonly workloadService = inject(WorkloadService);
  private readonly router = inject(Router);
  workloadResponse: PageResponseWorkloadResponse = {};
  public page = 0;
  public size = 10;
  ngOnInit(){
    this.findAllWorkloads();
  }
  private findAllWorkloads() {
    this.workloadService.findAllWorkloads({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (workloads) => {
        if (workloads.content) {
          console.log(workloads.content[0]);
        }
        this.workloadResponse = workloads;
      }
    });
  }
}
