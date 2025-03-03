export interface ColumnNames {
  name: string,
  pathTo: string,
  collection: string,
  sortable: boolean
}

export const ColumnsForTeacherResponse: ColumnNames[] = [
  {
    name: 'Vārds',
    pathTo: 'name',
    collection: 'ColumnsForTeacher',
    sortable: true
  },
  {
    name: 'Uzvārds',
    pathTo: 'surname',
    collection: 'ColumnsForTeacher',
    sortable: true
  },
  {
    name: 'Amata nosaukums',
    pathTo: 'positionTitle',
    collection: 'ColumnsForTeacher',
    sortable: true
  },
  {
    name: 'Pasniedzēja fakultāte',
    pathTo: 'staffFaculty.facultyName',
    collection: 'ColumnsForTeacher',
    sortable: true
  },
  {
    name: 'Amata grupa',
    pathTo: 'staffAcademicRank.abbreviation',
    collection: 'ColumnsForTeacher',
    sortable: true
  },
  {
    name: 'Ēpasts',
    pathTo: 'user.email',
    collection: 'ColumnsForTeacher',
    sortable: true
  },
  {
    name: 'Profils apstiprināts',
    pathTo: 'user.enabled',
    collection: 'ColumnsForTeacher',
    sortable: true
  }
];

export const ColumnsForCourseResponse: ColumnNames[] = [
  {
    name: 'Studiju līmenis',
    pathTo: 'studyLevel',
    collection: 'ColumnsForCourse',
    sortable: true
  }
  , {
    name: 'Priekšmeta nosaukums',
    pathTo: 'courseName',
    collection: 'ColumnsForCourse',
    sortable: true
  }
  , {
    name: 'Programmas Daļa',
    pathTo: 'section',
    collection: 'ColumnsForCourse',
    sortable: true
  }
  , {
    name: 'Reģistrācija',
    pathTo: 'registrationType',
    collection: 'ColumnsForCourse',
    sortable: true
  }
  , {
    name: 'Lais kods',
    pathTo: 'courseCode',
    collection: 'ColumnsForCourse',
    sortable: true
  },
  {
    name: 'Priekšmeta KP',
    pathTo: 'creditPoints',
    collection: 'ColumnsForCourse',
    sortable: true
  },
  {
    name: 'Nepieciešamais amats',
    pathTo: 'necessaryAcademicRank.rankName',
    collection: 'ColumnsForCourse',
    sortable: true
  }
];
export const ColumnsForClassResponse: ColumnNames[] = [
  {
    name: 'Klase',
    pathTo: 'className',
    collection: 'ColumnsForClass',
    sortable: true
  }
  , {
    name: 'Gads',
    pathTo: 'classYear',
    collection: 'ColumnsForClass',
    sortable: true
  }
  , {
    name: 'studentu daudzums',
    pathTo: 'studentAmount',
    collection: 'ColumnsForClass',
    sortable: true
  }
];
export const ColumnsForAcademicRankResponse: ColumnNames[] = [
  {
    name: 'Amats',
    pathTo: 'rankName',
    collection: 'columnsForAcademicRankResponse',
    sortable: true
  }
  , {
    name: 'Abreviatūra',
    pathTo: 'abbreviation',
    collection: 'columnsForAcademicRankResponse',
    sortable: true
  }
];
export const ColumnsForAcademicRankDetailsResponse: ColumnNames[] = [
  {
    name: 'Kredīta punkti pilnai slodzei',
    pathTo: 'cpForFullTime',
    collection: 'columnsForAcademicRankDetailsResponse',
    sortable: true
  },
  {
    name: 'kontakstundas pilnai slodzei',
    pathTo: 'contactHoursForFullTime',
    collection: 'columnsForAcademicRankDetailsResponse',
    sortable: true
  },
  {
    name: 'semestris',
    pathTo: 'semester.semesterName',
    collection: 'columnsForAcademicRankDetailsResponse',
    sortable: true
  },
  {
    name: 'semestra gads',
    pathTo: 'semester.semesterYear',
    collection: 'columnsForAcademicRankDetailsResponse',
    sortable: true
  }
  ,{
    name: 'Amats',
    pathTo: 'academicRank.rankName',
    collection: 'columnsForAcademicRankDetailsResponse',
    sortable: true
  }
  , {
    name: 'Abreviatūra',
    pathTo: 'academicRank.abbreviation',
    collection: 'columnsForAcademicRankDetailsResponse',
    sortable: true
  }
];
export const ColumnsForStatusTypeResponse: ColumnNames[] = [
  {
    name: 'Statuss',
    pathTo: 'statusTypeName',
    collection: 'columnsForStatusType',
    sortable: true
  }
];
export const ColumnsForSemesterResponse: ColumnNames[] = [
  {
    name: 'semestris',
    pathTo: 'semesterName',
    collection: 'columnsForSemester',
    sortable: true
  },
  {
    name: 'gads',
    pathTo: 'year',
    collection: 'columnsForSemester',
    sortable: true
  },
]

