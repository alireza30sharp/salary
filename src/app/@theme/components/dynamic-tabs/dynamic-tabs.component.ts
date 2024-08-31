import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { TabModel } from "../../models/tab.model";
import { SessionStorage } from "ngx-webstorage";
import { SessionNames } from "../../../shared/utilities/session-names";
import { Router } from "@angular/router";
import { DynamicTabService } from "../../service/dynamic-tab.service";
@Component({
  selector: "app-dynamic-tabs",
  templateUrl: "./dynamic-tabs.component.html",
  styleUrls: ["./dynamic-tabs.component.scss"],
})
export class DynamicTabsComponent {
  @SessionStorage(SessionNames.TABS)
  tabs: TabModel[];
  constructor(
    private router: Router,
    private dynamicTabService: DynamicTabService
  ) {
    if (!this.tabs) {
      this.tabs = new Array<TabModel>();
    } else {
      this.selectedTab = this.tabs[0];
      this.changeTabToLatestOpened();
    }
  }

  selectedTab: TabModel;

  changeTabToLatestOpened() {
    if (this.tabs.length == 0) {
      return;
    }

    let latestTab = null;
    if (this.tabs.length > 1) {
      latestTab = this.tabs[this.tabs.length - 1];
    } else {
      latestTab = this.tabs[0];
    }
    this.router.navigate([latestTab.route], {
      queryParams: { tabId: latestTab.tabId },
    });
  }

  selectTab(tab: TabModel) {
    this.setActiveTab(tab);
    this.router.navigate([tab.route], { queryParams: { tabId: tab.tabId } });
  }

  closeTab(tab: TabModel, indexTab: number) {
    this.dynamicTabService.deleteTab(indexTab);

    if (tab.active == true) {
      if (this.tabs.length > 0) {
        this.setActiveTab(this.tabs[indexTab - 1]);
      } else {
        this.router.navigate(["/"]);
      }
    }
  }

  private setActiveTab(selectedTab: any) {
    this.dynamicTabService.setActiveTab(selectedTab);
  }
}
