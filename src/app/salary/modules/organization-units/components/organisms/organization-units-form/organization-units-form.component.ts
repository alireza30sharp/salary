import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { OrganizationUnitsDto } from "../../../../../../../app/salary/models/organization-units.model";

@Component({
  selector: "app-organization-units-form",
  templateUrl: "./organization-units-form.component.html",
  styleUrls: ["./organization-units-form.component.scss"],
})
export class OrganizationUnitsFormComponent implements OnInit {
  @Input() submitButtonId?: string = "submit-button-organization-units";
  @Input() showLoading?: boolean;
  @Input() model: OrganizationUnitsDto = new OrganizationUnitsDto();
  @Input() set isResetForm(reset: boolean) {
    if (reset) {
      this.model = new OrganizationUnitsDto();
    }
  }
  @Output() submitEvent = new EventEmitter<OrganizationUnitsDto>();
  lockupsIsLoading: boolean = false;
  fromMoney: number = 0;
  constructor() {}
  ngOnInit(): void {}
  submitHandler(companyForm: any) {
    this.submitEvent.emit(this.model);
  }
}
