import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";

@Component({
  selector: "app-ag-grid-cell-operations-click-event",
  templateUrl: "./cell-operations-click-event.html",
  styleUrls: ["./cell-operations-click-event.scss"],
})
export class CellOperationsClickEvent implements ICellRendererAngularComp {
  refresh(params: ICellRendererParams): boolean {
    // return false to let ag-grid refresh the component via destroying and creating it
    this.params = params;
    return true;
  }
  private params: any;
  canRemoveIcon: boolean = false;
  canEditIcon: boolean = false;
  agInit(params: any): void {
    params.data.isRemove = true;
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
        node: this.params.data,
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
