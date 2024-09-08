import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from "@angular/core";
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { DateUtilies } from "../../utilities/Date";
import {
  ListViewFilterDataInterFace,
  ListViewFilterInterFace,
} from "../../interfaces/list-view-filter-config.interface";
import { SelectOptionInterface } from "../../interfaces/select-option.interface";
import { ChangeWorkShopsService } from "../../../services/change-work-shop.service";
import { delay } from "rxjs";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";

@Component({
  selector: "list-view-filter",
  templateUrl: "./list-view-filter.component.html",
  styleUrls: ["./list-view-filter.component.scss"],
  animations: [
    trigger("fadeInOut", [
      state("void", style({ opacity: 0, transform: "translateY(-20px)" })),
      transition(":enter", [
        animate(
          "300ms ease-in",
          style({ opacity: 1, transform: "translateY(0)" })
        ),
      ]),
      transition(":leave", [
        animate(
          "300ms ease-out",
          style({ opacity: 0, transform: "translateY(-20px)" })
        ),
      ]),
    ]),
  ],
})
export class ListViewFilterComponent {
  @Input() configViewFilter: ListViewFilterInterFace = {
    showFromAmount: false,
    showToAmount: false,
    showBenefitDeduction: false,
    showEmployeeId: false,
    showFromDate: false,
    showToDate: false,
    showComment: false,
  };
  @Input() model: ListViewFilterDataInterFace = {
    benefitDeduction: null,
    comment: null,
    employeeId: null,
    fromAmount: null,
    fromDate: null,
    toAmount: null,
    toDate: null,
  };

  @Input() set isVisible(visible) {
    this.toggleVisibility();
  }

  @Output() onSearchCallback = new EventEmitter<any>();

  @ContentChild("filter", { static: false })
  filter?: TemplateRef<any>;

  fromMoney: number = 0;
  currentDate: NgbDateStruct;
  showInactive: boolean;
  employeList?: SelectOptionInterface<any>[];
  benefitDeductions?: SelectOptionInterface<any>[];
  visibleFilter: boolean = false;
  constructor(private _changeWorkShops: ChangeWorkShopsService) {
    this.toggleVisibility();
  }
  ngAfterViewInit(): void {
    this._changeWorkShops.employeListData$
      .pipe(delay(100))
      .subscribe((employeList) => {
        if (employeList) {
          this.employeList = employeList;
        }
      });
    this._changeWorkShops.benefitAndDeductionsSource$
      .pipe(delay(100))
      .subscribe((benefitDeductionsData) => {
        if (benefitDeductionsData) {
          this.benefitDeductions = benefitDeductionsData;
        }
      });
  }
  onSyncAllCLicked() {}
  onEnter(e) {
    this.fromMoney = +this.model.fromAmount;
  }
  clickSearchHander() {
    this.onSearchCallback.emit(this.model);
  }
  toggleVisibility() {
    this.visibleFilter = !this.visibleFilter;
  }
}
