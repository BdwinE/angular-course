import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/auth/user.model';

export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATE_SUCCESS = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const AUTHENTICATE_FAIL = '[Auth] Login Fail';
export const CLEAR_ERROR = '[Auth] Clear Error';

export const SIGNUP_START = '[Auth] Signup Start';
export const AUTO_LOGIN = '[Auth] Auto Login';

export const authenticateAction = createAction(
  AUTHENTICATE_SUCCESS,
  props<{ user: User; redirect: boolean }>()
);

export const logoutAction = createAction(LOGOUT);

export const loginStartAction = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>()
);
export const authenticateFailAction = createAction(
  AUTHENTICATE_FAIL,
  props<{ payload: string }>()
);

export const signupStartAction = createAction(
  SIGNUP_START,
  props<{ email: string; password: string }>()
);

export const autoLoginAction = createAction(AUTO_LOGIN);

export const clearError = createAction(CLEAR_ERROR);

export type loginStartAction = typeof loginStartAction;
export type signupStart = typeof signupStartAction;
export type authenticate = typeof authenticateAction;
