import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Form } from "@angular/forms";
import { SelectOptionInterface } from "../../../../../../app/shared/interfaces/select-option.interface";
import { EmploymentOrdersDto } from "../../../models";
import { ChangeWorkShopsService } from "../../../../../services/change-work-shop.service";
import { delay } from "rxjs";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { DateUtilies } from "../../../../../shared/utilities/Date";

@Component({
  selector: "app-employment-order-form",
  templateUrl: "./employment-order-form.component.html",
  styleUrls: ["./employment-order-form.component.scss"],
})
export class employmentOrderFormComponent implements OnInit {
  setFocusItem: boolean = false;
  @Input() submitButtonId?: string = "submit-button-tax";
  @Input() employmentOrdersModel: EmploymentOrdersDto =
    new EmploymentOrdersDto();
  @Output() submitCallback = new EventEmitter<EmploymentOrdersDto>();
  lockupsIsLoading: boolean = false;
  employeList?: SelectOptionInterface<any>[];
  employmentTypeData?: SelectOptionInterface<any>[];
  organizationUnitsData?: SelectOptionInterface<any>[];
  organizationPostData?: SelectOptionInterface<any>[];
  paymentLocationIdData?: SelectOptionInterface<any>[];
  persianBirthDate: NgbDateStruct;

  constructor(private _changeWorkShops: ChangeWorkShopsService) {}
  ngOnInit(): void {
    this.persianBirthDate = DateUtilies.convertDateToNgbDateStruct(
      new Date().toLocaleDateString()
    );
  }
  ngAfterViewInit(): void {
    this._changeWorkShops.employeListData$
      .pipe(delay(100))
      .subscribe((employeList) => {
        if (employeList) {
          this.employeList = employeList;
        }
      });
    this._changeWorkShops.employmentTypeData$
      .pipe(delay(100))
      .subscribe((employmentTypeData) => {
        if (employmentTypeData) {
          this.employmentTypeData = employmentTypeData;
        }
      });
    this._changeWorkShops.organizationUnitsData$
      .pipe(delay(100))
      .subscribe((organizationUnitsData) => {
        if (organizationUnitsData) {
          this.organizationUnitsData = organizationUnitsData;
        }
      });
    this._changeWorkShops.organizationPostData$
      .pipe(delay(100))
      .subscribe((organizationPostData) => {
        if (organizationPostData) {
          this.organizationPostData = organizationPostData;
        }
      });
    this._changeWorkShops.paymentLocationIdData$
      .pipe(delay(100))
      .subscribe((paymentLocationIdData) => {
        if (paymentLocationIdData) {
          this.paymentLocationIdData = paymentLocationIdData;
        }
      });
  }
  submitHandler(companyForm: any) {
    this.employmentOrdersModel.persianDateStr = DateUtilies.convertDate(
      this.persianBirthDate
    );
    this.submitCallback.emit(this.employmentOrdersModel);
    this.employmentOrdersModel = new EmploymentOrdersDto();
    this.setFocusItem = Object.assign({}, true);
  }
}
