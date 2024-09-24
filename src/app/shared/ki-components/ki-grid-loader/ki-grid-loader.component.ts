import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "ki-grid-loader",
  templateUrl: "./ki-grid-loader.component.html",
  styleUrls: ["./ki-grid-loader.component.scss"],
})
export class KiGridLoaderComponent {
  @Input() color:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark" = "light";
  @Input() matchParent: boolean = true;
  constructor() {}
}
