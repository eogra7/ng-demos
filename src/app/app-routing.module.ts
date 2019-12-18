import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SampleGridComponent } from './sample-grid/sample-grid.component';
import {UserDetailComponent} from './user-detail/user-detail.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'users' },
      { path: 'users', component: SampleGridComponent },
      {path: 'users/:userId', component: UserDetailComponent}
    ]),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
