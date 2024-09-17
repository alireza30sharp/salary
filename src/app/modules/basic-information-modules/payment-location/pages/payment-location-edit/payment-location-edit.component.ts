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
import { FormFieldConfigType } from "../../../../../shared/types/form-field-config.type";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { GeneralFormComponent } from "../../../../../shared/components/general-form/general-form.component";
import { propertyOf } from "../../../../../shared/utilities/property-of";
import { FormGroupType } from "../../../../../shared/utilities/utility-types";
import { ActivatedRoute } from "@angular/router";
import { ToastService } from "../../../../../shared/services";
import { PaymentLocationService } from "../../services/payment-location.service";
import { PaymentLocationDto } from "../../models";

@Component({
  selector: "app-payment-location-edit",
  templateUrl: "./payment-location-edit.component.html",
  styleUrls: ["./payment-location-edit.component.scss"],
  providers: [PaymentLocationService],
})
export class PaymentLocationEditComponent implements OnInit {
  formGroup!: FormGroup<FormGroupType<Partial<PaymentLocationDto>>>;
  form: NgForm;
  feilds: FormFieldConfigType[] = [];
  model: Partial<PaymentLocationDto>;
  id: number;
  isLoading: boolean;
  showLoading: boolean;
  constructor(
    private _PaymentLocationService: PaymentLocationService,
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
    this._PaymentLocationService
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
      this._PaymentLocationService
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
        title: "محل پرداخت",
        columnWidthNumber: 3,
        binding: propertyOf<PaymentLocationDto>("location"),
        validators: [
          {
            type: Validators.required,
          },
        ],
      },
      {
        type: "textbox",
        title: "ترتیب",
        binding: propertyOf<PaymentLocationDto>("orderIndex"),
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
        binding: propertyOf<PaymentLocationDto>("isDefault"),
        columnWidthNumber: 3,
      },
    ];
  }
}
