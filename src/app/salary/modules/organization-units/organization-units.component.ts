import { Component } from "@angular/core";
import { MENU_ITEMS } from "./organization-units-menu";

@Component({
  selector: "ngx-organization-units",

  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class OrganizationUnitsComponent {
  menu = MENU_ITEMS;
}
