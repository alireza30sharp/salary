import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ICellEditorAngularComp } from "ag-grid-angular";

@Component({
  selector: "app-cell-editor-time",
  templateUrl: "./cell-editor-time.component.html",
  styleUrls: ["./cell-editor-time.component.css"],
})
export class CellEditorTimeComponent implements ICellEditorAngularComp {
  params: string = "0";
  setFocusItem: boolean;
  constructor() {}

  agInit(params: any): void {
    this.params = params.value ? params.value : "0";
    setTimeout(() => {
      this.setFocusItem = true;
    }, 10);
  }
  getValue() {
    return this.params;
  }
  btnClickedHandler() {
    // this.params.data[this.params.colDef.field] = this.params.value;
  }
  onChangeEmitter() {
    //this.params.stopEditing();
  }
}
