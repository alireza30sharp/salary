import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Form } from "@angular/forms";
import { TaxDto } from "../../../models/tax.model";
import { EducationFieldsDto } from "../../../models/education-fields.model";

@Component({
  selector: "app-educatio-fields-form",
  templateUrl: "./educatio-fields-form.component.html",
  styleUrls: ["./educatio-fields-form.component.scss"],
})
export class EducationFieldsFormComponent implements OnInit {
  setFocusItem: boolean = false;

  @Input() submitButtonId?: string = "submit-button-fields-evidences";
  @Input() evidencesModel: EducationFieldsDto = new EducationFieldsDto();
  @Output() submitCallback = new EventEmitter<EducationFieldsDto>();
  lockupsIsLoading: boolean = false;
  fromMoney: number = 0;
  constructor() {}
  ngOnInit(): void {}
  submitHandler(companyForm: any) {
    this.submitCallback.emit(this.evidencesModel);
    this.evidencesModel = new EducationFieldsDto();
    this.setFocusItem = Object.assign({}, true);
  }
}
