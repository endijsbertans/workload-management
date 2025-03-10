/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TeachingStaffRequest } from '../../models/teaching-staff-request';

export interface UpdateTeachingStaffById$Params {
  'tstaff-id': number;
      body: TeachingStaffRequest
}

export function updateTeachingStaffById(http: HttpClient, rootUrl: string, params: UpdateTeachingStaffById$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
  const rb = new RequestBuilder(rootUrl, updateTeachingStaffById.PATH, 'patch');
  if (params) {
    rb.path('tstaff-id', params['tstaff-id'], {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
    })
  );
}

updateTeachingStaffById.PATH = '/teaching-staff/{tstaff-id}';
