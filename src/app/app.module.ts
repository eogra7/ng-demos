import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { GridSettingsReducer } from './grid-settings/grid-settings.reducer';
import { BrowserModule } from '@angular/platform-browser';
import { SampleGridComponent } from './sample-grid/sample-grid.component';
import { AppRoutingModule } from './app-routing.module';
import { DebugInfoComponent } from './debug-info/debug-info.component';
import { RouterLinkCellComponent } from './shared/router-link-cell.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserReducer } from './user/user.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from './user/user.effects';

@NgModule({
  declarations: [
    AppComponent,
    SampleGridComponent,
    DebugInfoComponent,
    RouterLinkCellComponent,
    UserDetailComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    AgGridModule.withComponents([RouterLinkCellComponent]),
    StoreModule.forRoot({
      gridSettings: GridSettingsReducer,
      user: UserReducer,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([UserEffects])
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
