import {ColumnNames} from "../new-objects/object-columns";

export const CollapseData: ColumnNames[] = [

  {
    name: 'Amats, Vārds, Uzvārds',
    pathTo: 'teachingStaff.rankFullName',
    collection: 'ColumnsForTeacher',
    sortable: false
  },
  {
    name: 'Priekšmeta nosaukums',
    pathTo: 'course.courseName',
    collection: 'ColumnsForCourse',
    sortable: true
  },
  {
    name: 'Priekšmeta KP',
    pathTo: 'course.creditPoints',
    collection: 'ColumnsForCalc',
    sortable: true
  },
  {
    name: 'Alga',
    pathTo: 'teachingStaff.staffAcademicRank.salary',
    collection: 'ColumnsForSalary',
    sortable: true
  }
]

export const ColumnsForTeacher: ColumnNames[] = [

  {
    name: 'Amats, Vārds, Uzvārds',
    pathTo: 'teachingStaff.rankFullName',
    collection: 'ColumnsForTeacher',
    sortable: false
  },
  {
    name: 'Vārds',
    pathTo: 'teachingStaff.name',
    collection: 'ColumnsForTeacher',
    sortable: true
  },
  {
    name: 'Uzvārds',
    pathTo: 'teachingStaff.surname',
    collection: 'ColumnsForTeacher',
    sortable: true
  },
  {
    name: 'KP pilnai slodzei',
    pathTo: 'cpForFullTime',
    collection: 'ColumnsForTeacher',
    sortable: true
  },
  {
    name: 'Slodzes daļa',
    pathTo: 'cpProportionOnFullTime',
    collection: 'ColumnsForTeacher',
    sortable: false
  },
  {
    name: 'Amata nosaukums',
    pathTo: 'teachingStaff.positionTitle',
    collection: 'ColumnsForTeacher',
    sortable: true
  },
  {
    name: 'Amata grupa',
    pathTo: 'academicRankDetails.academicRank.rankName',
    collection: 'ColumnsForTeacher',
    sortable: true
  },
  {
    name: 'Statuss',
    pathTo: 'statusType.statusTypeName',
    collection: 'ColumnsForTeacher',
    sortable: true
  },
  {
    name: 'Iekļaut budžetā',
    pathTo: 'includeInBudget',
    collection: 'ColumnsForTeacher',
    sortable: true
  },
  {
    name: 'Pasniedzēja fakultāte',
    pathTo: 'teachingStaff.staffFaculty.facultyName',
    collection: 'ColumnsForTeacher',
    sortable: true
  },
];

export const ColumnsForCourse: ColumnNames[] = [

  {
    name: 'Semestris',
    pathTo: 'semester.semesterName',
    collection: 'ColumnsForCourse',
    sortable: true
  },
  {
    name: 'Studiju līmenis',
    pathTo: 'course.studyLevel',
    collection: 'ColumnsForCourse',
    sortable: true
  }
  , {
    name: 'Priekšmeta nosaukums',
    pathTo: 'course.courseName',
    collection: 'ColumnsForCourse',
    sortable: true
  }
  , {
    name: 'Programmas Daļa',
    pathTo: 'course.section',
    collection: 'ColumnsForCourse',
    sortable: true
  }
  , {
    name: 'Reģistrācija',
    pathTo: 'course.registrationType',
    collection: 'ColumnsForCourse',
    sortable: true
  }
  , {
    name: 'Lais kods',
    pathTo: 'course.courseCode',
    collection: 'ColumnsForCourse',
    sortable: true
  }
];
export const ColumnsForCalc: ColumnNames[] = [
  {
    name: 'KP/stundas',
    pathTo: 'creditPointsPerHour',
    collection: 'ColumnsForCalc',
    sortable: false
  }
  , {
    name: 'Priekšmeta KP',
    pathTo: 'course.creditPoints',
    collection: 'ColumnsForCalc',
    sortable: true
  }
  , {
    name: 'KP skaits grupai',
    pathTo: 'creditPointsPerGroup',
    collection: 'ColumnsForCalc',
    sortable: false
  }
  , {
    name: 'Grupu skaits',
    pathTo: 'groupAmount',
    collection: 'ColumnsForCalc',
    sortable: true
  },
  {
    name: 'Kontakt stundas',
    pathTo: 'contactHours',
    collection: 'ColumnsForCalc',
    sortable: true
  }

];
export const ColumnsForGeneralInfo: ColumnNames[] = [
  {
    name: 'Kursi',
    pathTo: 'myClasses',
    collection: 'ColumnsForGeneralInfo'
    ,
    sortable: true
  }
  , {
    name: 'Komentāri',
    pathTo: 'comments',
    collection: 'ColumnsForGeneralInfo',
    sortable: true
  }
]
export const ColumnsForSalary: ColumnNames[] = [
  {
    name: 'Budžeta pozīcija',
    pathTo: 'budgetPosition',
    collection: 'ColumnsForSalary',
    sortable: true
  }
  , {
    name: 'Alga',
    pathTo: 'academicRankDetails.salary',
    collection: 'ColumnsForSalary',
    sortable: true
  }
  , {
    name: 'Nozares koeficents',
    pathTo: 'industryCoefficient',
    collection: 'ColumnsForSalary',
    sortable: true
  }
  , {
    name: 'Alga mēnesī',
    pathTo: 'salaryPerMonth',
    collection: 'ColumnsForSalary',
    sortable: false
  }
  , {
    name: 'Vai atvaļinājums ieskaitās',
    pathTo: 'vacationMonths',
    collection: 'ColumnsForSalary',
    sortable: true
  }
  , {
    name: 'Mēnešu skaits',
    pathTo: 'monthSum',
    collection: 'ColumnsForSalary',
    sortable: true
  }
  , {
    name: 'Algai paredzēts',
    pathTo: 'expectedSalary',
    collection: 'ColumnsForSalary',
    sortable: true
  }
]
