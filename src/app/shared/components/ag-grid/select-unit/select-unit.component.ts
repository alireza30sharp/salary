import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ICellEditorAngularComp } from "ag-grid-angular";

@Component({
  selector: "app-select-unit",
  templateUrl: "./select-unit.component.html",
  styleUrls: ["./select-unit.component.scss"],
})
export class SelectUnitComponent implements ICellEditorAngularComp {
  private params: any;
  colDef;
  selectedOption: any = "";
  options = [];
  SelectedUnitType: string;
  errorInvalid: boolean = true;
  setFocusItem: boolean;
  constructor() {}

  agInit(params: any): void {
    this.setFocusItem = true;
    this.params = params;

    params.colDef.cellEditorParams.values.subscribe((f) => {
      this.options = Object.assign([], f);
    });
    this.selectedOption = this.params.value;
    if (params.colDef.context && params.colDef.context.requerd) {
      this.errorInvalid = params.value ? false : true;
    }
  }
  getValue() {
    return this.selectedOption;
  }
  btnClickedHandler() {
    this.errorInvalid = this.selectedOption ? false : true;
    this.params.data[this.params.colDef.field] = this.selectedOption;
    this.params.stopEditing();
  }
}
