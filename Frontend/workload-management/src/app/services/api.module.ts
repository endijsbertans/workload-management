/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { WorkloadService } from './services/workload.service';
import { WorkloadSettingsService } from './services/workload-settings.service';
import { TeachingStaffService } from './services/teaching-staff.service';
import { StatusTypeService } from './services/status-type.service';
import { SemesterControllerService } from './services/semester-controller.service';
import { MyClassService } from './services/my-class.service';
import { FacultyService } from './services/faculty.service';
import { CourseService } from './services/course.service';
import { AuthenticationService } from './services/authentication.service';
import { AcademicRankService } from './services/academic-rank.service';
import { AcademicRankDetailsService } from './services/academic-rank-details.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    WorkloadService,
    WorkloadSettingsService,
    TeachingStaffService,
    StatusTypeService,
    SemesterControllerService,
    MyClassService,
    FacultyService,
    CourseService,
    AuthenticationService,
    AcademicRankService,
    AcademicRankDetailsService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
