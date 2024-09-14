import { Component } from "@angular/core";

@Component({
  selector: "app-ag-grid-flag-state",
  templateUrl: "./flag-state.html",
  styleUrls: ["./flag-state.scss"],
})
export class FlagStateCellRenderer {
  private params: any;
  flagState: string = null; // 'active' or 'inactive'

  agInit(params: any): void {
    this.params = params;

    // فرض کنید params.value برای درست یا غلط true/false برگردونه
    if (this.params && this.params.value) {
      this.flagState = "active";
    } else {
      this.flagState = "inactive";
    }
  }
}
