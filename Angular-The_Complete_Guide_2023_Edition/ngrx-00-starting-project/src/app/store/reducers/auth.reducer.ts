import { createReducer, on } from '@ngrx/store';
import {
  authenticateAction,
  authenticateFailAction,
  clearError,
  loginStartAction,
  logoutAction,
  signupStartAction,
} from '../actions/auth.actions';
import { UserModel } from '../store.model';

const initial_State = {
  user: null,
  authError: null,
  loading: false,
};
export const authReducer = createReducer(
  initial_State,
  on(authenticateAction, (state: UserModel, action) => {
    const newState = { ...state };
    newState.user = action.user;
    newState.loading = false;
    newState.authError = null;
    return newState;
  }),
  on(logoutAction, (state) => {
    const newState = { ...state };
    newState.user = null;
    return newState;
  }),
  on(loginStartAction, (state) => {
    const newState = { ...state };
    newState.authError = null;
    newState.loading = true;
    return newState;
  }),
  on(signupStartAction, (state) => {
    const newState = { ...state };
    newState.authError = null;
    newState.loading = true;
    return newState;
  }),
  on(authenticateFailAction, (state, action) => {
    const newState = { ...state };
    newState.user = null;
    newState.loading = false;
    newState.authError = action.payload;
    return newState;
  }),
  on(clearError, (state, action) => {
    const newState = { ...state };
    newState.authError = null;
    return newState;
  })
);
