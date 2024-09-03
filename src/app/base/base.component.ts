import { Component } from "@angular/core";

import { MENU_ITEMS } from "./base-menu";
import { NbMenuService } from "@nebular/theme";
import { Subject, takeUntil } from "rxjs";
import { DynamicTabService } from "../@theme/service/dynamic-tab.service";
import { TabModelDto } from "../shared/models/tab.model";

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
      let tab: TabModelDto = {
        title: res.item.title,
        active: true,
        closable: true,
        route: res.item.link,
      };
      if (!res.item.link) {
        tab.closable = false;
      }

      dynamicTabService.addTab(tab);
    });
  }
  menu = MENU_ITEMS;
}
