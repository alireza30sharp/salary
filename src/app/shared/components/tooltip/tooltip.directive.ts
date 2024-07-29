import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from "@angular/core";
import { TooltipComponent } from "./tooltip.component";
import { PositionType } from "../../types/position.type";

@Directive({
  selector: "[appTooltip]",
})
export class TooltipDirective implements OnChanges, OnDestroy {
  @Input("appTooltip") title: string;
  @Input("appTooltipPosition") position?: PositionType;
  @Input("appTooltipOffsetX") offsetX: number = 0;
  @Input("appTooltipHide") hide?: boolean;
  @Input("appTooltipInverseColor") inverseColor?: boolean;

  private _componentRef: ComponentRef<TooltipComponent> = null;
  private _timeout: any;

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private _appRef: ApplicationRef,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _injector: Injector
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this._componentRef) {
      if (changes["title"]) {
        this._componentRef.instance.title = this.title;
      }

      if (changes["inverseColor"]) {
        this._componentRef.instance.inverseColor = this.inverseColor;
      }

      if (changes["hide"]) {
        this._componentRef.instance.show = !this.hide;
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  @HostListener("mouseenter", ["$event.target"])
  mouseEnterHandler() {
    if (this.hide) return;
    clearTimeout(this._timeout);
    this._timeout = setTimeout(() => {
      this.create();
    }, 300);
  }

  @HostListener("mouseleave", ["$event.target"])
  mouseLeaveHandler() {
    clearTimeout(this._timeout);
    this.destroy();
  }

  create() {
    if (this._componentRef) return;
    const componentFactory =
      this._componentFactoryResolver.resolveComponentFactory(TooltipComponent);
    this._componentRef = componentFactory.create(this._injector);
    this._componentRef.instance.title = this.title;
    this._componentRef.instance.top = "0";
    this._componentRef.instance.left = "0";
    this._componentRef.instance.inverseColor = this.inverseColor;
    this._appRef.attachView(this._componentRef.hostView);
    const domEl: HTMLElement = (
      this._componentRef.hostView as EmbeddedViewRef<any>
    ).rootNodes[0] as HTMLElement;
    document.body.appendChild(domEl);

    setTimeout(() => {
      this._componentRef.instance.show = true;
      this.setPosition();
    }, 0);
  }

  destroy(): void {
    if (!this._componentRef) return;
    this._componentRef.instance.show = false;
    setTimeout(() => {
      try {
        this._appRef.detachView(this._componentRef?.hostView);
      } catch {}
      if (this._componentRef) {
        this._componentRef.destroy();
        this._componentRef = null;
      }
    }, 500);
  }

  private setPosition() {
    if (!this._componentRef) return;
    const direction =
      document.body.getAttribute("dir") == "rtl" ? "rtl" : "ltr";
    const { top, left, width, height } =
      this._elementRef.nativeElement.getBoundingClientRect();
    const spacing = 8;

    if (!this.position) {
      this.position = "top"; // TODO: get best location
    }

    switch (this.position) {
      case "top":
        this._componentRef.instance.top = top - spacing + "px"; // Position above the element
        this._componentRef.instance.left =
          left + width / 2 + this.offsetX + "px"; // Center horizontally
        this._componentRef.instance.transform =
          "translateX(-50%) translateY(-100%)"; // Adjust for tooltip height
        break;
      case "bottom":
        this._componentRef.instance.top = top + height + spacing + "px"; // Position below the element
        this._componentRef.instance.left =
          left + width / 2 + this.offsetX + "px"; // Center horizontally
        this._componentRef.instance.transform = "translateX(-50%)"; // No vertical adjustment needed
        break;
      case "start":
        this._componentRef.instance.top = top + Math.round(height / 2) + "px"; // Center vertically
        this._componentRef.instance.transform =
          "translateY(-50%)" + (direction == "rtl" ? "" : " translateX(-100%)"); // Adjust for tooltip width
        this._componentRef.instance.left =
          (direction == "rtl"
            ? left + width + spacing + this.offsetX // Position to the right in RTL
            : left - spacing - this.offsetX) + "px"; // Position to the left in LTR
        break;
      case "end":
        this._componentRef.instance.top = top + Math.round(height / 2) + "px"; // Center vertically
        this._componentRef.instance.transform =
          "translateY(-50%)" + (direction == "rtl" ? " translateX(-100%)" : ""); // Adjust for tooltip width
        this._componentRef.instance.left =
          (direction == "ltr"
            ? left + width + spacing + this.offsetX // Position to the right in LTR
            : left - spacing - this.offsetX) + "px"; // Position to the left in RTL
        break;
    }
  }
}
