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

import { getClassDistribution } from '../fn/workload-stats/get-class-distribution';
import { GetClassDistribution$Params } from '../fn/workload-stats/get-class-distribution';
import { getCourseDistribution } from '../fn/workload-stats/get-course-distribution';
import { GetCourseDistribution$Params } from '../fn/workload-stats/get-course-distribution';
import { getFacultyDistribution } from '../fn/workload-stats/get-faculty-distribution';
import { GetFacultyDistribution$Params } from '../fn/workload-stats/get-faculty-distribution';
import { getWorkloadSummary } from '../fn/workload-stats/get-workload-summary';
import { GetWorkloadSummary$Params } from '../fn/workload-stats/get-workload-summary';

@Injectable({ providedIn: 'root' })
export class WorkloadStatsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getWorkloadSummary()` */
  static readonly GetWorkloadSummaryPath = '/workload-stats/summary';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getWorkloadSummary()` instead.
   *
   * This method doesn't expect any request body.
   */
  getWorkloadSummary$Response(params?: GetWorkloadSummary$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: {
};
}>> {
    return getWorkloadSummary(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getWorkloadSummary$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getWorkloadSummary(params?: GetWorkloadSummary$Params, context?: HttpContext): Observable<{
[key: string]: {
};
}> {
    return this.getWorkloadSummary$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
[key: string]: {
};
}>): {
[key: string]: {
};
} => r.body)
    );
  }

  /** Path part for operation `getFacultyDistribution()` */
  static readonly GetFacultyDistributionPath = '/workload-stats/faculty-distribution';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFacultyDistribution()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFacultyDistribution$Response(params?: GetFacultyDistribution$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<{
[key: string]: {
};
}>>> {
    return getFacultyDistribution(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getFacultyDistribution$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFacultyDistribution(params?: GetFacultyDistribution$Params, context?: HttpContext): Observable<Array<{
[key: string]: {
};
}>> {
    return this.getFacultyDistribution$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<{
[key: string]: {
};
}>>): Array<{
[key: string]: {
};
}> => r.body)
    );
  }

  /** Path part for operation `getCourseDistribution()` */
  static readonly GetCourseDistributionPath = '/workload-stats/course-distribution';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCourseDistribution()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCourseDistribution$Response(params?: GetCourseDistribution$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<{
[key: string]: {
};
}>>> {
    return getCourseDistribution(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCourseDistribution$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCourseDistribution(params?: GetCourseDistribution$Params, context?: HttpContext): Observable<Array<{
[key: string]: {
};
}>> {
    return this.getCourseDistribution$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<{
[key: string]: {
};
}>>): Array<{
[key: string]: {
};
}> => r.body)
    );
  }

  /** Path part for operation `getClassDistribution()` */
  static readonly GetClassDistributionPath = '/workload-stats/class-distribution';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getClassDistribution()` instead.
   *
   * This method doesn't expect any request body.
   */
  getClassDistribution$Response(params?: GetClassDistribution$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<{
[key: string]: {
};
}>>> {
    return getClassDistribution(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getClassDistribution$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getClassDistribution(params?: GetClassDistribution$Params, context?: HttpContext): Observable<Array<{
[key: string]: {
};
}>> {
    return this.getClassDistribution$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<{
[key: string]: {
};
}>>): Array<{
[key: string]: {
};
}> => r.body)
    );
  }

}
