import {Action, createAction, props} from '@ngrx/store';
import {IUser} from './user.model';

export const loadUsers = createAction(
  '[User API] Load'
);

export const loadUsersSuccess = createAction(
  '[User API] Load Success',
  props<{ payload: IUser[]; action?: Action; }>()
);

export const loadUsersError = createAction(
  '[User API] Load Error',
  props<{ error: unknown; action: Action; }>()
);
