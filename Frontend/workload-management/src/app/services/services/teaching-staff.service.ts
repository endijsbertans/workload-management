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

import { findAllTeachingStaff } from '../fn/teaching-staff/find-all-teaching-staff';
import { FindAllTeachingStaff$Params } from '../fn/teaching-staff/find-all-teaching-staff';
import { findTeachingStaffById } from '../fn/teaching-staff/find-teaching-staff-by-id';
import { FindTeachingStaffById$Params } from '../fn/teaching-staff/find-teaching-staff-by-id';
import { saveTeachingStaff } from '../fn/teaching-staff/save-teaching-staff';
import { SaveTeachingStaff$Params } from '../fn/teaching-staff/save-teaching-staff';
import { TeachingStaffResponse } from '../models/teaching-staff-response';

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

  /** Path part for operation `findTeachingStaffById()` */
  static readonly FindTeachingStaffByIdPath = '/teaching-staff/{tstaff-id}';

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

}
