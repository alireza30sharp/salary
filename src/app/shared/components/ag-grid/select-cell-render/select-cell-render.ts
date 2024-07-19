import { Component } from "@angular/core";
import { ICellRendererParams } from "ag-grid-community";

@Component({
  selector: "app-ag-grid-select-cell-render",
  templateUrl: "./select-cell-render.html",
  styleUrls: ["./select-cell-render.scss"],
})
export class SelectCellRendererParams {
  name: string = "";
  params: any;
  agInit(params: ICellRendererParams): void {
    if (params.value) {
      params.colDef.cellEditorParams.values.then((f) => {
        let find = f.find((f) => f.value == params.value);
        if (find) {
          this.name = find.label;
        }
      });
    }
  }
}
