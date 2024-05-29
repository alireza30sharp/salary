import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnDestroy,
} from "@angular/core";
import { OverflowType } from "../../types/overflow.type";

export interface TabContextInterface {
  $implicit: string;
  active: boolean;
}

@Directive({
  selector: "[appTab]",
})
export class TabDirective implements OnDestroy {
  @Input("appTab") text: string;
  @Input("appTabActive") active?: boolean;
  @Input("appTabIconClassName") iconClassName?: string;
  @Input("appTabGroupName") groupName?: string;
  @Input("appTabIsBold") isBold?: boolean;
  @Input("appTabOtherSide") otherSide?: boolean;
  @Input("appTabContentHeight") contentHeight?: string;
  @Input("appTabOverflow") overflow?: OverflowType;

  constructor(
    private vcr: ViewContainerRef,
    private tmpl: TemplateRef<TabContextInterface>
  ) {}

  ngOnDestroy() {
    this.vcr.clear();
  }

  createView() {
    this.vcr.clear();
    this.vcr.createEmbeddedView(this.tmpl, {
      $implicit: this.text,
      active: this.active,
    });
  }

  removeView() {
    this.vcr.clear();
  }

  show() {
    this.setSelectedState(true);
  }

  hide() {
    this.setSelectedState(false);
  }

  private setSelectedState(state: boolean) {
    const el = this.tmpl.elementRef.nativeElement
      .previousSibling as HTMLDivElement;
    if (typeof el?.setAttribute === "function") {
      el.setAttribute("aria-selected", state.toString());
      if (this.contentHeight) {
        el.style.height = state ? this.contentHeight : "";
      }
    }
  }
}
