import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.login, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(AuthActions.loginSuccess, (state, { token }) => ({
    ...state,
    token,
    isAuthenticated: true,
    isLoading: false,
    error: null,
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
    isAuthenticated: false,
    token: null,
  })),

  on(AuthActions.logout, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(AuthActions.logoutSuccess, () => initialAuthState),

  on(AuthActions.setToken, (state, { token }) => ({
    ...state,
    token,
    isAuthenticated: !!token,
  })),

  on(AuthActions.clearToken, (state) => ({
    ...state,
    token: null,
    isAuthenticated: false,
  })),

  on(AuthActions.clearError, (state) => ({
    ...state,
    error: null,
  }))
);
