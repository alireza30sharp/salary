import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { EmploymentTypesDto } from "../../../models/employment-types.model";

@Component({
  selector: "app-employment-types-form",
  templateUrl: "./employment-types-form.component.html",
  styleUrls: ["./employment-types-form.component.scss"],
})
export class EmploymentTypesFormComponent implements OnInit {
  @Input() submitButtonId?: string = "submit-button-fields-evidences";
  @Input() evidencesModel: EmploymentTypesDto = new EmploymentTypesDto();
  @Input() set isResetForm(reset: boolean) {
    if (reset) {
      this.evidencesModel = new EmploymentTypesDto();
    }
  }
  @Output() submitCallback = new EventEmitter<EmploymentTypesDto>();
  lockupsIsLoading: boolean = false;
  fromMoney: number = 0;
  constructor() {}
  ngOnInit(): void {}
  submitHandler(companyForm: any) {
    this.submitCallback.emit(this.evidencesModel);
  }
}
