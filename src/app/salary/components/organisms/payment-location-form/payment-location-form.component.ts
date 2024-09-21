import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { PaymentLocationDto } from "../../../models/payment-location.model";

@Component({
  selector: "app-payment-location-form",
  templateUrl: "./payment-location-form.component.html",
  styleUrls: ["./payment-location-form.component.scss"],
})
export class PaymentLocationFormComponent implements OnInit {
  setFocusItem: boolean = false;

  @Input() submitButtonId?: string = "submit-button-fields-evidences";
  @Input() evidencesModel: PaymentLocationDto = new PaymentLocationDto();
  @Output() submitCallback = new EventEmitter<PaymentLocationDto>();
  lockupsIsLoading: boolean = false;
  fromMoney: number = 0;
  constructor() {}
  ngOnInit(): void {}
  submitHandler(companyForm: any) {
    this.submitCallback.emit(this.evidencesModel);
    this.evidencesModel = new PaymentLocationDto();
    this.setFocusItem = Object.assign({}, true);
  }
}
