/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { FacultyResponse } from '../models/faculty-response';
export interface MyClassResponse {
  classFaculty?: FacultyResponse;
  classId?: number;
  classLevel?: number;
  classLevelAndProgram?: string;
  degree?: 'BACHELOR' | 'MASTER' | 'DOCTORATE';
  deleted?: boolean;
  myClassProgram?: string;
}
