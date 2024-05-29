import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewEncapsulation,
  HostListener,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { KiTabComponent } from "./ki-tab/ki-tab.component";
import { TabDirective } from "./tab.directive";
import { TabInterface } from "./tab.interface";
import { OverflowType } from "../../types/overflow.type";

@Component({
  selector: "ki-tab-group",
  templateUrl: "./ki-tab-group.component.html",
  styleUrls: ["./ki-tab-group.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class KiTabGroupComponent
  implements AfterContentInit, OnChanges, AfterViewInit
{
  @Input() type?: "horizontal" | "vertical" = "horizontal";
  @Input() tabColWidth?: string;
  @Input() tabContentEllipsis?: boolean;
  @Input() noLayout?: boolean;
  @Input() noTabContent?: boolean;
  @Input() persistOpenedTab?: boolean;
  @Input() selectedTabIndex: number = -1;
  @Input() theme?: "normal" | "inverse" | "inverse-secondary";
  @Input() bordered?: boolean;
  @Input() noOuterBorder?: boolean;
  @Input() isSticky?: boolean;
  @Input() height?: string;
  @Input() overflow?: OverflowType;
  @Input() overflowX?: OverflowType;

  @Output() selectCallback = new EventEmitter<any>();

  @ViewChild("header") headerRef: ElementRef<HTMLDivElement>;

  @ContentChildren(KiTabComponent) tabComonents: QueryList<KiTabComponent>;
  @ContentChildren(TabDirective) directives: QueryList<TabDirective>;

  items: TabInterface[] = [];
  groups: string[] = [];

  prevButtonIsShow = false;
  nextButtonIsShow = false;
  internalSelectedTabIndex: number;

  private openedTabIndex = new Map();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.bordered) {
      this.noLayout = true;
    }

    const selectedTabIndexChanges = changes["selectedTabIndex"];

    if (
      selectedTabIndexChanges &&
      !selectedTabIndexChanges.firstChange &&
      selectedTabIndexChanges.currentValue !=
        selectedTabIndexChanges.previousValue
    ) {
      this.selectTab(this.items[this.selectedTabIndex], this.selectedTabIndex);
    }
  }

  ngAfterContentInit() {
    if (this.tabComonents.length) {
      this.items = this.tabComonents.toArray().map((item) => ({ ...item }));
      if (
        this.selectedTabIndex == -1 &&
        !this.tabComonents.toArray().some((x) => x.link)
      ) {
        const activeTabIndex = this.tabComonents
          .toArray()
          .findIndex((x) => x.active);
        this.selectedTabIndex = activeTabIndex != -1 ? activeTabIndex : 0;

        if (activeTabIndex == -1) {
          this.tabComonents.get(this.selectedTabIndex).active = true;
        }
      }
    } else if (this.directives.length) {
      if (this.selectedTabIndex == -1) {
        const activeTabIndex = this.directives
          .toArray()
          .findIndex((x) => x.active);

        this.selectedTabIndex = activeTabIndex != -1 ? activeTabIndex : 0;
      }

      this.items = this.directives.toArray().map((item) => ({ ...item }));
      this.openedTabIndex.set(this.selectedTabIndex, true);
      const currentTab = this.directives.get(this.selectedTabIndex);
      setTimeout(() => {
        currentTab.createView();
        currentTab.show();
      }, 0);
    }
    const groups = new Map();
    this.items.forEach((item) => {
      if (item.groupName) groups.set(item.groupName, item.groupName);
    });
    groups.forEach((groupValue) => {
      this.groups.push(groupValue);
    });
    this.internalSelectedTabIndex = this.selectedTabIndex;
  }

  ngAfterViewInit(): void {
    this.adjustSlideButtonsVisibiltyState();
    this.headerRef.nativeElement.addEventListener(
      "scroll",
      this.adjustSlideButtonsVisibiltyState
    );
  }

  selectTab(tab: TabInterface, index: number) {
    if (index == this.internalSelectedTabIndex) return;

    this.internalSelectedTabIndex = index;
    this.selectCallback.emit({ tab, index });

    if (this.tabComonents.length) {
      this.tabComonents.forEach((x) => {
        x.active = false;
      });
      this.tabComonents.get(index).active = true;
    } else if (this.directives.length) {
      this.directives.forEach((x) => {
        if (!this.persistOpenedTab) {
          x.removeView();
        } else {
          x.hide();
        }
      });
      const currentTab = this.directives.get(index);
      if (!this.persistOpenedTab) {
        currentTab.createView();
      } else {
        if (!this.openedTabIndex.has(index)) {
          this.openedTabIndex.set(index, true);
          currentTab.createView();
        }
      }
      currentTab.show();
    }
  }

  hasUngroupedTab() {
    return this.items.some((x) => !x.groupName);
  }

  prevSlideButtonHandler() {
    this.slide(-200);
  }

  nextSlideButtonHandler() {
    this.slide(200);
  }

  @HostListener("window:resize", ["$event"])
  private windowResize() {
    this.adjustSlideButtonsVisibiltyState();
  }

  private adjustSlideButtonsVisibiltyState = () => {
    const element = this.headerRef.nativeElement;
    const scrollLeft = element.scrollLeft;
    const scrollWidth = element.scrollWidth;
    const offsetWidth = element.offsetWidth;

    this.prevButtonIsShow = false;
    this.nextButtonIsShow = false;
    if (scrollWidth - 1 > offsetWidth) {
      if (scrollLeft > 0) {
        this.prevButtonIsShow = true;
      }

      if (scrollWidth - 1 > offsetWidth + scrollLeft) {
        this.nextButtonIsShow = true;
      }
    }
  };

  private slide(width: number) {
    const element = this.headerRef.nativeElement;
    const scrollWidth = element.scrollWidth;
    const scrollLeft = Math.min(
      scrollWidth,
      Math.max(0, element.scrollLeft + width)
    );
    element.scroll({ left: scrollLeft, behavior: "smooth" });
  }
}
