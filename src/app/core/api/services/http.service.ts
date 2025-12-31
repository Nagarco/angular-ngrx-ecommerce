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
  headers?: HttpHeaders;
  params?: HttpParams;
  responseType?: 'json';
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl = inject(API_BASE_URL);
  private httpClient = inject(HttpClient);

  get<T>(url: string, options?: HttpOptions<T>) {
    return this.httpClient
      .get<T>(this.getUrl(url), options)
      .pipe(catchError((err) => throwError(this.handleError(err))));
  }

  post<T>(url: string, body: unknown, options?: HttpOptions<T>) {
    return this.httpClient
      .post<T>(this.getUrl(url), body, options)
      .pipe(catchError((err) => throwError(this.handleError(err))));
  }

  put<T>(url: string, body: unknown, options?: HttpOptions<T>) {
    return this.httpClient
      .put<T>(this.getUrl(url), body, options)
      .pipe(catchError((err) => throwError(this.handleError(err))));
  }

  delete<T>(url: string, options?: HttpOptions<T> & { body?: unknown }) {
    return this.httpClient
      .delete<T>(this.getUrl(url), options)
      .pipe(catchError((err) => throwError(this.handleError(err))));
  }

  setQueryParams(queries: Record<string, any>): HttpParams {
    let queryParams = new HttpParams();
    for (const query in queries) {
      if (queries.hasOwnProperty(query)) {
        const value = queries[query];
        if (value != null) {
          if (Array.isArray(value)) {
            value.forEach((item) => {
              queryParams = queryParams.append(query, String(item));
            });
          } else {
            queryParams = queryParams.append(query, String(value));
          }
        }
      }
    }
    return queryParams;
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
