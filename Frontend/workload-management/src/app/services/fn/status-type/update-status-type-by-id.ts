/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { StatusTypeRequest } from '../../models/status-type-request';

export interface UpdateStatusTypeById$Params {
  statusTypeId: number;
      body: StatusTypeRequest
}

export function updateStatusTypeById(http: HttpClient, rootUrl: string, params: UpdateStatusTypeById$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
  const rb = new RequestBuilder(rootUrl, updateStatusTypeById.PATH, 'patch');
  if (params) {
    rb.path('statusTypeId', params.statusTypeId, {});
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

updateStatusTypeById.PATH = '/status-type/{statusTypeId}';
