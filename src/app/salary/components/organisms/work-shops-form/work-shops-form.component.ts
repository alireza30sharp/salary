import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Form } from "@angular/forms";
import { WorkShopsDto } from "../../../models/work-shops.model";

@Component({
  selector: "app-work-shops-form",
  templateUrl: "./work-shops-form.component.html",
  styleUrls: ["./work-shops-form.component.scss"],
})
export class WorkShopsFormComponent implements OnInit {
  @Input() submitButtonId?: string = "submit-button";
  @Input() workShops: WorkShopsDto = new WorkShopsDto();
  @Output() submitCallback = new EventEmitter<WorkShopsDto>();
  lockupsIsLoading: boolean = false;
  setFocusItem: boolean = false;
  constructor() {}
  ngOnInit(): void {}
  submitHandler(companyForm: any) {
    this.submitCallback.emit(this.workShops);
    this.setFocusItem = Object.assign({}, true);
    this.workShops = new WorkShopsDto();
  }
}
