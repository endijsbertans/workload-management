/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { AcademicRank } from '../models/academic-rank';
import { Faculty } from '../models/faculty';
import { MyUser } from '../models/my-user';
export interface TeachingStaffResponse {
  name?: string;
  positionTitle?: string;
  rankFullName?: string;
  staffAcademicRank?: AcademicRank;
  staffFaculty?: Faculty;
  staffFullName?: string;
  staffPhoto?: string;
  surname?: string;
  teachingStaffId?: number;
  user?: MyUser;
}
