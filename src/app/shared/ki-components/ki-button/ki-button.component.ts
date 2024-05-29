import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { SizeType } from "../../types/size.type";
import { NbComponentShape, NbComponentSize } from "@nebular/theme";

@Component({
  selector: "ki-button",
  templateUrl: "./ki-button.component.html",
  styleUrls: ["./ki-button.component.scss"],
})
export class KiButtonComponent {
  @Input() title: string;
  @Input() type: "submit" | "button" = "button";
  @Input() btnType:
    | "primary"
    | "basic"
    | "success"
    | "danger"
    | "warning"
    | "info" = "primary";
  @Input() size?: NbComponentSize = "medium";
  @Input() shape?: NbComponentShape = "rectangle";
  _isOutline: boolean = false;
  @Input() set outline(flag: boolean) {
    this._isOutline = flag;
    this.hero = !flag;
  }

  @Input() disabled: boolean;
  @Input() hero: boolean = true;
  @Input() showLoading: boolean;
  @Input() matchParent?: boolean;
  @Input() for?: string;
  @Input() iconClassName?: string;
  @Input() tooltip?: string;
  @Input() fullWidth?: boolean = false;
  @Output() clickCallback = new EventEmitter<Event>();

  @ViewChild("buttonRef", { static: false })
  buttonRef: ElementRef<HTMLButtonElement>;

  onBtnClicked(event: Event) {
    if (!this.showLoading) {
      this.clickCallback.emit(event);
    }
  }

  get innerElementRef() {
    return this.buttonRef;
  }
}
