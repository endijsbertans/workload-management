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

import { deleteTeachingStaffById } from '../fn/teaching-staff/delete-teaching-staff-by-id';
import { DeleteTeachingStaffById$Params } from '../fn/teaching-staff/delete-teaching-staff-by-id';
import { findAllTeachingStaff } from '../fn/teaching-staff/find-all-teaching-staff';
import { FindAllTeachingStaff$Params } from '../fn/teaching-staff/find-all-teaching-staff';
import { findTeachingStaffById } from '../fn/teaching-staff/find-teaching-staff-by-id';
import { FindTeachingStaffById$Params } from '../fn/teaching-staff/find-teaching-staff-by-id';
import { getTStaffCsvTemplate } from '../fn/teaching-staff/get-t-staff-csv-template';
import { GetTStaffCsvTemplate$Params } from '../fn/teaching-staff/get-t-staff-csv-template';
import { saveTeachingStaff } from '../fn/teaching-staff/save-teaching-staff';
import { SaveTeachingStaff$Params } from '../fn/teaching-staff/save-teaching-staff';
import { TeachingStaffResponse } from '../models/teaching-staff-response';
import { updateTeachingStaffById } from '../fn/teaching-staff/update-teaching-staff-by-id';
import { UpdateTeachingStaffById$Params } from '../fn/teaching-staff/update-teaching-staff-by-id';
import { uploadTeachingStaff } from '../fn/teaching-staff/upload-teaching-staff';
import { UploadTeachingStaff$Params } from '../fn/teaching-staff/upload-teaching-staff';

@Injectable({ providedIn: 'root' })
export class TeachingStaffService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllTeachingStaff()` */
  static readonly FindAllTeachingStaffPath = '/teaching-staff';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllTeachingStaff()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllTeachingStaff$Response(params?: FindAllTeachingStaff$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TeachingStaffResponse>>> {
    return findAllTeachingStaff(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllTeachingStaff$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllTeachingStaff(params?: FindAllTeachingStaff$Params, context?: HttpContext): Observable<Array<TeachingStaffResponse>> {
    return this.findAllTeachingStaff$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<TeachingStaffResponse>>): Array<TeachingStaffResponse> => r.body)
    );
  }

  /** Path part for operation `saveTeachingStaff()` */
  static readonly SaveTeachingStaffPath = '/teaching-staff';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveTeachingStaff()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveTeachingStaff$Response(params: SaveTeachingStaff$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveTeachingStaff(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveTeachingStaff$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveTeachingStaff(params: SaveTeachingStaff$Params, context?: HttpContext): Observable<number> {
    return this.saveTeachingStaff$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `uploadTeachingStaff()` */
  static readonly UploadTeachingStaffPath = '/teaching-staff/upload';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadTeachingStaff()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadTeachingStaff$Response(params?: UploadTeachingStaff$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return uploadTeachingStaff(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadTeachingStaff$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadTeachingStaff(params?: UploadTeachingStaff$Params, context?: HttpContext): Observable<number> {
    return this.uploadTeachingStaff$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findTeachingStaffById()` */
  static readonly FindTeachingStaffByIdPath = '/teaching-staff/{tStaffId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findTeachingStaffById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findTeachingStaffById$Response(params: FindTeachingStaffById$Params, context?: HttpContext): Observable<StrictHttpResponse<TeachingStaffResponse>> {
    return findTeachingStaffById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findTeachingStaffById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findTeachingStaffById(params: FindTeachingStaffById$Params, context?: HttpContext): Observable<TeachingStaffResponse> {
    return this.findTeachingStaffById$Response(params, context).pipe(
      map((r: StrictHttpResponse<TeachingStaffResponse>): TeachingStaffResponse => r.body)
    );
  }

  /** Path part for operation `deleteTeachingStaffById()` */
  static readonly DeleteTeachingStaffByIdPath = '/teaching-staff/{tStaffId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTeachingStaffById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTeachingStaffById$Response(params: DeleteTeachingStaffById$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return deleteTeachingStaffById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteTeachingStaffById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTeachingStaffById(params: DeleteTeachingStaffById$Params, context?: HttpContext): Observable<number> {
    return this.deleteTeachingStaffById$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `updateTeachingStaffById()` */
  static readonly UpdateTeachingStaffByIdPath = '/teaching-staff/{tStaffId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateTeachingStaffById()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTeachingStaffById$Response(params: UpdateTeachingStaffById$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateTeachingStaffById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateTeachingStaffById$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTeachingStaffById(params: UpdateTeachingStaffById$Params, context?: HttpContext): Observable<number> {
    return this.updateTeachingStaffById$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getTStaffCsvTemplate()` */
  static readonly GetTStaffCsvTemplatePath = '/teaching-staff/template';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTStaffCsvTemplate()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTStaffCsvTemplate$Response(params?: GetTStaffCsvTemplate$Params, context?: HttpContext): Observable<StrictHttpResponse<Blob>> {
    return getTStaffCsvTemplate(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTStaffCsvTemplate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTStaffCsvTemplate(params?: GetTStaffCsvTemplate$Params, context?: HttpContext): Observable<Blob> {
    return this.getTStaffCsvTemplate$Response(params, context).pipe(
      map((r: StrictHttpResponse<Blob>): Blob => r.body)
    );
  }

}
