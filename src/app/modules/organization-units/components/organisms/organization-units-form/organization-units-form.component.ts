import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { OrganizationUnitsDto } from "../../../../../../app/base/models/organization-units.model";

@Component({
  selector: "app-organization-units-form",
  templateUrl: "./organization-units-form.component.html",
  styleUrls: ["./organization-units-form.component.scss"],
})
export class OrganizationUnitsFormComponent implements OnInit {
  @Input() submitButtonId?: string = "submit-button-organization-units";
  @Input() evidencesModel: OrganizationUnitsDto = new OrganizationUnitsDto();
  @Input() set isResetForm(reset: boolean) {
    if (reset) {
      this.evidencesModel = new OrganizationUnitsDto();
    }
  }
  @Output() submitCallback = new EventEmitter<OrganizationUnitsDto>();
  lockupsIsLoading: boolean = false;
  fromMoney: number = 0;
  constructor() {}
  ngOnInit(): void {}
  submitHandler(companyForm: any) {
    this.submitCallback.emit(this.evidencesModel);
  }
}
