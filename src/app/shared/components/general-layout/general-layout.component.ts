import { Component, Input } from "@angular/core";
import { OverflowType } from "../../types/overflow.type";

@Component({
  selector: "app-general-layout",
  templateUrl: "./general-layout.component.html",
  styleUrls: ["./general-layout.component.scss"],
})
export class GeneralLayoutComponent {
  @Input() overflow?: OverflowType;
}
