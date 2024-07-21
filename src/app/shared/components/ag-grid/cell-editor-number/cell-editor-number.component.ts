import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ICellEditorAngularComp } from "ag-grid-angular";

@Component({
  selector: "app-cell-editor-number",
  templateUrl: "./cell-editor-number.component.html",
  styleUrls: ["./cell-editor-number.component.css"],
})
export class CellEditorNumberComponent implements ICellEditorAngularComp {
  params: number = 0;
  constructor() {}

  agInit(params: any): void {
    this.params = params.value ? params.value : 0;
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
