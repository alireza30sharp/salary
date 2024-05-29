import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from "@nebular/theme";

import { UserData } from "../../../@core/data/users";
import { LayoutService } from "../../../@core/utils";
import { map, switchMap, takeUntil } from "rxjs/operators";
import { Observable, Subject, of } from "rxjs";
import { NbAuthService, NbAuthToken, strategieName } from "../../../auth";
import { Router } from "@angular/router";
import { SelectOptionInterface } from "../../../shared/interfaces/select-option.interface";
import { ChangeWorkShopsService } from "../../../services/change-work-shop.service";
import { TourService } from "../../../shared/services/tour.service";
import { STEPS_BUTTONS } from "../../../shared/models/shepherd-config";
export interface CacheDataInterface {
  value?: number;
  label?: string;
  isDefault?: boolean;
}

@Component({
  selector: "ngx-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  //
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: "default",
      name: "Light",
    },
    {
      value: "dark",
      name: "Dark",
    },
    {
      value: "cosmic",
      name: "Cosmic",
    },
    {
      value: "corporate",
      name: "Corporate",
    },
  ];

  currentTheme = "default";
  WorkShopsOptions?: SelectOptionInterface<any>[];
  WorkShopsID: any;
  lockupsIsLoading?: boolean = false;
  userMenu = [{ title: "Profile" }, { title: "Log out" }];
  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private _changeWorkShops: ChangeWorkShopsService,
    private _tourService: TourService,

    private router: Router
  ) {
    let WorkShops = localStorage.getItem("WorkShopsOptions");
    if (WorkShops) {
      let model: CacheDataInterface[] = JSON.parse(WorkShops);
      let findDefult = model.find((f) => f.isDefault == true);
      if (findDefult) {
        this.WorkShopsID = +findDefult.value;
      } else {
        this.WorkShopsID = +model[0].value;
      }
      localStorage.setItem("WorkShopsID", this.WorkShopsID);
      this.WorkShopsOptions = JSON.parse(WorkShops);
    }
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.userService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => (this.user = users.nick));

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
      );

    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$)
      )
      .subscribe((themeName) => {
        this.currentTheme = themeName;
      });
    this.menuService.onItemClick().subscribe((res) => {
      if (res.item.title === "Log out") {
        this.router.navigate(["auth/logout"]);
      }
      // this.service.getToken().pipe(
      //   switchMap((token: NbAuthToken) => {
      //     const JWT = `Bearer ${token.getValue()}`;
      //     return    this.service.refreshToken(strategieName,{refToken:token.getValue()})
      //   })).subscribe(res=>{
      //     console.log(res)
      //   })
    });

    this._changeWorkShops.activeWorkShopsSource$.subscribe((res) => {
      let find = this.WorkShopsOptions.find((f) => f.label == res);
      if (find) {
        this.WorkShopsID = +find.value;
      }
      localStorage.setItem("WorkShopsID", this.WorkShopsID);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    this.layoutService.changeLayoutSize();

    return false;
  }
  workShopsChange() {
    localStorage.setItem("WorkShopsID", this.WorkShopsID);
    this._changeWorkShops.WorkShopsSource$.next(this.WorkShopsID);
  }
  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
  startTour() {
    const steps = [
      {
        attachTo: {
          element: "nb-select",
          on: "bottom",
        },
        buttons: [STEPS_BUTTONS.next],
        classes: "custom-class-name-1 custom-class-name-2",
        title: "انتخاب تم سامانه",
        text: `در گزینه های زیر میتونید تم رو عوض کنید:
        <a href="https://www.google.com" rel="_blank">Google Link</a>
        `,
      },
      {
        attachTo: {
          element: "ki-select-header",
          on: "bottom",
        },
        buttons: [STEPS_BUTTONS.back, STEPS_BUTTONS.next],
        classes: "custom-class-name-1 custom-class-name-2",
        id: "intro1",
        title: "انتخاب کارگاه",
        text: `کارگاه پیش فرض شما این است برای تغییر پیش فرض حتما باید برید صفحه خودش:
        <a href="https://www.google.com" rel="_blank">Google Link</a>
        `,
      },
    ];
    this._tourService.addSteps(steps);
  }
}
