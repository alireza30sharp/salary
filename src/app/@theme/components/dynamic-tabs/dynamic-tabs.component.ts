import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { SessionStorage, SessionStorageService } from "ngx-webstorage";
import { SessionNames } from "../../../shared/utilities/session-names";
import { DynamicTabService } from "../../service/dynamic-tab.service";
import { TabModel } from "../../models/tab.model";
@Component({
  selector: "app-dynamic-tabs",
  templateUrl: "./dynamic-tabs.component.html",
  styleUrls: ["./dynamic-tabs.component.scss"],
})
export class DynamicTabsComponent implements AfterViewInit {
  @SessionStorage(SessionNames.TABS)
  tabs: TabModel[];

  constructor(
    private dynamicTabService: DynamicTabService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private localSt: SessionStorageService
  ) {
    if (!this.tabs) {
      this.tabs = new Array<TabModel>();
    }
    this.localSt.observe(SessionNames.TABS).subscribe((value) => {
      this.changeTabToLatestOpened();
    });
  }
  ngAfterViewInit(): void {
    this.changeTabToLatestOpened();
  }

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
