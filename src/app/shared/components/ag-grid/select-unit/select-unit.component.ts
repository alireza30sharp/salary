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
  styleUrls: ["./select-unit.component.css"],
})
export class SelectUnitComponent implements ICellEditorAngularComp {
  private params: any;
  colDef;
  selectedOption: any = "";
  options = [];
  SelectedUnitType: string;
  constructor() {}

  agInit(params: any): void {
    this.params = params;
    params.colDef.cellEditorParams.values.then((f) => {
      this.options = Object.assign([], f);
    });
    this.selectedOption = this.params.value;
  }
  getValue() {
    return this.selectedOption;
  }
  btnClickedHandler() {
    this.params.data[this.params.colDef.field] = this.selectedOption;
  }
  onChangeEmitter() {
    this.params.stopEditing();
  }
}
