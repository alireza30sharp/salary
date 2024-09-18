import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { delay, finalize } from "rxjs";

import { Location } from "@angular/common";
import { ToastService } from "../../../../../shared/services";
import { GeneralFormComponent } from "../../../../../shared/components/general-form/general-form.component";
import { FormFieldConfigType } from "../../../../../shared/types/form-field-config.type";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { propertyOf } from "../../../../../shared/utilities/property-of";
import { FormGroupType } from "../../../../../shared/utilities/utility-types";
import { TaxType, TypeOptions } from "../../../../../base/models/rul";
import { ListItem } from "../../../../../shared/interfaces/list-item.interface";
import { TaxService } from "../../services/tax.service";
import { TaxDto } from "../../models";

@Component({
  selector: "app-tax-add",
  templateUrl: "./tax-add.component.html",
  styleUrls: ["tax-add.component.scss"],
  providers: [TaxService],
})
export class TaxAddComponent implements OnInit {
  formGroup!: FormGroup<FormGroupType<Partial<TaxDto>>>;
  form: NgForm;
  feilds: FormFieldConfigType[] = [];
  model: Partial<TaxDto>;

  showLoading: boolean;
  constructor(
    private _TaxService: TaxService,
    private readonly _location: Location,
    private readonly _formBuilder: FormBuilder,
    private _toastService: ToastService
  ) {
    this.formGroup = this._formBuilder.group({});
    // this.formGroup.valueChanges.subscribe((values) => {
    //   this._formChangeHandler(values);
    // });
  }
  ngOnInit(): void {
    this._initForm();
  }
  ngAfterViewInit(): void {}

  saveHandler() {
    this.showLoading = true;
    this._TaxService
      .create(this.formGroup.value)
      .pipe(
        finalize(() => {
          this.showLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          this._toastService.success(res.data.message);
          this.formGroup.reset();
          this.formGroup.markAsUntouched();
        },
        error: (err) => {
          let msg = "";
          if (err.error.messages) {
            this._toastService.error(err.error.messages);
            msg = err.error.messages.join(" ");
          } else if (err.error.message) {
            this._toastService.error(err.error.message);
            msg = err.error.message.join(" ");
          }
        },
      });
  }
  cancelClickHandler() {
    this._location.back();
  }

  private _initForm() {
    this.feilds = [
      {
        type: "textbox",
        title: "از مبلغ",
        binding: propertyOf<TaxDto>("fromMoney"),
        config: {
          type: "number",
          onlyNumber: true,
          maskType: "separator",
        },
        validators: [
          {
            type: Validators.required,
          },
        ],
      },
      {
        type: "textbox",
        title: "تا مبلغ",
        binding: propertyOf<TaxDto>("toMoney"),
        config: {
          type: "number",
          onlyNumber: true,
          maskType: "separator",
        },
      },
      {
        type: "textbox",
        title: "درصد",
        binding: propertyOf<TaxDto>("toMoney"),
        config: {
          type: "number",
          onlyNumber: true,
          maskType: "percent",
        },
      },
      {
        type: "select",
        title: "نوع",
        binding: propertyOf<TaxDto>("taxType"),
        config: {
          options: TaxType,
          bindValue: propertyOf<ListItem>("value"),
          bindLabel: propertyOf<ListItem>("label"),
          allowClear: true,
        },
        validators: [
          {
            type: Validators.required,
          },
        ],
      },
      {
        type: "textarea",
        title: "توضیحات",
        binding: propertyOf<TaxDto>("comment"),
        columnWidthNumber: 12,
      },
    ];
  }
  private _formChangeHandler(values: Partial<TaxDto>) {
    setTimeout(() => {
      let valid = this.formGroup.invalid;
      console.table(valid);
    }, 0);
  }
}
