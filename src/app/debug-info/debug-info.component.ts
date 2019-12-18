import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../shared/app-state';
import { selectGridSettingsState } from '../grid-settings/grid-settings.reducer';

@Component({
  selector: 'app-debug-info',
  template: `
    <pre>{{ state$ | async | json }}</pre>
  `,
})
export class DebugInfoComponent {
  state$;
  constructor(readonly store: Store<IAppState>) {
    this.state$ = store.select(selectGridSettingsState);
  }
}
