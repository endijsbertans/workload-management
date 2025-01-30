/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MyClassResponse } from '../../models/my-class-response';

export interface FindMyClassById$Params {
  'myclass-id': number;
}

export function findMyClassById(http: HttpClient, rootUrl: string, params: FindMyClassById$Params, context?: HttpContext): Observable<StrictHttpResponse<MyClassResponse>> {
  const rb = new RequestBuilder(rootUrl, findMyClassById.PATH, 'get');
  if (params) {
    rb.path('myclass-id', params['myclass-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<MyClassResponse>;
    })
  );
}

findMyClassById.PATH = '/my-class/{myclass-id}';
