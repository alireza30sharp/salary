import {
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { OverlayRef, Overlay } from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";
import { GeneralActionType } from "../../types/general-action.type";
import { KiButtonComponent } from "../../ki-components";

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"],
})
export class DropdownComponent {
  @Input() text?: string;
  @Input() iconClassName?: string;
  @Input() actions?: Omit<GeneralActionType, "items">[];
  @Input() buttonRef?: TemplateRef<any>;
  @Input() matchParent?: boolean;
  @Input() menuWidth?: string;
  @Input() menuInverseAlign?: boolean;
  @Input() actionRefData?: any;

  @ViewChild("defaultButtonRef", { static: false })
  defaultButtonRef: KiButtonComponent;
  @ViewChild("customButtonRef", { static: false })
  customButtonRef: ElementRef<HTMLDivElement>;
  @ViewChild("menuTmp", { static: false })
  menuTmp: TemplateRef<any>;

  currentContextMenu?: GeneralActionType;
  contextMenuIsShow?: boolean;

  private overlayRef?: OverlayRef;

  constructor(
    private readonly _overlay: Overlay,
    private readonly _viewContainerRef: ViewContainerRef
  ) {}

  buttonClickHandler(event: Event) {
    this._showSubMenu(
      this.customButtonRef?.nativeElement ||
        this.defaultButtonRef.innerElementRef.nativeElement
    );
  }

  menuClickHandler() {
    this._hideSubMenu();
  }

  private _showSubMenu(element: HTMLElement) {
    this.overlayRef = this._createOverlay(element);
    this.overlayRef.attach(
      new TemplatePortal(this.menuTmp, this._viewContainerRef)
    );
    setTimeout(() => {
      this.contextMenuIsShow = true;
    }, 0);
    this.overlayRef.backdropClick().subscribe(() => {
      this._hideSubMenu();
    });
  }

  private _hideSubMenu() {
    this.contextMenuIsShow = false;
    setTimeout(() => {
      this.currentContextMenu = null;
      this.overlayRef?.detach();
    }, 300);
  }

  private _createOverlay(element: HTMLElement) {
    return this._overlay.create({
      hasBackdrop: true,
      backdropClass: "cdk-overlay-transparent-backdrop",
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
      positionStrategy: this._overlay
        .position()
        .flexibleConnectedTo(element)
        .withPositions([
          {
            originX: this.menuInverseAlign ? "end" : "start",
            originY: "bottom",
            overlayX: this.menuInverseAlign ? "end" : "start",
            overlayY: "top",
          },
        ]),
    });
  }
}
