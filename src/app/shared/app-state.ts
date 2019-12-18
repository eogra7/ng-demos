import {IGridSettingsState} from '../grid-settings/grid-settings.reducer';
import {IUserState} from '../user/user.reducer';

export interface IAppState {
  gridSettings: IGridSettingsState;
  user: IUserState;
}
