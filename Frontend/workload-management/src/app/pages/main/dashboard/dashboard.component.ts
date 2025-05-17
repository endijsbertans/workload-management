import {Component, OnInit, inject,  ViewChild, ElementRef, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { WorkloadStatsService } from '../../../services/services/workload-stats.service';
import { SemesterControllerService } from '../../../services/services/semester-controller.service';
import { SemesterResponse } from '../../../services/models/semester-response';
import { TokenService } from '../../../services/token/token.service';
import { Chart, ChartType } from 'chart.js/auto';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  private readonly workloadStatsService = inject(WorkloadStatsService);
  private readonly semesterService = inject(SemesterControllerService);
  private readonly tokenService = inject(TokenService);

  isAdmin = this.tokenService.isAdmin();
  isLoading = signal(true);
  semesters: SemesterResponse[] = [];
  selectedSemesterId?: number;

  summary: Record<string, any> = {};
  classDistribution: Record<string, any>[] = [];
  courseDistribution: Record<string, any>[] = [];
  facultyDistribution: Record<string, any>[] = [];
  teacherComparison: Record<string, any>[] = [];

  @ViewChild('classChart') classChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('courseChart') courseChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('facultyChart') facultyChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('teacherChart') teacherChartRef!: ElementRef<HTMLCanvasElement>;

  classChart: Chart | null = null;
  courseChart: Chart | null = null;
  facultyChart: Chart | null = null;
  teacherChart: Chart | null = null;

  ngOnInit(): void {
    this.loadSemesters();
  }
  loadSemesters(): void {
    this.semesterService.findAllSemesters().subscribe({
      next: (semesters) => {
        this.semesters = semesters;
        if (semesters.length > 0) {
          // Find current year's semester
          const currentYear = new Date().getFullYear();
          const currentSemester = semesters.find(s => s.year === currentYear);

          if (currentSemester) {
            this.selectedSemesterId = currentSemester.semesterId;
          } else {
            // Otherwise, select the most recent semester
            const sortedSemesters = [...semesters].sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
            this.selectedSemesterId = sortedSemesters[0].semesterId;
          }

          this.loadDashboardData();
        }
      },
      error: (err) => {
        console.error('Error loading semesters', err);
        this.isLoading.set(false);
      }
    });
  }

  loadDashboardData(): void {
    this.isLoading.set(true);

    // Load summary data
    this.workloadStatsService.getWorkloadSummary({ semesterId: this.selectedSemesterId }).subscribe({
      next: (data: Record<string, any>) => {
        this.summary = data;
        this.isLoading.set(false);
      },
      error: (err: Error) => {
        console.error('Error loading summary data', err);
        this.isLoading.set(false);
      }
    });

    // Load class distribution
    this.workloadStatsService.getClassDistribution({ semesterId: this.selectedSemesterId }).subscribe({
      next: (data: Record<string, any>[]) => {
        this.classDistribution = data;
        setTimeout(() => this.renderClassChart(), 500);
      },
      error: (err: Error) => console.error('Error loading class distribution', err)
    });

    // Load course distribution
    this.workloadStatsService.getCourseDistribution({ semesterId: this.selectedSemesterId }).subscribe({
      next: (data: Record<string, any>[]) => {
        this.courseDistribution = data;
        setTimeout(() => this.renderCourseChart(), 500);
      },
      error: (err: Error) => console.error('Error loading course distribution', err)
    });

    // Load faculty distribution
    this.workloadStatsService.getFacultyDistribution({ semesterId: this.selectedSemesterId }).subscribe({
      next: (data: Record<string, any>[]) => {
        this.facultyDistribution = data;
        setTimeout(() => this.renderFacultyChart(), 500);
      },
      error: (err: Error) => console.error('Error loading faculty distribution', err)
    });

  }

  onSemesterChange(): void {
    this.loadDashboardData();
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('lv-LV', { style: 'currency', currency: 'EUR' }).format(value);
  }

  renderClassChart(): void {
    if (!this.classChartRef?.nativeElement || this.classDistribution.length === 0) {
      return;
    }

    // Destroy previous chart if it exists
    if (this.classChart) {
      this.classChart.destroy();
    }

    const ctx = this.classChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const labels = this.classDistribution.map((item: Record<string, any>) => item['className'] as string);
    const data = this.classDistribution.map((item: Record<string, any>) => item['creditPoints'] as number);

    this.classChart = new Chart(ctx, {
      type: 'pie' as ChartType,
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgba(6, 118, 80, 1)',
            'rgba(227, 83, 54, 1)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)'
          ],
          borderColor: [
            'rgba(6, 118, 80, 1)',
            'rgba(227, 83, 54, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Klašu sadalījums'
          }
        }
      }
    });
  }

  renderCourseChart(): void {
    if (!this.courseChartRef?.nativeElement || this.courseDistribution.length === 0) {
      return;
    }

    // Destroy previous chart if it exists
    if (this.courseChart) {
      this.courseChart.destroy();
    }

    const ctx = this.courseChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const labels = this.courseDistribution.map((item: Record<string, any>) => item['courseName'] as string);
    const data = this.courseDistribution.map((item: Record<string, any>) => item['creditPoints'] as number);

    this.courseChart = new Chart(ctx, {
      type: 'pie' as ChartType,
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgba(6, 118, 80, 1)',
            'rgba(227, 83, 54, 1)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)'
          ],
          borderColor: [
            'rgba(6, 118, 80, 1)',
            'rgba(227, 83, 54, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Kursu sadalījums'
          }
        }
      }
    });
  }

  renderFacultyChart(): void {
    if (!this.facultyChartRef?.nativeElement || this.facultyDistribution.length === 0) {
      return;
    }

    // Destroy previous chart if it exists
    if (this.facultyChart) {
      this.facultyChart.destroy();
    }

    const ctx = this.facultyChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const labels = this.facultyDistribution.map((item: Record<string, any>) => item['faculty'] as string);
    const data = this.facultyDistribution.map((item: Record<string, any>) => item['creditPoints'] as number);

    this.facultyChart = new Chart(ctx, {
      type: 'bar' as ChartType,
      data: {
        labels: labels,
        datasets: [{
          label: 'Kredītpunkti',
          data: data,
          backgroundColor: 'rgba(6, 118, 80, 1)',
          borderColor: 'rgba(6, 118, 80, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Kredītpunktu sadalījums pa fakultātēm'
          }
        }
      }
    });
  }
}
