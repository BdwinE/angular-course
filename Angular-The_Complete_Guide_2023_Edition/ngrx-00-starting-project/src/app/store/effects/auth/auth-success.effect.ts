import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import * as AuthActions from '../../actions/auth.actions';
import { Router } from '@angular/router';
import { authenticate } from '../../actions/auth.actions';

export const authRedirect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(AuthActions.AUTHENTICATE_SUCCESS),
      tap((authSuccessAction) => {
        if (authSuccessAction.redirect) router.navigate(['/']);
      })
    );
  },
  { functional: true, dispatch: false }
);
