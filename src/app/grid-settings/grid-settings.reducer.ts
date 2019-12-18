import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import {filterModelChanged, sortModelChanged} from './grid-settings.actions';

export interface IGridStateModel {
  filterModel: any;
  sortModel: any;
}

export interface IGridSettingsState {
  [gridKey: string]: IGridStateModel | undefined;
}

const initialGridSettingsState = {};

function updateFilterModel(state: IGridSettingsState, {gridKey, filterModel}) {
  const slice = {...state[gridKey], filterModel};
  return {...state, [gridKey]: slice}
}

function updateSortModel(state: IGridSettingsState, {gridKey, sortModel}) {
  const slice = {...state[gridKey], sortModel};
  return {...state, [gridKey]: slice}
}

const gridSettingsReducer = createReducer(
  initialGridSettingsState,
  on(filterModelChanged, (state, action) => {
    return updateFilterModel(state, action);
  }),
  on(sortModelChanged, (state, action) => {
    return updateSortModel(state, action);
  })
);

export function GridSettingsReducer(state: IGridSettingsState | undefined, action: Action | undefined) {
  return gridSettingsReducer(state, action);
}

export const selectGridSettingsState = createFeatureSelector<IGridSettingsState>('gridSettings');

export const selectGridState = (gridKey: string) => createSelector(
  selectGridSettingsState,
  state => state[gridKey]
);

