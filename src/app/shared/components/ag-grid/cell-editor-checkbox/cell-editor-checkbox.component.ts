import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ICellEditorAngularComp } from "ag-grid-angular";

@Component({
  selector: "app-cell-editor-checkbox",
  templateUrl: "./cell-editor-checkbox.component.html",
  styleUrls: ["./cell-editor-checkbox.component.css"],
})
export class CellEditorCheckboxComponent implements ICellEditorAngularComp {
  params: number = 0;
  setFocusItem: boolean = false;
  constructor() {}

  agInit(params: any): void {
    this.params = params.value ? params.value : false;
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
