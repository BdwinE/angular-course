import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../../actions/auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from './auth-login.effect';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/auth/user.model';
import { AuthService } from 'src/app/auth/auth.service';

export const authSignup = createEffect(
  (
    actions$ = inject(Actions),
    http = inject(HttpClient),
    authService = inject(AuthService)
  ) => {
    return actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((signupAction: AuthActions.signupStart) => {
        return http
          .post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
              environment.firebaseAPIKey,
            {
              email: signupAction['email'],
              password: signupAction['password'],
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((resData) => {
              authService.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map((resData) => {
              const expirationDate = new Date(
                new Date().getTime() + +resData.expiresIn * 1000
              );
              const newUser = new User(
                resData.email,
                resData.localId,
                resData.idToken,
                expirationDate
              );
              localStorage.setItem('UserData', JSON.stringify(newUser));
              return AuthActions.authenticateAction({
                user: newUser,
                redirect: true,
              });
            }),
            catchError((errorRes) => {
              let errorMessage = 'An unknown error occurred!';
              if (!errorRes.error || !errorRes.error.error) {
                return of(
                  AuthActions.authenticateFailAction({
                    payload: errorMessage,
                  })
                );
              }
              switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                  errorMessage = 'This email exists already';
                  break;
                case 'EMAIL_NOT_FOUND':
                  errorMessage = 'This email does not exist.';
                  break;
                case 'INVALID_PASSWORD':
                  errorMessage = 'This password is not correct.';
                  break;
              }
              return of(
                AuthActions.authenticateFailAction({ payload: errorMessage })
              );
            })
          );
      })
    );
  },
  { functional: true, dispatch: true }
);
