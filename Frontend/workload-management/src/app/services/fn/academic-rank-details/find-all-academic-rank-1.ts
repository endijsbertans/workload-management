/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AcademicRankDetailsResponse } from '../../models/academic-rank-details-response';

export interface FindAllAcademicRank1$Params {
}

export function findAllAcademicRank1(http: HttpClient, rootUrl: string, params?: FindAllAcademicRank1$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AcademicRankDetailsResponse>>> {
  const rb = new RequestBuilder(rootUrl, findAllAcademicRank1.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<AcademicRankDetailsResponse>>;
    })
  );
}

findAllAcademicRank1.PATH = '/academic-rank/details';
