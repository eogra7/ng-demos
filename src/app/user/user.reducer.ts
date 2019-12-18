import { IUser } from './user.model';
import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { loadUsersSuccess } from './user.actions';

export interface IUserState {
  loaded: boolean;
  users: IUser[] | undefined;
}

const initialUserState: IUserState = {
  loaded: false,
  users: undefined,
};

const reducer = createReducer(
  initialUserState,
  on(loadUsersSuccess, (state, action) => {
    return { ...state, loaded: true, users: action.payload };
  })
);

export function UserReducer(
  state: IUserState | undefined,
  action: Action | undefined
) {
  return reducer(state, action);
}

export const selectUserState = createFeatureSelector<IUserState>('user');

export const selectUsers = createSelector(
  selectUserState,
  state => state.users
);

export const selectUserByGuid = (guid: string) =>
  createSelector(
    selectUsers,
    users => users ? users.find(u => u.guid === guid) : null
  );

export const selectIsLoaded = createSelector(
  selectUserState,
  state => state.loaded
);
