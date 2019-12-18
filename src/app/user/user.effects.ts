import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { first, map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { loadUsers, loadUsersSuccess } from './user.actions';
import { of } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class UserEffects implements OnInitEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(action =>
        this.users.fetch$().pipe(
          map(payload =>
            loadUsersSuccess({
              payload,
              action,
            })
          )
          // catchError(error =>
          //   of(loadUsersError({error, action}))
          // )
        )
      )
    )
  );

  ngrxOnInitEffects(): Action {
    return loadUsers();
  }

  constructor(
    private readonly actions$: Actions,
    private readonly users: UserService
  ) {}
}
