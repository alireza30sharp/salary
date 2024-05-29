import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { OrganizationPostDto } from "../../../models/organization-post.model";

@Component({
  selector: "app-organization-post-form",
  templateUrl: "./organization-post-form.component.html",
  styleUrls: ["./organization-post-form.component.scss"],
})
export class OrganizationPostFormComponent implements OnInit {
  @Input() submitButtonId?: string = "submit-button-fields-evidences";
  @Input() evidencesModel: OrganizationPostDto = new OrganizationPostDto();
  @Input() set isResetForm(reset: boolean) {
    if (reset) {
      this.evidencesModel = new OrganizationPostDto();
    }
  }
  @Output() submitCallback = new EventEmitter<OrganizationPostDto>();
  lockupsIsLoading: boolean = false;
  fromMoney: number = 0;
  constructor() {}
  ngOnInit(): void {}
  submitHandler(companyForm: any) {
    this.submitCallback.emit(this.evidencesModel);
  }
}
