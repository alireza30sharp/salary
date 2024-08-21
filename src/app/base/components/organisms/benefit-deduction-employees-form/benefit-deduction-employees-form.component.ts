import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Form } from "@angular/forms";
import { BenefitDeductionEmployeesDto } from "../../../models/benefit-deduction-employees.model";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { SelectOptionInterface } from "../../../../shared/interfaces/select-option.interface";
import { genderList, monthlyList } from "../../../models/rul";
import { DateUtilies } from "../../../../shared/utilities/Date";
import { ChangeWorkShopsService } from "../../../../services/change-work-shop.service";
import { delay } from "rxjs";

@Component({
  selector: "app-benefit-deduction-employees-form",
  templateUrl: "./benefit-deduction-employees-form.component.html",
  styleUrls: ["./benefit-deduction-employees-form.component.scss"],
})
export class BenefitDeductionEmployeesFormComponent implements OnInit {
  @Input() submitButtonId?: string = "submit-button-employes-benefit";
  @Input() model: BenefitDeductionEmployeesDto =
    new BenefitDeductionEmployeesDto();
  @Output() submitCallback = new EventEmitter<BenefitDeductionEmployeesDto>();
  persianBirthDate: NgbDateStruct;
  benefitDeductions?: SelectOptionInterface<any>[];
  employeList?: SelectOptionInterface<any>[];
  lockupsIsLoading: boolean = false;
  setFocusItem: boolean = false;
  constructor(private _changeWorkShops: ChangeWorkShopsService) {
    this._changeWorkShops.benefitAndDeductionsSource$
      .pipe(delay(100))
      .subscribe((benefitDeductionsData) => {
        if (benefitDeductionsData) {
          this.benefitDeductions = benefitDeductionsData;
        }
      });
    this._changeWorkShops.employeListData$
      .pipe(delay(100))
      .subscribe((employeList) => {
        if (employeList) {
          this.employeList = employeList;
        }
      });
  }
  ngOnInit(): void {
    if (this.model.dateAction) {
      this.persianBirthDate = DateUtilies.convertDateToNgbDateStruct(
        this.model.dateAction
      );
    }
    this.persianBirthDate = DateUtilies.convertDateToNgbDateStruct(
      new Date().toLocaleDateString()
    );
  }
  submitHandler(companyForm: any) {
    this.model.dateAction = DateUtilies.convertDate(this.persianBirthDate);
    this.submitCallback.emit(this.model);
    this.setFocusItem = Object.assign({}, true);
    this.model = new BenefitDeductionEmployeesDto();
  }
}
