import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { TabModel } from "../models/tab.model";
import { SessionStorage } from "ngx-webstorage";
import { SessionNames } from "../../shared/utilities/session-names";

@Injectable({
  providedIn: "root",
})
export class DynamicTabService {
  @SessionStorage(SessionNames.TABS)
  private tabs: TabModel[];
  constructor() {
    if (!this.tabs) {
      this.tabs = new Array<TabModel>();
    }
  }

  addTab(
    title: string,
    closable: boolean = true,
    route: string,
    imgSrc: string,
    supTag: string,
    isNew: boolean = false
  ) {
    let openedTab = this.tabs.find((rec) => rec.route == route);
    this.changeToNotActive();

    if (openedTab == null || openedTab == undefined) {
      let tabId = Math.random().toString(36).substring(2, 7);

      const newTab: TabModel = {
        title,
        closable,
        route,
        imgSrc,
        supTag,
        active: true,
        isNew: isNew,
        tabId: tabId,
      };
      this.tabs = this.tabs.concat(newTab);
    } else {
      openedTab.active = true;
    }
  }

  private changeToNotActive() {
    this.tabs.forEach((tab) => {
      tab.active = false;
    });
  }

  setActiveTab(tab: TabModel) {
    this.changeToNotActive();
    this.tabs.find((rec) => rec.route == tab.route).active = true;
  }

  deleteTab(index: number) {
    this.tabs.splice(index, 1);
  }

  changeTabTitle(tabId: string, newTitle: string) {
    let tab = this.tabs.find((rec) => rec.tabId == tabId);
    tab.title = newTitle;
    tab.isNew = false;
  }
}
