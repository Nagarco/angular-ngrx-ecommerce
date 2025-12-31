import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');

export const setToken = createAction(
  '[Auth] Set Token',
  props<{ token: string }>()
);

export const clearToken = createAction('[Auth] Clear Token');

export const clearError = createAction('[Auth] Clear Error');

export const initAuth = createAction('[Auth] Init Auth');