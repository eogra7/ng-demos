import { Component, OnInit } from '@angular/core';
import { IUser } from '../user/user.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from '../shared/app-state';
import { selectUserByGuid } from '../user/user.reducer';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent implements OnInit {
  user$: Observable<IUser>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store<IAppState>
  ) {}

  ngOnInit() {
    this.user$ = this.route.params.pipe(
      map(params => params.userId),
      switchMap(userId => {
        return this.store.select(selectUserByGuid(userId));
      })
    );
  }
}
