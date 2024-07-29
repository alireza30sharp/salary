import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";
import { MessageUtilies } from "../../../../shared/utilities/message";

@Component({
  selector: "app-ag-grid-select-cell-render",
  templateUrl: "./select-cell-render.html",
  styleUrls: ["./select-cell-render.scss"],
})
export class SelectCellRendererParams implements ICellRendererAngularComp {
  name: string = "";
  params: any;
  messageErrorRequerd: string = "";
  errorInvalid: boolean = true;
  agInit(params: ICellRendererParams): void {
    if (params.value) {
      this.errorInvalid = false;
      params.colDef.cellEditorParams.values.subscribe((f) => {
        let find = f.find((f) => f.value == params.value);
        if (find) {
          this.name = find.label;
        }
      });
    } else if (!params.value && (params.colDef as any).requerd) {
      this.errorInvalid = true;
      this.messageErrorRequerd = (params.colDef as any).messageRequerd
        ? (params.colDef as any).messageRequerd
        : MessageUtilies.messageErrorRequerd();
    }
  }
  refresh(params: ICellRendererParams): boolean {
    // return false to let ag-grid refresh the component via destroying and creating it
    this.params = params.value;
    return true;
  }
}
