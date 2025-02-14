/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TeachingStaffResponse } from '../../models/teaching-staff-response';

export interface FindTeachingStaffById1$Params {
  'tstaff-id': number;
}

export function findTeachingStaffById1(http: HttpClient, rootUrl: string, params: FindTeachingStaffById1$Params, context?: HttpContext): Observable<StrictHttpResponse<TeachingStaffResponse>> {
  const rb = new RequestBuilder(rootUrl, findTeachingStaffById1.PATH, 'get');
  if (params) {
    rb.path('tstaff-id', params['tstaff-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<TeachingStaffResponse>;
    })
  );
}

findTeachingStaffById1.PATH = '/teaching-staff/{tstaff-id}';
