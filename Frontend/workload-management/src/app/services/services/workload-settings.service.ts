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

import { deleteWorkloadSettingsById } from '../fn/workload-settings/delete-workload-settings-by-id';
import { DeleteWorkloadSettingsById$Params } from '../fn/workload-settings/delete-workload-settings-by-id';
import { findAllWorkloadSettings } from '../fn/workload-settings/find-all-workload-settings';
import { FindAllWorkloadSettings$Params } from '../fn/workload-settings/find-all-workload-settings';
import { findWorkloadSettingsById } from '../fn/workload-settings/find-workload-settings-by-id';
import { FindWorkloadSettingsById$Params } from '../fn/workload-settings/find-workload-settings-by-id';
import { saveWorkloadSettings } from '../fn/workload-settings/save-workload-settings';
import { SaveWorkloadSettings$Params } from '../fn/workload-settings/save-workload-settings';
import { updateWorkloadSettingsById } from '../fn/workload-settings/update-workload-settings-by-id';
import { UpdateWorkloadSettingsById$Params } from '../fn/workload-settings/update-workload-settings-by-id';
import { WorkloadSettingsResponse } from '../models/workload-settings-response';

@Injectable({ providedIn: 'root' })
export class WorkloadSettingsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllWorkloadSettings()` */
  static readonly FindAllWorkloadSettingsPath = '/workload-settings';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllWorkloadSettings()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllWorkloadSettings$Response(params?: FindAllWorkloadSettings$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<WorkloadSettingsResponse>>> {
    return findAllWorkloadSettings(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllWorkloadSettings$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllWorkloadSettings(params?: FindAllWorkloadSettings$Params, context?: HttpContext): Observable<Array<WorkloadSettingsResponse>> {
    return this.findAllWorkloadSettings$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<WorkloadSettingsResponse>>): Array<WorkloadSettingsResponse> => r.body)
    );
  }

  /** Path part for operation `saveWorkloadSettings()` */
  static readonly SaveWorkloadSettingsPath = '/workload-settings';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveWorkloadSettings()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveWorkloadSettings$Response(params: SaveWorkloadSettings$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveWorkloadSettings(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveWorkloadSettings$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveWorkloadSettings(params: SaveWorkloadSettings$Params, context?: HttpContext): Observable<number> {
    return this.saveWorkloadSettings$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findWorkloadSettingsById()` */
  static readonly FindWorkloadSettingsByIdPath = '/workload-settings/{semesterId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findWorkloadSettingsById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findWorkloadSettingsById$Response(params: FindWorkloadSettingsById$Params, context?: HttpContext): Observable<StrictHttpResponse<WorkloadSettingsResponse>> {
    return findWorkloadSettingsById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findWorkloadSettingsById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findWorkloadSettingsById(params: FindWorkloadSettingsById$Params, context?: HttpContext): Observable<WorkloadSettingsResponse> {
    return this.findWorkloadSettingsById$Response(params, context).pipe(
      map((r: StrictHttpResponse<WorkloadSettingsResponse>): WorkloadSettingsResponse => r.body)
    );
  }

  /** Path part for operation `deleteWorkloadSettingsById()` */
  static readonly DeleteWorkloadSettingsByIdPath = '/workload-settings/{semesterId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteWorkloadSettingsById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteWorkloadSettingsById$Response(params: DeleteWorkloadSettingsById$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return deleteWorkloadSettingsById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteWorkloadSettingsById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteWorkloadSettingsById(params: DeleteWorkloadSettingsById$Params, context?: HttpContext): Observable<number> {
    return this.deleteWorkloadSettingsById$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `updateWorkloadSettingsById()` */
  static readonly UpdateWorkloadSettingsByIdPath = '/workload-settings/{semesterId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateWorkloadSettingsById()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateWorkloadSettingsById$Response(params: UpdateWorkloadSettingsById$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateWorkloadSettingsById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateWorkloadSettingsById$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateWorkloadSettingsById(params: UpdateWorkloadSettingsById$Params, context?: HttpContext): Observable<number> {
    return this.updateWorkloadSettingsById$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

}
