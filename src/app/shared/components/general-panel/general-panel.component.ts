import { Component, ContentChild, Input, TemplateRef } from "@angular/core";
import { GeneralHeaderComponent } from "../general-header/general-header.component";
import { OverflowType } from "../../types/overflow.type";

@Component({
  selector: "app-general-panel",
  templateUrl: "./general-panel.component.html",
  styleUrls: ["./general-panel.component.scss"],
})
export class GeneralPanelComponent extends GeneralHeaderComponent {
  @Input() height?: string;
  @Input() overflow?: OverflowType;
  @Input() contentOverflow?: OverflowType;
  @Input() noPadding?: boolean;
  @Input() noContentPadding?: boolean;

  @ContentChild("header", { static: false })
  header?: TemplateRef<any>;

  @ContentChild("footer", { static: false })
  footer?: TemplateRef<any>;

  @ContentChild("headerIcon", { static: false })
  headerIcon?: TemplateRef<any>;
}
