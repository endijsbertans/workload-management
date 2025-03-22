/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { CourseResponse } from '../models/course-response';
import { deleteCourseById } from '../fn/course/delete-course-by-id';
import { DeleteCourseById$Params } from '../fn/course/delete-course-by-id';
import { findAllCourses } from '../fn/course/find-all-courses';
import { FindAllCourses$Params } from '../fn/course/find-all-courses';
import { findCourseById } from '../fn/course/find-course-by-id';
import { FindCourseById$Params } from '../fn/course/find-course-by-id';
import { getCourseCsvTemplate } from '../fn/course/get-course-csv-template';
import { GetCourseCsvTemplate$Params } from '../fn/course/get-course-csv-template';
import { saveCourse } from '../fn/course/save-course';
import { SaveCourse$Params } from '../fn/course/save-course';
import { updateCourseById } from '../fn/course/update-course-by-id';
import { UpdateCourseById$Params } from '../fn/course/update-course-by-id';
import { uploadCourse } from '../fn/course/upload-course';
import { UploadCourse$Params } from '../fn/course/upload-course';

@Injectable({ providedIn: 'root' })
export class CourseService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllCourses()` */
  static readonly FindAllCoursesPath = '/course';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllCourses()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllCourses$Response(params?: FindAllCourses$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CourseResponse>>> {
    return findAllCourses(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllCourses$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllCourses(params?: FindAllCourses$Params, context?: HttpContext): Observable<Array<CourseResponse>> {
    return this.findAllCourses$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CourseResponse>>): Array<CourseResponse> => r.body)
    );
  }

  /** Path part for operation `saveCourse()` */
  static readonly SaveCoursePath = '/course';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveCourse()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveCourse$Response(params: SaveCourse$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveCourse(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveCourse$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveCourse(params: SaveCourse$Params, context?: HttpContext): Observable<number> {
    return this.saveCourse$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `uploadCourse()` */
  static readonly UploadCoursePath = '/course/upload';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadCourse()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadCourse$Response(params?: UploadCourse$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return uploadCourse(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadCourse$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadCourse(params?: UploadCourse$Params, context?: HttpContext): Observable<number> {
    return this.uploadCourse$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findCourseById()` */
  static readonly FindCourseByIdPath = '/course/{courseId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findCourseById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findCourseById$Response(params: FindCourseById$Params, context?: HttpContext): Observable<StrictHttpResponse<CourseResponse>> {
    return findCourseById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findCourseById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findCourseById(params: FindCourseById$Params, context?: HttpContext): Observable<CourseResponse> {
    return this.findCourseById$Response(params, context).pipe(
      map((r: StrictHttpResponse<CourseResponse>): CourseResponse => r.body)
    );
  }

  /** Path part for operation `deleteCourseById()` */
  static readonly DeleteCourseByIdPath = '/course/{courseId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCourseById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCourseById$Response(params: DeleteCourseById$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return deleteCourseById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteCourseById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCourseById(params: DeleteCourseById$Params, context?: HttpContext): Observable<number> {
    return this.deleteCourseById$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `updateCourseById()` */
  static readonly UpdateCourseByIdPath = '/course/{courseId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCourseById()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCourseById$Response(params: UpdateCourseById$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateCourseById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateCourseById$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCourseById(params: UpdateCourseById$Params, context?: HttpContext): Observable<number> {
    return this.updateCourseById$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getCourseCsvTemplate()` */
  static readonly GetCourseCsvTemplatePath = '/course/template';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCourseCsvTemplate()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCourseCsvTemplate$Response(params?: GetCourseCsvTemplate$Params, context?: HttpContext): Observable<StrictHttpResponse<Blob>> {
    return getCourseCsvTemplate(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCourseCsvTemplate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCourseCsvTemplate(params?: GetCourseCsvTemplate$Params, context?: HttpContext): Observable<Blob> {
    return this.getCourseCsvTemplate$Response(params, context).pipe(
      map((r: StrictHttpResponse<Blob>): Blob => r.body)
    );
  }

}
