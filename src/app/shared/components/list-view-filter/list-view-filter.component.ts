import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { DateUtilies } from "../../utilities/Date";
import { ListViewFilterInterFace } from "../../interfaces/list-view-filter-config.interface";

@Component({
  selector: "list-view-filter",
  templateUrl: "./list-view-filter.component.html",
  styleUrls: ["./list-view-filter.component.scss"],
})
export class ListViewFilterComponent {
  @Input() configViewFilter: ListViewFilterInterFace = {
    showAutoComplate: false,
    showDatePicker: false,
    showText: false,
  };

  @Output() onAddNewClickCallback: EventEmitter<null> = new EventEmitter();
  @Output() onSearchCallback = new EventEmitter<any>();

  currentDate: NgbDateStruct;
  showInactive: boolean;
  constructor() {}

  onSyncAllCLicked() {}

  onAddNewClicked() {
    this.onAddNewClickCallback.emit();
  }
}
