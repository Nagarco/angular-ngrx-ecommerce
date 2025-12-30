import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../interceptors';
import { catchError, map, throwError } from 'rxjs';

export interface HttpOptions<V> {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  responseType?: 'json';
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl = inject(API_BASE_URL);
  private httpClient = inject(HttpClient);

  get<T>(url: string, options?: HttpOptions<T>) {
    return this.httpClient.get<T>(this.getUrl(url), options).pipe(
      map((data: unknown) => (data as { data: T }).data),
      catchError((err) => throwError(this.handleError(err)))
    );
  }

  post<T>(url: string, body: unknown, options?: HttpOptions<T>) {
    return this.httpClient.post<T>(this.getUrl(url), body, options).pipe(
      map((data: unknown) => (data as { data: T }).data),
      catchError((err) => throwError(this.handleError(err)))
    );
  }

  put<T>(url: string, body: unknown, options?: HttpOptions<T>) {
    return this.httpClient.put<T>(this.getUrl(url), body, options).pipe(
      map((data: unknown) => (data as { data: T }).data),
      catchError((err) => throwError(this.handleError(err)))
    );
  }

  delete<T>(url: string, options?: HttpOptions<T> & { body?: unknown }) {
    return this.httpClient.delete<T>(this.getUrl(url), options).pipe(
      map((data: unknown) => (data as { data: T }).data),
      catchError((err) => throwError(this.handleError(err)))
    );
  }

  private getUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`.replace(/(^|[^:])\/{2,}/g, '$1/');
  }

  private handleError(error: HttpErrorResponse): unknown {
    let errorContainer = error;

    while (errorContainer.error) {
      errorContainer = errorContainer.error;
    }

    return errorContainer;
  }
}
