import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Form } from "@angular/forms";
import { BenefitDeductionDto } from "../../../models/benefit-deduction.model";
import { SelectOptionInterface } from "../../../../shared/interfaces/select-option.interface";
import { TypeOptions } from "../../../models/rul";

@Component({
  selector: "app-benefit-deduction-form",
  templateUrl: "./benefit-deduction-form.component.html",
  styleUrls: ["./benefit-deduction-form.component.scss"],
})
export class BenefitDeductionFormComponent implements OnInit {
  @Input() submitButtonId?: string = "submit-button-benefit-deduction";
  @Input() benefitDeduction: BenefitDeductionDto = new BenefitDeductionDto();
  @Output() submitCallback = new EventEmitter<BenefitDeductionDto>();
  lockupsIsLoading: boolean = false;
  typeOptions?: SelectOptionInterface<any>[];
  constructor() {}
  ngOnInit(): void {
    this.typeOptions = TypeOptions;
  }
  submitHandler(companyForm: any) {
    this.submitCallback.emit(this.benefitDeduction);
    this.benefitDeduction = new BenefitDeductionDto();
  }

}
