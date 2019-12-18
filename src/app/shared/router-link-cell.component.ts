import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

export interface IRouterLinkCellRendererParams {
  routerLink: any[] | string;
  icon: string | undefined;
  label: string | undefined;
}

@Component({
  selector: 'app-router-link-cell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a [routerLink]="routerLink">
        <clr-icon [attr.shape]="icon"></clr-icon>
        {{label}}
    </a>
  `,
  styles: [
    `a {width: 100%; height: 100%; display: inline-block}`
  ]
})
export class RouterLinkCellComponent implements ICellRendererAngularComp {
  routerLink;
  icon;
  label;
  agInit(params: ICellRendererParams & {getParams: (ICellRendererParams) => IRouterLinkCellRendererParams}): void {
    const {routerLink, icon = 'link', label = params.valueFormatted} = params.getParams(params);
    this.routerLink = routerLink;
    this.icon = icon;
    this.label = label;
  }

  refresh(params: any): boolean {
    return false;
  }
}
