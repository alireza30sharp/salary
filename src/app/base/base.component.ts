import { Component } from '@angular/core';

import { MENU_ITEMS } from './base-menu';

@Component({
  selector: 'ngx-base',
  styleUrls: ['base.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class BaseComponent {

  menu = MENU_ITEMS;
}
