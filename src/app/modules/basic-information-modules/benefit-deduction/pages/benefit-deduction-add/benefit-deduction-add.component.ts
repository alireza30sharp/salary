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
import { BenefitDeductionService } from "../../services/benefit-deduction.service";
import { BenefitDeductionDto } from "../../models";
import { TypeOptions } from "../../../../../salary/models/rul";
import { ListItem } from "../../../../../shared/interfaces/list-item.interface";

@Component({
  selector: "app-benefit-deduction-add",
  templateUrl: "./benefit-deduction-add.component.html",
  styleUrls: ["benefit-deduction-add.component.scss"],
  providers: [BenefitDeductionService],
})
export class BenefitDeductionAddComponent implements OnInit {
  formGroup!: FormGroup<FormGroupType<Partial<BenefitDeductionDto>>>;
  form: NgForm;
  feilds: FormFieldConfigType[] = [];
  model: Partial<BenefitDeductionDto>;

  showLoading: boolean;
  constructor(
    private _BenefitDeductionService: BenefitDeductionService,
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
    this._BenefitDeductionService
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
        type: "select",
        title: "نوع",
        binding: propertyOf<BenefitDeductionDto>("type"),
        config: {
          options: TypeOptions,
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
        idAttr: "txtFistName",
        type: "textbox",
        title: "نام",
        binding: propertyOf<BenefitDeductionDto>("name"),
        validators: [
          {
            type: Validators.required,
          },
        ],
      },
      {
        type: "textbox",
        title: "معین",
        binding: propertyOf<BenefitDeductionDto>("idMoin"),
        config: {
          type: "number",
          onlyNumber: true,
        },
      },
      {
        type: "textbox",
        title: "تفصیلی",
        binding: propertyOf<BenefitDeductionDto>("idTafsili"),
        columnWidthNumber: 6,
        config: {
          type: "number",
          onlyNumber: true,
        },
      },
      {
        type: "textbox",
        title: "2 تفصیلی",
        binding: propertyOf<BenefitDeductionDto>("idTafsili2"),
        config: {
          type: "number",
          onlyNumber: true,
        },
      },
      {
        type: "textbox",
        title: "ترتیب",
        binding: propertyOf<BenefitDeductionDto>("orderIndex"),
        validators: [
          {
            type: Validators.required,
          },
        ],
        config: {
          type: "number",
          onlyNumber: true,
        },
      },
      {
        type: "textarea",
        title: "توضیحات",
        binding: propertyOf<BenefitDeductionDto>("comment"),
        columnWidthNumber: 12,
      },
    ];
  }
  private _formChangeHandler(values: Partial<BenefitDeductionDto>) {
    setTimeout(() => {
      let valid = this.formGroup.invalid;
      console.table(valid);
    }, 0);
  }
}
