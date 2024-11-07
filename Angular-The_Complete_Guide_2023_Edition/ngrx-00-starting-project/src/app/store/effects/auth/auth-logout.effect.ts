import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import * as AuthActions from '../../actions/auth.actions';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

export const authLogoutEffect = createEffect(
  (
    actions$ = inject(Actions),
    router = inject(Router),
    authService = inject(AuthService)
  ) => {
    return actions$.pipe(
      ofType(AuthActions.logoutAction),
      tap(() => {
        console.log('IN REMOVE ITEM');
        localStorage.removeItem('UserData');
        authService.clearLogoutTime();
        router.navigate(['/auth']);
      })
    );
  },
  { functional: true, dispatch: false }
);
