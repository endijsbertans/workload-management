export interface ColumnNames {
  name: string,
  pathTo: string,
  collection: string
}

export const ColumnsForTeacherResponse: ColumnNames[] = [
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
    name: 'Amata nosaukums',
    pathTo: 'teachingStaff.positionTitle',
    collection: 'ColumnsForTeacher'
  },
  {
    name: 'Pasniedzēja fakultāte',
    pathTo: 'teachingStaff.staffFaculty.facultyName',
    collection: 'ColumnsForTeacher'
  },
  {
    name: 'Amata grupa',
    pathTo: 'teachingStaff.staffAcademicRank.abbreviation',
    collection: 'ColumnsForTeacher'
  },
  {
    name: 'Ēpasts',
    pathTo: 'teachingStaff.user.email',
    collection: 'ColumnsForTeacher'
  },
  {
    name: 'Profils apstiprināts',
    pathTo: 'teachingStaff.user.enabled',
    collection: 'ColumnsForTeacher'
  }
];

export const ColumnsForCourseResponse: ColumnNames[] = [
  {
    name: 'Studiju līmenis',
    pathTo: 'course.studyLevel',
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
  },
  {
    name: 'Priekšmeta KP',
    pathTo: 'course.creditPoints',
    collection: 'ColumnsForCourse'
  },
  {
    name: 'Nepieciešamais amats',
    pathTo: 'course.necessaryAcademicRank.rankName',
    collection: 'ColumnsForCourse'
  }
];
export const ColumnsForClassResponse: ColumnNames[] = [
  {
    name: 'Klase',
    pathTo: 'className',
    collection: 'ColumnsForClass'
  }
  , {
    name: 'Gads',
    pathTo: 'classYear',
    collection: 'ColumnsForClass'
  }
  , {
    name: 'studentu daudzums',
    pathTo: 'studentAmount',
    collection: 'ColumnsForClass'
  }
];
export const ColumnsForAcademicRankResponse: ColumnNames[] = [
  {
    name: 'Amats',
    pathTo: 'academicRank.rankName',
    collection: 'ColumnsForAcademicRankResponse'
  }
  , {
    name: 'KP pilnai slodzei',
    pathTo: 'academicRank.cpForFullTime',
    collection: 'ColumnsForAcademicRankResponse'
  }
  , {
    name: 'Abreviatūra',
    pathTo: 'academicRank.abbreviation',
    collection: 'ColumnsForAcademicRankResponse'
  }
  , {
    name: 'Alga',
    pathTo: 'academicRank.salary',
    collection: 'CColumnsForAcademicRankResponse'
  }
];
export const ColumnsForStatusTypeResponse: ColumnNames[] = [
  {
    name: 'Statuss',
    pathTo: 'statusType.statusTypeName',
    collection: 'ColumnsForStatusType'
  }
];

