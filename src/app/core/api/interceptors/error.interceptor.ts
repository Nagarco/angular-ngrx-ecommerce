import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { checkIfUrlExist } from '@/common';
import * as AuthActions from '@/features/auth/data-access';
import { AuthEndPoints } from '@/features/auth/data-access';

const PUBLIC_URLS = [AuthEndPoints.Login.url()];

export function ErrorInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  const store = inject(Store);
  const isPublicUrl = checkIfUrlExist(req.url, PUBLIC_URLS);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (isPublicUrl) {
        return throwError(() => error);
      }

      if (error.status === 401 || error.status === 403) {
        store.dispatch(AuthActions.logout());
      }

      return throwError(() => error);
    })
  );
}

