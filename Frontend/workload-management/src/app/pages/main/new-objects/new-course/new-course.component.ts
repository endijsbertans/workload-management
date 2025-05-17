import {Component, EventEmitter, inject, OnInit, Output, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {ActivatedRoute, Router} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {CourseService} from "../../../../services/services";
import {CourseRequest} from "../../../../services/models/course-request";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatProgressBar} from "@angular/material/progress-bar";


@Component({
  selector: 'app-new-course',
  imports: [
    MatButton,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatProgressBar,
  ],
  templateUrl: './new-course.component.html',
  standalone: true,
  styleUrls: ['./new-course.component.scss', '../new-object-style.scss']
})
export class NewCourseComponent implements OnInit {
  @Output() emitCourse = new EventEmitter<number>();
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  courseService = inject(CourseService);
  private readonly _snackBar = inject(MatSnackBar);


  errorMessage = signal('');
  editMode = signal(false);
  objectId = signal<number | undefined>(undefined);
  pageTitle = signal('Pievienot jaunu kursu');
  errorMsg: Array<string> = [];
  selectedFile: any;
  fileLoading = signal(false);
  fileContent: string | null = null;
  bulkMode = signal(false);
  courseForm = new FormGroup({
    name: new FormControl('', {
      validators: [
        Validators.minLength(3),
        Validators.required],
    }),
    courseCode: new FormControl('', {
      validators: [
        Validators.minLength(3),
        Validators.required],
    }),
    creditPoints: new FormControl(1, {
      validators: [
        Validators.required],
    }),
    registrationType: new FormControl('', {
      validators: [
        Validators.minLength(3),
        Validators.required],
    }),
    section: new FormControl('', {
      validators: [
        Validators.minLength(3),
        Validators.required],
    })
  });

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      if (params['id']) {
        this.objectId.set(+params['id']);
        this.editMode.set(true);
        this.pageTitle.set('Rediģēt kursu');
        this.loadCourseData(this.objectId());
      }
    });
  }

  private loadCourseData(id: number | undefined): void {
    if (!id) return;
    this.courseService.findCourseById({courseId: id}).subscribe({
      next: (course) => {
        this.courseForm.patchValue({
          name: course.courseName,
          courseCode: course.courseCode,
          creditPoints: course.creditPoints,
          registrationType: course.registrationType,
          section: course.section,
        });
      },
      error: (err) => {
        this._snackBar.open("Neizdevās ielādēt datus", "Aizvērt", {duration: 5000});
        console.error(err);
      }
    });
  }

  onSubmit() {
    if (this.courseForm.valid) {
      const formData = this.prepareFormData();

      if (this.editMode()) {
        this.updateCourse(formData);
      } else {
        this.createCourse(formData);
      }
    }
  }

  private prepareFormData(): CourseRequest {
    return {
      courseName: this.courseForm.value.name!,
      courseCode: this.courseForm.value.courseCode!,
      creditPoints: this.courseForm.value.creditPoints!,
      registrationType: this.courseForm.value.registrationType!,
      section: this.courseForm.value.section!,
    };
  }

  createCourse(data: CourseRequest) {
    this.courseService.saveCourse({
      body: data
    }).subscribe({
      next: (id) => {
        this.emitCourse.emit(id);
        this._snackBar.open("Saglabāts", "Aizvērt", {duration: 5000});
        this.navigateBackFromCreateMode();
      },
      error: (err) => {
        this._snackBar.open(err.error.errorMsg, "Aizvērt", {duration: 5000});
      }
    });
  }

  private updateCourse(data: CourseRequest): void {
    const id = this.objectId();
    if (id === undefined) return;

    this.courseService.updateCourseById({"courseId": id, body: data}).subscribe({
      next: () => {
        this._snackBar.open("Izmaiņas saglabātas", "Aizvērt", {duration: 5000});
        this.navigateBackFromEditMode();
      },
      error: (err) => {
        console.error(err);
        this._snackBar.open(err.error.errorMsg ?? "Kļūda atjaunojot kursu", "Aizvērt", {duration: 5000});
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



  updateErrorMessage(controlName: keyof typeof this.courseForm.controls) {
    const control = this.courseForm.controls[controlName];
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

    this.courseService.uploadCourse({
      body: {
        file: this.selectedFile
      }
    }).subscribe({
      next: (response) => {
        this._snackBar.open(response + " Kursi veiksmīgi pievienoti", "Aizvērt", {duration: 5000});
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
    this.courseService.getCourseCsvTemplate().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'course_import_template.csv';
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
