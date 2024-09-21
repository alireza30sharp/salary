import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { delay, finalize } from "rxjs";
import { Location } from "@angular/common";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormFieldConfigType } from "../../../../../../shared/types/form-field-config.type";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { GeneralFormComponent } from "../../../../../../shared/components/general-form/general-form.component";
import { propertyOf } from "../../../../../../shared/utilities/property-of";
import { FormGroupType } from "../../../../../../shared/utilities/utility-types";
import { ActivatedRoute } from "@angular/router";
import { ToastService } from "../../../../../../shared/services";
import { BenefitDeductionService } from "../../services/benefit-deduction.service";
import { BenefitDeductionDto } from "../../models";
import { TypeOptions } from "../../../../../../salary/models/rul";
import { ListItem } from "../../../../../../shared/interfaces/list-item.interface";

@Component({
  selector: "app-benefit-deduction-edit",
  templateUrl: "./benefit-deduction-edit.component.html",
  styleUrls: ["./benefit-deduction-edit.component.scss"],
  providers: [BenefitDeductionService],
})
export class BenefitDeductionEditComponent implements OnInit {
  formGroup!: FormGroup<FormGroupType<Partial<BenefitDeductionDto>>>;
  form: NgForm;
  feilds: FormFieldConfigType[] = [];
  model: Partial<BenefitDeductionDto>;
  id: number;
  isLoading: boolean;
  showLoading: boolean;
  constructor(
    private _BenefitDeductionService: BenefitDeductionService,
    private readonly _destroyRef: DestroyRef,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _formBuilder: FormBuilder,
    private _toastService: ToastService,
    private readonly _location: Location
  ) {
    this.formGroup = this._formBuilder.group({});
  }
  ngOnInit(): void {
    this._initForm();
    this.id = this._activatedRoute.snapshot.params["id"];

    this._getData();
  }

  saveHandler() {
    this.showLoading = true;
    this.formGroup.value.workShopId = this.id;
    this._BenefitDeductionService
      .update(this.formGroup.value)
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
          this._location.back();
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

  private _getData() {
    this.isLoading = true;
    setTimeout(() => {
      this._BenefitDeductionService
        .getById(this.id)
        .pipe(
          takeUntilDestroyed(this._destroyRef),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe((res) => {
          if (res.isOk) {
            this.model = res.data;
          }
        });
    }, 3000);
  }

  private _initForm() {
    this.feilds = [
      {
        idAttr: "txtFistName",
        type: "textbox",
        title: "کد",
        columnWidthNumber: 12,
        binding: propertyOf<BenefitDeductionDto>("code"),
        config: {
          readonly: true,
        },
      },
      {
        type: "select",
        title: "",
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
        columnWidthNumber: 6,
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
        columnWidthNumber: 6,
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
        columnWidthNumber: 6,
        config: {
          type: "number",
          onlyNumber: true,
        },
      },
      {
        type: "textbox",
        title: "ترتیب",
        binding: propertyOf<BenefitDeductionDto>("orderIndex"),
        columnWidthNumber: 6,
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
}
