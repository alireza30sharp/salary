import { Component } from "@angular/core";

import { MENU_ITEMS } from "./base-menu";
import { NbMenuService } from "@nebular/theme";
import { Subject, takeUntil } from "rxjs";
import { DynamicTabService } from "../@theme/service/dynamic-tab.service";

@Component({
  selector: "ngx-base",
  styleUrls: ["base.component.scss"],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class BaseComponent {
  private destroy$ = new Subject<void>();

  constructor(
    private menuService: NbMenuService,
    private dynamicTabService: DynamicTabService
  ) {
    menuService.onItemSelect().subscribe((res) => {
      dynamicTabService.addTab(
        res.item.title,
        true,
        res.item.link,
        res.item.icon ? res.item.icon.toString() : "",
        ""
      );
    });
  }
  menu = MENU_ITEMS;
}
