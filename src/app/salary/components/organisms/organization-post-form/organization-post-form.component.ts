import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { OrganizationPostDto } from "../../../models/organization-post.model";

@Component({
  selector: "app-organization-post-form",
  templateUrl: "./organization-post-form.component.html",
  styleUrls: ["./organization-post-form.component.scss"],
})
export class OrganizationPostFormComponent implements OnInit {
  setFocusItem: boolean = false;

  @Input() submitButtonId?: string = "submit-button-fields-evidences";
  @Input() evidencesModel: OrganizationPostDto = new OrganizationPostDto();

  @Output() submitCallback = new EventEmitter<OrganizationPostDto>();
  lockupsIsLoading: boolean = false;
  fromMoney: number = 0;
  constructor() {}
  ngOnInit(): void {}
  submitHandler(companyForm: any) {
    this.submitCallback.emit(this.evidencesModel);
    this.evidencesModel = new OrganizationPostDto();
    this.setFocusItem = Object.assign({}, true);
  }
}
