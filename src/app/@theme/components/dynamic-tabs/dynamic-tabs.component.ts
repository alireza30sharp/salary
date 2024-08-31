import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { TabModel } from "../../models/tab.model";
@Component({
  selector: "app-dynamic-tabs",
  templateUrl: "./dynamic-tabs.component.html",
  styleUrls: ["./dynamic-tabs.component.scss"],
})
export class DynamicTabsComponent {
  constructor() {}
  tabs: TabModel[] = [
    {
      title: "Tab 1",
      contentUrl: "http://localhost:4200/salary/system-operation/list",
      active: true,
      previewVisible: false,
      closable: true,
    },
    {
      title: "Tab 2",
      contentUrl: "http://localhost:4200/salary/work-shops",
      active: false,
      previewVisible: false,

      closable: true,
    },
    {
      title: "Tab 3",
      contentUrl: "http://localhost:4200/salary/work-shops",
      active: false,
      previewVisible: false,

      closable: true,
    },
  ];
  activeTabIndex: number = 0;

  selectedTab: TabModel = this.tabs[0];

  selectTab(tab: any) {
    this.tabs.forEach((t) => (t.active = false));
    tab.active = true;
    this.activeTabIndex = this.tabs.indexOf(tab);
  }

  closeTab(tab: any, index: number) {
    this.tabs.splice(index, 1);
    if (this.activeTabIndex >= index) {
      this.activeTabIndex = Math.max(0, this.activeTabIndex - 1);
    }
    if (this.tabs.length > 0) {
      this.selectTab(this.tabs[this.activeTabIndex]);
    }
  }
}
