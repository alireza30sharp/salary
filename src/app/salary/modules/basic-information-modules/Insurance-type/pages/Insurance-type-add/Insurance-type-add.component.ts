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
import { InsuranceTypeService } from "../../services/Insurance-type.service";
import { ToastService } from "../../../../../../shared/services";
import { GeneralFormComponent } from "../../../../../../shared/components/general-form/general-form.component";
import { FormFieldConfigType } from "../../../../../../shared/types/form-field-config.type";
import { InsuranceTypDto } from "../../models/Insurance-type.model";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { propertyOf } from "../../../../../../shared/utilities/property-of";
import { FormGroupType } from "../../../../../../shared/utilities/utility-types";

@Component({
  selector: "app-insurance-type-add",
  templateUrl: "./insurance-type-add.component.html",
  styleUrls: ["insurance-type-add.component.scss"],
  providers: [InsuranceTypeService],
})
export class InsuranceTypeAddComponent implements OnInit {
  formGroup!: FormGroup<FormGroupType<Partial<InsuranceTypDto>>>;
  form: NgForm;
  feilds: FormFieldConfigType[] = [];
  model: Partial<InsuranceTypDto>;

  showLoading: boolean;
  constructor(
    private _InsuranceTypeService: InsuranceTypeService,
    private readonly _location: Location,
    private readonly _formBuilder: FormBuilder,
    private _toastService: ToastService
  ) {
    this.formGroup = this._formBuilder.group({});
    this.formGroup.valueChanges.subscribe((values) => {
      this._formChangeHandler(values);
    });
  }
  ngOnInit(): void {
    this._initForm();
  }
  ngAfterViewInit(): void {}

  saveHandler() {
    this.showLoading = true;
    this._InsuranceTypeService
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
        idAttr: "txtFistName",
        type: "textbox",
        title: "نوع بیمه ",
        columnWidthNumber: 3,
        binding: propertyOf<InsuranceTypDto>("insuranceType"),
        validators: [
          {
            type: Validators.required,
          },
        ],
      },
      {
        type: "textbox",
        title: "ترتیب",
        binding: propertyOf<InsuranceTypDto>("orderIndex"),
        columnWidthNumber: 3,
        validators: [
          {
            type: Validators.required,
          },
        ],
        config: {
          type: "number",
          onlyNumber: true,
        },
        changeEvent: (changedValue, formGroup) => {},
      },
      {
        type: "checkbox",
        title: "پیش فرض",
        binding: propertyOf<InsuranceTypDto>("isDefault"),
        columnWidthNumber: 3,
      },
    ];
  }
  private _formChangeHandler(values: Partial<InsuranceTypDto>) {
    setTimeout(() => {
      let valid = this.formGroup.invalid;
      console.table(valid);
    }, 0);
  }
}
