import { AfterViewInit, Component } from "@angular/core";

import { MENU_ITEMS } from "./base-menu";
import { NbMenuService } from "@nebular/theme";
import { finalize, Subject, takeUntil } from "rxjs";
import { DynamicTabService } from "../@theme/service/dynamic-tab.service";
import { TabModelDto } from "../shared/models/tab.model";
import { ClientPrerequisitsService } from "../services/client-prerequisits";

@Component({
  selector: "ngx-base",
  styleUrls: ["base.component.scss"],
  template: `
    <ki-spinner [color]="'dark'" [matchParent]="true" *ngIf="loading">
    </ki-spinner>
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class BaseComponent implements AfterViewInit {
  private destroy$ = new Subject<void>();

  constructor(
    private menuService: NbMenuService,
    private dynamicTabService: DynamicTabService,
    private _clientPrerequisitsService: ClientPrerequisitsService
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
  loading: boolean = false;
  menu = MENU_ITEMS;
  ngAfterViewInit(): void {
    this.loading = true;
    this._clientPrerequisitsService
      .getClientPrerequisits(true)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe();
  }
}
