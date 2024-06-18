import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Form } from "@angular/forms";
import { BenefitDeductionEmployeesDto } from "../../../models/benefit-deduction-employees.model";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { SelectOptionInterface } from "../../../../shared/interfaces/select-option.interface";
import { genderList } from "../../../models/rul";
import { DateUtilies } from "../../../../shared/utilities/Date";

@Component({
  selector: "app-benefit-deduction-employees-form",
  templateUrl: "./benefit-deduction-employees-form.component.html",
  styleUrls: ["./benefit-deduction-employees-form.component.scss"],
})
export class BenefitDeductionEmployeesFormComponent implements OnInit {
  @Input() submitButtonId?: string = "submit-button-employes-benefit";
  @Input() model: BenefitDeductionEmployeesDto = new BenefitDeductionEmployeesDto();
  @Output() submitCallback = new EventEmitter<BenefitDeductionEmployeesDto>();
  persianBirthDate: NgbDateStruct;
  genderOptions: SelectOptionInterface<number>[] = [];

  lockupsIsLoading: boolean = false;
  setFocusItem: boolean = false;
  constructor() {}
  ngOnInit(): void {
    this.genderOptions = genderList.map((item) => ({
      label: item.label,
      value: item.value,
    }));
    if (this.model.dateAction) {
      this.persianBirthDate = DateUtilies.convertDateToNgbDateStruct(
        this.model.dateAction
      );
    }
  }
  submitHandler(companyForm: any) {
    this.model.dateAction = DateUtilies.convertDate(
      this.persianBirthDate
    );
    this.submitCallback.emit(this.model);
    this.setFocusItem = Object.assign({}, true);
    this.model = new BenefitDeductionEmployeesDto();
  }
}
