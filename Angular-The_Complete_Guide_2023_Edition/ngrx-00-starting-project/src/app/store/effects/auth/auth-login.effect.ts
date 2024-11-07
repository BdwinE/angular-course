import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, of, tap } from 'rxjs';
import { User } from 'src/app/auth/user.model';
import { environment } from 'src/environments/environment';
import * as AuthActions from '../../actions/auth.actions';
import { AuthService } from 'src/app/auth/auth.service';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable()
export class AuthLoginEffect {
  authLoginEffect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.loginStartAction) => {
          console.log('AuthData:');
          console.log(authData);
          return this.http
            .post<AuthResponseData>(
              'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
                environment.firebaseAPIKey,
              {
                email: authData['email'],
                password: authData['password'],
                returnSecureToken: true,
              }
            )
            .pipe(
              tap((resData) => {
                this.authService.setLogoutTimer(+resData.expiresIn * 1000);
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
      ),
    { dispatch: true }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private authService: AuthService
  ) {}
}
