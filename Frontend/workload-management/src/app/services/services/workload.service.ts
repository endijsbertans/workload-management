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

import { deleteWorkloadById } from '../fn/workload/delete-workload-by-id';
import { DeleteWorkloadById$Params } from '../fn/workload/delete-workload-by-id';
import { findAllMyWorkloads } from '../fn/workload/find-all-my-workloads';
import { FindAllMyWorkloads$Params } from '../fn/workload/find-all-my-workloads';
import { findAllWorkloads } from '../fn/workload/find-all-workloads';
import { FindAllWorkloads$Params } from '../fn/workload/find-all-workloads';
import { findWorkloadById } from '../fn/workload/find-workload-by-id';
import { FindWorkloadById$Params } from '../fn/workload/find-workload-by-id';
import { PageResponseObject } from '../models/page-response-object';
import { PageResponseWorkloadResponse } from '../models/page-response-workload-response';
import { saveWorkload } from '../fn/workload/save-workload';
import { SaveWorkload$Params } from '../fn/workload/save-workload';
import { updateWorkloadById } from '../fn/workload/update-workload-by-id';
import { UpdateWorkloadById$Params } from '../fn/workload/update-workload-by-id';
import { WorkloadResponse } from '../models/workload-response';

@Injectable({ providedIn: 'root' })
export class WorkloadService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllWorkloads()` */
  static readonly FindAllWorkloadsPath = '/workload';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllWorkloads()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllWorkloads$Response(params?: FindAllWorkloads$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseWorkloadResponse>> {
    return findAllWorkloads(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllWorkloads$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllWorkloads(params?: FindAllWorkloads$Params, context?: HttpContext): Observable<PageResponseWorkloadResponse> {
    return this.findAllWorkloads$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseWorkloadResponse>): PageResponseWorkloadResponse => r.body)
    );
  }

  /** Path part for operation `saveWorkload()` */
  static readonly SaveWorkloadPath = '/workload';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveWorkload()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveWorkload$Response(params: SaveWorkload$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveWorkload(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveWorkload$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveWorkload(params: SaveWorkload$Params, context?: HttpContext): Observable<number> {
    return this.saveWorkload$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findWorkloadById()` */
  static readonly FindWorkloadByIdPath = '/workload/{workloadId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findWorkloadById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findWorkloadById$Response(params: FindWorkloadById$Params, context?: HttpContext): Observable<StrictHttpResponse<WorkloadResponse>> {
    return findWorkloadById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findWorkloadById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findWorkloadById(params: FindWorkloadById$Params, context?: HttpContext): Observable<WorkloadResponse> {
    return this.findWorkloadById$Response(params, context).pipe(
      map((r: StrictHttpResponse<WorkloadResponse>): WorkloadResponse => r.body)
    );
  }

  /** Path part for operation `deleteWorkloadById()` */
  static readonly DeleteWorkloadByIdPath = '/workload/{workloadId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteWorkloadById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteWorkloadById$Response(params: DeleteWorkloadById$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return deleteWorkloadById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteWorkloadById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteWorkloadById(params: DeleteWorkloadById$Params, context?: HttpContext): Observable<number> {
    return this.deleteWorkloadById$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `updateWorkloadById()` */
  static readonly UpdateWorkloadByIdPath = '/workload/{workloadId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateWorkloadById()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateWorkloadById$Response(params: UpdateWorkloadById$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateWorkloadById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateWorkloadById$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateWorkloadById(params: UpdateWorkloadById$Params, context?: HttpContext): Observable<number> {
    return this.updateWorkloadById$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findAllMyWorkloads()` */
  static readonly FindAllMyWorkloadsPath = '/workload/my-workloads';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllMyWorkloads()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllMyWorkloads$Response(params?: FindAllMyWorkloads$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseObject>> {
    return findAllMyWorkloads(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllMyWorkloads$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllMyWorkloads(params?: FindAllMyWorkloads$Params, context?: HttpContext): Observable<PageResponseObject> {
    return this.findAllMyWorkloads$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseObject>): PageResponseObject => r.body)
    );
  }

}
