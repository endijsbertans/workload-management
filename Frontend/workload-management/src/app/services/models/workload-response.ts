/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { AcademicRank } from '../models/academic-rank';
import { Course } from '../models/course';
import { MyClass } from '../models/my-class';
import { StatusType } from '../models/status-type';
import { TeachingStaff } from '../models/teaching-staff';
export interface WorkloadResponse {
  academicRank?: AcademicRank;
  budgetPosition?: boolean;
  comments?: string;
  contactHours?: number;
  course?: Course;
  cpForFullTime?: number;
  cpProportionOnFullTime?: number;
  creditPointsPerGroup?: number;
  creditPointsPerHour?: number;
  expectedSalary?: number;
  groupAmount?: number;
  groupForSemester?: string;
  includeInBudget?: string;
  industryCoefficient?: number;
  monthSum?: number;
  myClasses?: Array<MyClass>;
  program?: string;
  salaryPerMonth?: number;
  semester?: string;
  statusType?: StatusType;
  teachingStaff?: TeachingStaff;
  vacationMonths?: number;
  workloadId?: number;
}
