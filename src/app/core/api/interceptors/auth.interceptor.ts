import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject, InjectionToken } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AuthEndPoints } from '../../endpoints';
import { selectToken } from '@/store/auth';
import { checkIfUrlExist } from '@/common';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

const PUBLIC_URLS = [AuthEndPoints.Login.url()];

export function AuthInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  const isPublicUrl = checkIfUrlExist(req.url, PUBLIC_URLS);
  if (isPublicUrl) return next(req.clone());
  const store = inject(Store);
  return store.select(selectToken).pipe(
    take(1),
    switchMap((token) => {
      if (!token) return next(req.clone());
      return next(
        req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        })
      );
    })
  );
}
