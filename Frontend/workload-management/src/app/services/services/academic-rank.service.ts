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

import { AcademicRankResponse } from '../models/academic-rank-response';
import { findAcademicRankById } from '../fn/academic-rank/find-academic-rank-by-id';
import { FindAcademicRankById$Params } from '../fn/academic-rank/find-academic-rank-by-id';
import { findAllAcademicRank } from '../fn/academic-rank/find-all-academic-rank';
import { FindAllAcademicRank$Params } from '../fn/academic-rank/find-all-academic-rank';
import { saveAcademicRank } from '../fn/academic-rank/save-academic-rank';
import { SaveAcademicRank$Params } from '../fn/academic-rank/save-academic-rank';

@Injectable({ providedIn: 'root' })
export class AcademicRankService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllAcademicRank()` */
  static readonly FindAllAcademicRankPath = '/academic-rank';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllAcademicRank()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAcademicRank$Response(params?: FindAllAcademicRank$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AcademicRankResponse>>> {
    return findAllAcademicRank(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllAcademicRank$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAcademicRank(params?: FindAllAcademicRank$Params, context?: HttpContext): Observable<Array<AcademicRankResponse>> {
    return this.findAllAcademicRank$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<AcademicRankResponse>>): Array<AcademicRankResponse> => r.body)
    );
  }

  /** Path part for operation `saveAcademicRank()` */
  static readonly SaveAcademicRankPath = '/academic-rank';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveAcademicRank()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveAcademicRank$Response(params: SaveAcademicRank$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveAcademicRank(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveAcademicRank$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveAcademicRank(params: SaveAcademicRank$Params, context?: HttpContext): Observable<number> {
    return this.saveAcademicRank$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findAcademicRankById()` */
  static readonly FindAcademicRankByIdPath = '/academic-rank/{academic-rank-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAcademicRankById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAcademicRankById$Response(params: FindAcademicRankById$Params, context?: HttpContext): Observable<StrictHttpResponse<AcademicRankResponse>> {
    return findAcademicRankById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAcademicRankById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAcademicRankById(params: FindAcademicRankById$Params, context?: HttpContext): Observable<AcademicRankResponse> {
    return this.findAcademicRankById$Response(params, context).pipe(
      map((r: StrictHttpResponse<AcademicRankResponse>): AcademicRankResponse => r.body)
    );
  }

}
