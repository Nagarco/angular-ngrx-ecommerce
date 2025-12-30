import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthEndPoints } from '../endpoints';
import { InjectionToken } from '@angular/core';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

const PUBLIC_URLS = [AuthEndPoints.Login.url()];

export function AuthInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  const isPublicUrl = checkIfExist(req.url, PUBLIC_URLS);
  if(isPublicUrl) return next(req.clone());
  const token = '';
  return next(req.clone({setHeaders: {
    Authorization: `Bearer ${token}`
   }}));
}
  

function checkIfExist(url: string, urlList: string[]): boolean {
  let filteredUrl = url;
  if (url.includes('http')) {
    filteredUrl = url
      .replace(/https?:\/\//, '')
      .split(/\//)
      .slice(1)
      .join('/');
  }
  return urlList.includes(filteredUrl.replace(/^\/?(api\/)?/, '/'));
}

