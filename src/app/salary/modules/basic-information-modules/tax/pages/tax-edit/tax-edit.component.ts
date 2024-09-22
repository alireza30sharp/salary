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
import { TaxType, TypeOptions } from "../../../../../../salary/models/rul";
import { ListItem } from "../../../../../../shared/interfaces/list-item.interface";
import { TaxService } from "../../services/tax.service";
import { TaxDto } from "../../models";

@Component({
  selector: "app-tax-edit",
  templateUrl: "./tax-edit.component.html",
  styleUrls: ["./tax-edit.component.scss"],
  providers: [TaxService],
})
export class TaxEditComponent implements OnInit {
  formGroup!: FormGroup<FormGroupType<Partial<TaxDto>>>;
  form: NgForm;
  feilds: FormFieldConfigType[] = [];
  model: Partial<TaxDto>;
  id: number;
  isLoading: boolean;
  showLoading: boolean;
  constructor(
    private _TaxService: TaxService,
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
    this.formGroup.value.id = this.id;
    this._TaxService
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
      this._TaxService
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
        binding: propertyOf<TaxDto>("taxRate"),
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
}
