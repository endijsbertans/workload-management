export interface ColumnNames {
  name: string,
  pathTo: string,
  collection: string
}

export const CollapseData: ColumnNames[] = [

  {
    name: 'Amats, Vārds, Uzvārds',
    pathTo: 'teachingStaff.rankFullName',
    collection: 'ColumnsForTeacher'
  },
  {
    name: 'Priekšmeta nosaukums',
    pathTo: 'course.courseName',
    collection: 'ColumnsForCourse'
  },
  {
    name: 'Priekšmeta KP',
    pathTo: 'course.creditPoints',
    collection: 'ColumnsForCalc'
  },
  {
    name: 'Alga',
    pathTo: 'teachingStaff.staffAcademicRank.salary',
    collection: 'ColumnsForSalary'
  }
]
export const ColumnsForActions: ColumnNames[] = [
  {
    name: 'delete',
    pathTo: 'delete',
    collection: 'actions'
  },
  {
    name: 'edit',
    pathTo: 'edit',
    collection: 'actions'
  }
]

export const ColumnsForTeacher: ColumnNames[] = [

  {
    name: 'Amats, Vārds, Uzvārds',
    pathTo: 'teachingStaff.rankFullName',
    collection: 'ColumnsForTeacher'
  },
  {
    name: 'Vārds',
    pathTo: 'teachingStaff.name',
    collection: 'ColumnsForTeacher'
  },
  {
    name: 'Uzvārds',
    pathTo: 'teachingStaff.surname',
    collection: 'ColumnsForTeacher'
  },
  {
    name: 'KP pilnai slodzei',
    pathTo: 'cpForFullTime',
    collection: 'ColumnsForTeacher'
  },
  {
    name: 'Slodzes daļa',
    pathTo: 'cpProportionOnFullTime',
    collection: 'ColumnsForTeacher'
  },
  {
    name: 'Amata nosaukums',
    pathTo: 'teachingStaff.positionTitle',
    collection: 'ColumnsForTeacher'
  },
  {
    name: 'Amata grupa',
    pathTo: 'teachingStaff.staffAcademicRank.rankName',
    collection: 'ColumnsForTeacher'
  },
  {
    name: 'Statuss',
    pathTo: 'statusType.statusTypeName',
    collection: 'ColumnsForTeacher'
  },
  {
    name: 'Iekļaut budžetā',
    pathTo: 'includeInBudget',
    collection: 'ColumnsForTeacher'
  },
  {
    name: 'Pasniedzēja fakultāte',
    pathTo: 'teachingStaff.staffFaculty.facultyName',
    collection: 'ColumnsForTeacher'
  },
];

export const ColumnsForCourse: ColumnNames[] = [

  {
    name: 'Semestris',
    pathTo: 'semester',
    collection: 'ColumnsForCourse'
  }
  , {
    name: 'Priekšmeta nosaukums',
    pathTo: 'course.courseName',
    collection: 'ColumnsForCourse'
  }
  , {
    name: 'Programmas Daļa',
    pathTo: 'course.section',
    collection: 'ColumnsForCourse'
  }
  , {
    name: 'Reģistrācija',
    pathTo: 'course.registrationType',
    collection: 'ColumnsForCourse'
  }
  , {
    name: 'Lais kods',
    pathTo: 'course.courseCode',
    collection: 'ColumnsForCourse'
  }
];
export const ColumnsForCalc: ColumnNames[] = [
  {
    name: 'KP/stundas',
    pathTo: 'creditPointsPerHour',
    collection: 'ColumnsForCalc'
  }
  , {
    name: 'Priekšmeta KP',
    pathTo: 'course.creditPoints',
    collection: 'ColumnsForCalc'
  }
  , {
    name: 'KP skaits grupai',
    pathTo: 'creditPointsPerGroup',
    collection: 'ColumnsForCalc'
  }
  , {
    name: 'Grupu skaits',
    pathTo: 'groupAmount',
    collection: 'ColumnsForCalc'
  },
  {
    name: 'Kontakt stundas',
    pathTo: 'contactHours',
    collection: 'ColumnsForCalc'
  }

];
export const ColumnsForGeneralInfo: ColumnNames[] = [
  {
    name: 'Kursi',
    pathTo: 'myClasses',
    collection: 'ColumnsForGeneralInfo'
  }
  , {
    name: 'Komentāri',
    pathTo: 'comments',
    collection: 'ColumnsForGeneralInfo'
  }
]
export const ColumnsForSalary: ColumnNames[] = [
  {
    name: 'Budžeta pozīcija',
    pathTo: 'budgetPosition',
    collection: 'ColumnsForSalary'
  }
  , {
    name: 'Alga',
    pathTo: 'teachingStaff.staffAcademicRank.salary',
    collection: 'ColumnsForSalary'
  }
  , {
    name: 'Nozares koeficents',
    pathTo: 'industryCoefficient',
    collection: 'ColumnsForSalary'
  }
  , {
    name: 'Alga mēnesī',
    pathTo: 'salaryPerMonth',
    collection: 'ColumnsForSalary'
  }
  , {
    name: 'Vai atvaļinājums ieskaitās',
    pathTo: 'vacationMonths',
    collection: 'ColumnsForSalary'
  }
  , {
    name: 'Mēnešu skaits',
    pathTo: 'monthSum',
    collection: 'ColumnsForSalary'
  }
  , {
    name: 'Algai paredzēts',
    pathTo: 'expectedSalary',
    collection: 'ColumnsForSalary'
  }
]
