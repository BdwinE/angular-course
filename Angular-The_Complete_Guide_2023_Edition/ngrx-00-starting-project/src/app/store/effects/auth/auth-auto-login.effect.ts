import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, of, tap } from 'rxjs';
import * as AuthActions from '../../actions/auth.actions';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/user.model';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth/auth.service';

export const authAutoLoginEffect = createEffect(
  (actions$ = inject(Actions), authentService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(AuthActions.autoLoginAction),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('UserData'));
        if (!userData) {
          return { type: 'DUMMY' };
        }

        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
          //this.user.next(loadedUser);
          const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();
          authentService.setLogoutTimer(expirationDuration);
          return AuthActions.authenticateAction({
            user: loadedUser,
            redirect: false,
          });
          // const expirationDuration =
          //   new Date(userData._tokenExpirationDate).getTime() -
          //   new Date().getTime();
          // this.autoLogout(expirationDuration);
        }
        return { type: 'DUMMY' };
      })
    );
  },
  { functional: true, dispatch: true }
);
