import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { LocalStorageService, SessionStorage } from "ngx-webstorage";
import { SessionNames } from "../../shared/utilities/session-names";
import { TabModel } from "../models/tab.model";
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
  addTab(tab: TabModel) {
    this.changeToNotActive();
    let openedTab = this.tabs.find((rec) => rec.route == tab.route);
    if (openedTab == null || openedTab == undefined) {
      let tabId = Math.random().toString(36).substring(2, 7);
      tab.tabId = tabId;
      this.tabs = this.tabs.concat(tab);
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
    this.tabs = Object.assign([], this.tabs);
  }
  changeTabTitle(tabId: string, newTitle: string) {
    let tab = this.tabs.find((rec) => rec.tabId == tabId);
    tab.title = newTitle;
    tab.isNew = false;
  }
}
