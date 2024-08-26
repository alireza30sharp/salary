import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";

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
  rowPinned: boolean = false;
  agInit(params: ICellRendererParams): void {
    // اگر ردیف پین شده باشد (مثل ردیف جمع کل)، از اجرای رندر جلوگیری کنید
    if (params.node.rowPinned) {
      this.rowPinned = true;
      return;
    }

    // ادامه‌ی منطق رندر معمولی برای ردیف‌های دیگر
    if (params.value) {
      this.errorInvalid = false;
      params.colDef.cellEditorParams.values.subscribe((f) => {
        let find = f.find((f) => f.value == params.value);
        if (find) {
          this.name = find.label;
        }
      });
    } else if (
      !params.value &&
      params.colDef.context &&
      params.colDef.context.requerd
    ) {
      this.errorInvalid = true;
    }
  }
  refresh(params: ICellRendererParams): boolean {
    // return false to let ag-grid refresh the component via destroying and creating it
    this.params = params.value;
    return true;
  }
}
