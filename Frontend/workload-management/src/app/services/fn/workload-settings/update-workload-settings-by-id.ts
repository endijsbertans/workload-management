/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { WorkloadSettingsRequest } from '../../models/workload-settings-request';

export interface UpdateWorkloadSettingsById$Params {
  semesterId: number;
      body: WorkloadSettingsRequest
}

export function updateWorkloadSettingsById(http: HttpClient, rootUrl: string, params: UpdateWorkloadSettingsById$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
  const rb = new RequestBuilder(rootUrl, updateWorkloadSettingsById.PATH, 'patch');
  if (params) {
    rb.path('semesterId', params.semesterId, {});
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

updateWorkloadSettingsById.PATH = '/workload-settings/{semesterId}';
