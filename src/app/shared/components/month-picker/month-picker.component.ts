import { Component, Output, EventEmitter } from "@angular/core";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-month-picker",
  templateUrl: "./month-picker.component.html",
  styleUrls: ["./month-picker.component.scss"],
})
export class MonthPickerComponent {
  displayValue: string;
  @Output() monthSelect = new EventEmitter<{ month: number; year: number }>();

  onMonthSelect(date: NgbDateStruct) {
    this.displayValue = `${date.month}/${date.year}`;
    this.monthSelect.emit({ month: date.month, year: date.year });
  }
}
