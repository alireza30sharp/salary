import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Form } from "@angular/forms";
import { TaxDto } from "../../../models/tax.model";
import { EducationEvidencesDto } from "../../../models/education-evidences.model";

@Component({
  selector: "app-educatio-evidences-form",
  templateUrl: "./educatio-evidences-form.component.html",
  styleUrls: ["./educatio-evidences-form.component.scss"],
})
export class EducationEvidencesFormComponent implements OnInit {
  setFocusItem: boolean = false;

  @Input() submitButtonId?: string = "submit-button-educatio-evidences";
  @Input() evidencesModel: EducationEvidencesDto = new EducationEvidencesDto();

  @Output() submitCallback = new EventEmitter<EducationEvidencesDto>();
  lockupsIsLoading: boolean = false;
  fromMoney: number = 0;
  constructor() {}
  ngOnInit(): void {}
  submitHandler(companyForm: any) {
    this.submitCallback.emit(this.evidencesModel);
    this.evidencesModel = new EducationEvidencesDto();
    this.setFocusItem = Object.assign({}, true);
  }
}
