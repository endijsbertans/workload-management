export interface WorkloadColumnSettings {
  collection: string,
    name: string,
    pathTo: string,
    sortable: boolean,
    visible: boolean,
    style: string,
    isMain: boolean
}

export interface ShownColumns {
  columnsForTeacher: boolean,
  columnsForCourse: boolean,
  columnsForCalc: boolean,
  columnsForGeneralInfo: boolean,
  columnsForSalary: boolean,
  columnsForWorkloadClasses: boolean
}

export interface WorkloadColumnSettings {
  collection: string,
  name: string,
  pathTo: string,
  sortable: boolean,
  visible: boolean,
  style: string,
  isMain: boolean
}
export const ColumnsForWorkloadList: WorkloadColumnSettings[] = [
  { collection: 'columnsForTeacher', name: 'Amats, Vārds, Uzvārds', pathTo: 'teachingStaff.rankFullName', sortable: false, visible: true, style: 'teacher-header', isMain: true },
  { collection: 'columnsForTeacher', name: 'Vārds', pathTo: 'teachingStaff.name', sortable: true, visible: true, style: 'teacher-header', isMain: false },
  { collection: 'columnsForTeacher', name: 'Uzvārds', pathTo: 'teachingStaff.surname', sortable: true, visible: true, style: 'teacher-header', isMain: false },
  { collection: 'columnsForTeacher', name: 'KP pilnai slodzei', pathTo: 'cpForFullTime', sortable: false, visible: true, style: 'teacher-header', isMain: false },
  { collection: 'columnsForTeacher', name: 'Slodzes daļa', pathTo: 'cpProportionOnFullTime', sortable: false, visible: true, style: 'teacher-header', isMain: false },
  { collection: 'columnsForTeacher', name: 'Amata nosaukums', pathTo: 'teachingStaff.positionTitle', sortable: true, visible: true, style: 'teacher-header', isMain: false },
  { collection: 'columnsForTeacher', name: 'Amata grupa', pathTo: 'academicRankDetails.academicRank.rankName', sortable: true, visible: true, style: 'teacher-header', isMain: false },
  { collection: 'columnsForTeacher', name: 'Statuss', pathTo: 'statusType.statusTypeName', sortable: true, visible: true, style: 'teacher-header', isMain: false },
  { collection: 'columnsForTeacher', name: 'Iekļaut budžetā', pathTo: 'includeInBudget', sortable: true, visible: true, style: 'teacher-header', isMain: false },
  { collection: 'columnsForTeacher', name: 'Pasniedzēja fakultāte', pathTo: 'teachingStaff.staffFaculty.facultyName', sortable: true, visible: true, style: 'teacher-header', isMain: false },
  { collection: 'columnsForCourse', name: 'Priekšmeta nosaukums', pathTo: 'course.courseName', sortable: true, visible: true, style: 'course-header', isMain: true },
  { collection: 'columnsForCourse', name: 'Semestris', pathTo: 'semester.semesterName', sortable: true, visible: true, style: 'course-header', isMain: false },
  { collection: 'columnsForCourse', name: 'Studiju līmenis', pathTo: 'course.studyLevel', sortable: true, visible: true, style: 'course-header', isMain: false },
  { collection: 'columnsForCourse', name: 'Programmas Daļa', pathTo: 'course.section', sortable: true, visible: true, style: 'course-header', isMain: false },
  { collection: 'columnsForCourse', name: 'Reģistrācija', pathTo: 'course.registrationType', sortable: true, visible: true, style: 'course-header', isMain: false },
  { collection: 'columnsForCourse', name: 'Lais kods', pathTo: 'course.courseCode', sortable: true, visible: true, style: 'course-header', isMain: false },
  { collection: 'columnsForCalc', name: 'KP skaits grupai', pathTo: 'creditPointsPerGroup', sortable: false, visible: true, style: 'calc-header', isMain: true },
  { collection: 'columnsForCalc', name: 'KP/stundas', pathTo: 'creditPointsPerHour', sortable: false, visible: true, style: 'calc-header', isMain: false },
  { collection: 'columnsForCalc', name: 'Grupu skaits', pathTo: 'groupAmount', sortable: true, visible: true, style: 'calc-header', isMain: false },
  { collection: 'columnsForCalc', name: 'Kontakt stundas', pathTo: 'contactHours', sortable: true, visible: true, style: 'calc-header', isMain: false },
  { collection: 'columnsForWorkloadClasses', name: 'Kursi', pathTo: 'className', sortable: true, visible: true, style: 'workloadClass-header', isMain: true },
  { collection: 'columnsForWorkloadClasses', name: 'Programma', pathTo: 'program', sortable: true, visible: true, style: 'workloadClass-header', isMain: false },
  { collection: 'columnsForWorkloadClasses', name: 'Studentu Skaits', pathTo: 'studentAmount', sortable: true, visible: true, style: 'workloadClass-header', isMain: false },
  { collection: 'columnsForGeneralInfo', name: 'Komentāri', pathTo: 'comments', sortable: true, visible: true, style: 'general-header', isMain: false },
  { collection: 'columnsForSalary', name: 'Alga', pathTo: 'academicRankDetails.salary', sortable: true, visible: true, style: 'salary-header', isMain: true },
  { collection: 'columnsForSalary', name: 'Budžeta pozīcija', pathTo: 'budgetPosition', sortable: true, visible: true, style: 'salary-header', isMain: false },
  { collection: 'columnsForSalary', name: 'Nozares koeficents', pathTo: 'industryCoefficient', sortable: true, visible: true, style: 'salary-header', isMain: false },
  { collection: 'columnsForSalary', name: 'Alga mēnesī', pathTo: 'salaryPerMonth', sortable: false, visible: true, style: 'salary-header', isMain: false },
  { collection: 'columnsForSalary', name: 'Vai atvaļinājums ieskaitās', pathTo: 'vacationMonths', sortable: true, visible: true, style: 'salary-header', isMain: false },
  { collection: 'columnsForSalary', name: 'Mēnešu skaits', pathTo: 'monthSum', sortable: true, visible: true, style: 'salary-header', isMain: false },
  { collection: 'columnsForSalary', name: 'Algai paredzēts', pathTo: 'expectedSalary', sortable: true, visible: true, style: 'salary-header', isMain: false }
];
