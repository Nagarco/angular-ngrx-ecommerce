import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../core/services/auth.service';
import { FeaturesRoutes } from '@/common';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ username, password }) =>
        this.authService.login({ username, password }).pipe(
          map((token) => AuthActions.loginSuccess({ token })),
          catchError((error: any) =>
            of(
              AuthActions.loginFailure({
                error: error?.message || 'Login failed. Please try again.',
              })
            )
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () => this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ token }) => {
          if (token) {
            localStorage.setItem('authToken', token);
          }
          this.router.navigate([FeaturesRoutes.Landing.url()]);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () => this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.router.navigate([FeaturesRoutes.Login.url()]);
        }),
        map(() => AuthActions.logoutSuccess())
      )
  );

  initAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.initAuth),
      map(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
          return AuthActions.setToken({ token });
        }
        return AuthActions.clearToken();
      })
    )
  );
}

