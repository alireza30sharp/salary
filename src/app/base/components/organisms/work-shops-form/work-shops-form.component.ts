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
  @Input() set isResetForm(reset: boolean) {
    if (reset) {
      this.workShops = new WorkShopsDto();
    }
  }
  @Output() submitCallback = new EventEmitter<WorkShopsDto>();
  lockupsIsLoading: boolean = false;
  constructor() {}
  ngOnInit(): void {}
  submitHandler(companyForm: any) {
    this.submitCallback.emit(this.workShops);
  }
}
