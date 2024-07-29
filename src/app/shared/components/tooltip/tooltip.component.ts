import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { PositionType } from "../../types/position.type";

@Component({
  selector: "app-tooltip",
  templateUrl: "./tooltip.component.html",
  styleUrls: ["./tooltip.component.scss"],
})
export class TooltipComponent {
  @Input() title: string;
  @Input() position?: PositionType;
  @Input() show?: boolean;
  @Input() top?: string;
  @Input() left?: string;
  @Input() transform?: string;
  @Input() inverseColor?: boolean;

  @ViewChild("tooltipRef", { static: false })
  tooltipRef: ElementRef<HTMLSpanElement>;

  constructor() {}

  getWidth() {
    return this.tooltipRef.nativeElement.offsetWidth;
  }

  getHeight() {
    return this.tooltipRef.nativeElement.offsetHeight;
  }
}
