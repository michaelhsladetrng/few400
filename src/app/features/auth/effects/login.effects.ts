import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as userActions from '../actions/user.actions';
import { environment } from '../../../../environments/environment';
import { map, switchMap, catchError, tap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import * as appActions from '../../../actions/app.actions';
@Injectable()
export class LoginEffects {

  checkForTokenOnApplicationStarted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted),
      map(() => localStorage.getItem('token')),
      filter(token => token !== null && token !== ''),
      map(token => extractUserDataFromJwt(token)),
      map(user => userActions.loginRequestSucceeded(user))
    )
  );


  removeToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loginRequestFailed, userActions.logoutRequested),
      tap(() => localStorage.setItem('token', ''))
    ), { dispatch: false }
  );

  storeToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loginRequestSucceeded),
      tap(a => localStorage.setItem('token', a.token)
      )
    ), { dispatch: false }
  );



  // loginRequest -> (loginRequest Succeeded | loginRequestFailed)
  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loginRequest),
      switchMap((a) => this.client.post<{ access_token: string }>(environment.authUrl, { username: a.username, password: a.password })
        .pipe(
          map(r => userActions.loginRequestSucceeded(extractUserDataFromJwt(r.access_token))),
          catchError(() => of(userActions.loginRequestFailed({ message: 'Bad Username or Password' })))
        )
      )
    )
    , { dispatch: true });

  constructor(private actions$: Actions, private client: HttpClient) { }
}


function extractUserDataFromJwt(token: string): { username: string, token: string } {
  const info = token.split('.')[1];

  const obj = JSON.parse(atob(info)) as { username: string };
  return { username: obj.username, token };
}
