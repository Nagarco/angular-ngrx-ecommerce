import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../core/services/auth.service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);

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
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () => this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('authToken');
        }),
        map(() => AuthActions.logoutSuccess())
      )
  );
}

