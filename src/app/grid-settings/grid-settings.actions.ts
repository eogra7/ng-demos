import { createAction, props } from '@ngrx/store';


export const sortModelChanged = createAction(
  `[Grid Settings] Sort Model Changed`,
  props<{gridKey: string; sortModel: any}>()
);

export const filterModelChanged = createAction(
  `[Grid Settings] Filter Model Changed`,
  props<{ gridKey: string; filterModel: any }>()
);
