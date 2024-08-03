import { Component } from "@angular/core";

@Component({
  selector: "app-ag-grid-cell-operations-click-event",
  templateUrl: "./cell-operations-click-event.html",
  styleUrls: ["./cell-operations-click-event.scss"],
})
export class CellOperationsClickEvent {
  private params: any;
  canRemoveIcon: boolean = false;
  canEditIcon: boolean = false;
  agInit(params: any): void {
    this.params = params;
    if (this.params.onClickRemove) {
      this.canRemoveIcon = true;
    }
    if (this.params.onClickEdit) {
      this.canEditIcon = true;
    }
  }
  onClickRemove($event) {
    if (this.params.onClickRemove instanceof Function) {
      const params = {
        event: $event,
        node: this.params.node.data,
      };
      this.params.onClickRemove(params);
    }
  }
  onClickEdit($event) {
    if (this.params.onClickEdit instanceof Function) {
      const params = {
        event: $event,
        node: this.params.node.data,
      };
      this.params.onClickEdit(params);
    }
  }
}
