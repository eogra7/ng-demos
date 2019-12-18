import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FilterChangedEvent,
  GridOptions,
  GridReadyEvent,
  ICellRendererParams,
  SortChangedEvent,
} from 'ag-grid-community';
import { Observable } from 'rxjs';
import { IUser } from '../user/user.model';
import { RouterLinkCellComponent } from '../shared/router-link-cell.component';
import { Store } from '@ngrx/store';
import { IAppState } from '../shared/app-state';
import { selectUsers } from '../user/user.reducer';
import {
  filterModelChanged,
  sortModelChanged,
} from '../grid-settings/grid-settings.actions';
import { selectGridState } from '../grid-settings/grid-settings.reducer';
import { filter, first } from 'rxjs/operators';

@Component({
  selector: 'app-sample-grid',
  templateUrl: './sample-grid.component.html',
  styles: [],
  providers: [{ provide: 'gridKey', useValue: 'sample-users-grid' }],
})
export class SampleGridComponent implements OnInit, OnDestroy {
  gridOptions: GridOptions = {
    defaultColDef: {
      sortable: true,
      filter: true,
    },
    columnDefs: [
      { field: 'name' },
      { field: 'age', filter: 'number' },
      { field: 'eyeColor' },
      {
        cellRendererFramework: RouterLinkCellComponent,
        cellRendererParams: {
          getParams(params: ICellRendererParams) {
            return {
              routerLink: `${params.data.guid}`,
            };
          },
        },
      },
    ],
    onGridReady: event => this.onGridReady(event),
    onSortChanged: event => this.onSortChanged(event),
    onFilterChanged: event => this.onFilterChanged(event),
  };

  users$: Observable<IUser[]>;

  constructor(
    private readonly store: Store<IAppState>,
    @Inject('gridKey') private readonly gridKey: string
  ) {
    this.users$ = this.store.select(selectUsers);
  }

  ngOnInit() {
    console.log('SampleGridComponent: Initialized');
  }

  ngOnDestroy(): void {
    console.log('SampleGridComponent: Destroyed');
  }

  onGridReady = (event: GridReadyEvent) => {
    this.store
      .select(selectGridState(this.gridKey))
      .pipe(
        filter(model => model !== undefined),
        first()
      )
      .subscribe(model => {
        event.api.setFilterModel(model.filterModel);
        event.api.setSortModel(model.sortModel);
      });
  };

  onSortChanged = (event: SortChangedEvent) => {
    this.store.dispatch(
      sortModelChanged({
        gridKey: this.gridKey,
        sortModel: event.api.getSortModel(),
      })
    );
  };

  onFilterChanged(event: FilterChangedEvent) {
    this.store.dispatch(
      filterModelChanged({
        gridKey: this.gridKey,
        filterModel: event.api.getFilterModel(),
      })
    );
  }
}
