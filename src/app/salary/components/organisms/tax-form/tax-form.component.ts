import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Form } from "@angular/forms";
import { TaxDto } from "../../../models/tax.model";
import {
  TaxRate,
  TaxType,
  maskPrefixCurrencyCharacter,
  maskPrefixTaxRate,
} from "../../../models/rul";
import { SelectOptionInterface } from "./../../../../shared/interfaces/select-option.interface";

@Component({
  selector: "app-tax-form",
  templateUrl: "./tax-form.component.html",
  styleUrls: ["./tax-form.component.scss"],
})
export class TaxFormComponent implements OnInit {
  taxRate = TaxRate;
  maskPrefixTaxRate = maskPrefixTaxRate;
  setFocusItem: boolean = false;
  maskPrefixCurrencyCharacter = maskPrefixCurrencyCharacter;
  @Input() submitButtonId?: string = "submit-button-tax";
  @Input() taxModel: TaxDto = new TaxDto();

  @Output() submitCallback = new EventEmitter<TaxDto>();
  lockupsIsLoading: boolean = false;
  typeOptions?: SelectOptionInterface<any>[];
  fromMoney: number = 0;
  constructor() {}
  ngOnInit(): void {
    this.typeOptions = TaxType;
  }
  submitHandler(companyForm: any) {
    this.submitCallback.emit(this.taxModel);
    this.taxModel = new TaxDto();
    this.setFocusItem = Object.assign({}, true);
  }
  onEnter(e) {
    this.fromMoney = +this.taxModel.fromMoney;
  }
}
