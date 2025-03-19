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

import { deleteMyClassById } from '../fn/my-class/delete-my-class-by-id';
import { DeleteMyClassById$Params } from '../fn/my-class/delete-my-class-by-id';
import { findAllMyClass } from '../fn/my-class/find-all-my-class';
import { FindAllMyClass$Params } from '../fn/my-class/find-all-my-class';
import { findMyClassById } from '../fn/my-class/find-my-class-by-id';
import { FindMyClassById$Params } from '../fn/my-class/find-my-class-by-id';
import { getClassCsvTemplate } from '../fn/my-class/get-class-csv-template';
import { GetClassCsvTemplate$Params } from '../fn/my-class/get-class-csv-template';
import { getEnums } from '../fn/my-class/get-enums';
import { GetEnums$Params } from '../fn/my-class/get-enums';
import { MyClassResponse } from '../models/my-class-response';
import { saveMyClass } from '../fn/my-class/save-my-class';
import { SaveMyClass$Params } from '../fn/my-class/save-my-class';
import { updateMyClass } from '../fn/my-class/update-my-class';
import { UpdateMyClass$Params } from '../fn/my-class/update-my-class';
import { uploadMyClass } from '../fn/my-class/upload-my-class';
import { UploadMyClass$Params } from '../fn/my-class/upload-my-class';

@Injectable({ providedIn: 'root' })
export class MyClassService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllMyClass()` */
  static readonly FindAllMyClassPath = '/my-class';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllMyClass()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllMyClass$Response(params?: FindAllMyClass$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<MyClassResponse>>> {
    return findAllMyClass(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllMyClass$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllMyClass(params?: FindAllMyClass$Params, context?: HttpContext): Observable<Array<MyClassResponse>> {
    return this.findAllMyClass$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<MyClassResponse>>): Array<MyClassResponse> => r.body)
    );
  }

  /** Path part for operation `saveMyClass()` */
  static readonly SaveMyClassPath = '/my-class';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveMyClass()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveMyClass$Response(params: SaveMyClass$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveMyClass(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveMyClass$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveMyClass(params: SaveMyClass$Params, context?: HttpContext): Observable<number> {
    return this.saveMyClass$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `uploadMyClass()` */
  static readonly UploadMyClassPath = '/my-class/upload';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadMyClass()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadMyClass$Response(params?: UploadMyClass$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return uploadMyClass(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadMyClass$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadMyClass(params?: UploadMyClass$Params, context?: HttpContext): Observable<number> {
    return this.uploadMyClass$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findMyClassById()` */
  static readonly FindMyClassByIdPath = '/my-class/{myClassId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findMyClassById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findMyClassById$Response(params: FindMyClassById$Params, context?: HttpContext): Observable<StrictHttpResponse<MyClassResponse>> {
    return findMyClassById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findMyClassById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findMyClassById(params: FindMyClassById$Params, context?: HttpContext): Observable<MyClassResponse> {
    return this.findMyClassById$Response(params, context).pipe(
      map((r: StrictHttpResponse<MyClassResponse>): MyClassResponse => r.body)
    );
  }

  /** Path part for operation `deleteMyClassById()` */
  static readonly DeleteMyClassByIdPath = '/my-class/{myClassId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteMyClassById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteMyClassById$Response(params: DeleteMyClassById$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return deleteMyClassById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteMyClassById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteMyClassById(params: DeleteMyClassById$Params, context?: HttpContext): Observable<number> {
    return this.deleteMyClassById$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `updateMyClass()` */
  static readonly UpdateMyClassPath = '/my-class/{myClassId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateMyClass()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateMyClass$Response(params: UpdateMyClass$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateMyClass(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateMyClass$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateMyClass(params: UpdateMyClass$Params, context?: HttpContext): Observable<number> {
    return this.updateMyClass$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getClassCsvTemplate()` */
  static readonly GetClassCsvTemplatePath = '/my-class/template';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getClassCsvTemplate()` instead.
   *
   * This method doesn't expect any request body.
   */
  getClassCsvTemplate$Response(params?: GetClassCsvTemplate$Params, context?: HttpContext): Observable<StrictHttpResponse<Blob>> {
    return getClassCsvTemplate(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getClassCsvTemplate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getClassCsvTemplate(params?: GetClassCsvTemplate$Params, context?: HttpContext): Observable<Blob> {
    return this.getClassCsvTemplate$Response(params, context).pipe(
      map((r: StrictHttpResponse<Blob>): Blob => r.body)
    );
  }

  /** Path part for operation `getEnums()` */
  static readonly GetEnumsPath = '/my-class/getDegreeEnums';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnums()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnums$Response(params?: GetEnums$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<'BACHELOR' | 'MASTER' | 'DOCTORATE'>>> {
    return getEnums(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getEnums$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnums(params?: GetEnums$Params, context?: HttpContext): Observable<Array<'BACHELOR' | 'MASTER' | 'DOCTORATE'>> {
    return this.getEnums$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<'BACHELOR' | 'MASTER' | 'DOCTORATE'>>): Array<'BACHELOR' | 'MASTER' | 'DOCTORATE'> => r.body)
    );
  }

}
