export interface ColumnNames {
  name: string,
  pathTo: string,
  collection: string,
  sortable: boolean
}

export const ColumnsForTeacherResponse: ColumnNames[] = [
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
    name: 'Amata nosaukums',
    pathTo: 'teachingStaff.positionTitle',
    collection: 'ColumnsForTeacher',
    sortable: true
  },
  {
    name: 'Pasniedzēja fakultāte',
    pathTo: 'teachingStaff.staffFaculty.facultyName',
    collection: 'ColumnsForTeacher',
    sortable: true
  },
  {
    name: 'Amata grupa',
    pathTo: 'teachingStaff.staffAcademicRank.abbreviation',
    collection: 'ColumnsForTeacher',
    sortable: true
  },
  {
    name: 'Ēpasts',
    pathTo: 'teachingStaff.user.email',
    collection: 'ColumnsForTeacher',
    sortable: true
  },
  {
    name: 'Profils apstiprināts',
    pathTo: 'teachingStaff.user.enabled',
    collection: 'ColumnsForTeacher',
    sortable: true
  }
];

export const ColumnsForCourseResponse: ColumnNames[] = [
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
  },
  {
    name: 'Priekšmeta KP',
    pathTo: 'course.creditPoints',
    collection: 'ColumnsForCourse',
    sortable: true
  },
  {
    name: 'Nepieciešamais amats',
    pathTo: 'course.necessaryAcademicRank.rankName',
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
    pathTo: 'academicRank.rankName',
    collection: 'ColumnsForAcademicRankResponse',
    sortable: true
  }
  , {
    name: 'KP pilnai slodzei',
    pathTo: 'academicRank.cpForFullTime',
    collection: 'ColumnsForAcademicRankResponse',
    sortable: true
  }
  , {
    name: 'Abreviatūra',
    pathTo: 'academicRank.abbreviation',
    collection: 'ColumnsForAcademicRankResponse',
    sortable: true
  }
  , {
    name: 'Alga',
    pathTo: 'academicRank.salary',
    collection: 'CColumnsForAcademicRankResponse',
    sortable: true
  }
];
export const ColumnsForStatusTypeResponse: ColumnNames[] = [
  {
    name: 'Statuss',
    pathTo: 'statusType.statusTypeName',
    collection: 'ColumnsForStatusType',
    sortable: true
  }
];
export const ColumnsForSemesterResponse: ColumnNames[] = [
  {
    name: 'semestris',
    pathTo: 'semester.semesterName',
    collection: 'ColumnsForSemester',
    sortable: true
  },
  {
    name: 'gads',
    pathTo: 'semester.year',
    collection: 'ColumnsForSemester',
    sortable: true
  },
]

