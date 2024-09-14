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
import { InsuranceTypeService } from "../../services/Insurance-type.service";
import { FormFieldConfigType } from "../../../../../shared/types/form-field-config.type";
import { InsuranceTypDto } from "../../models/Insurance-type.model";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { GeneralFormComponent } from "../../../../../shared/components/general-form/general-form.component";
import { propertyOf } from "../../../../../shared/utilities/property-of";
import { FormGroupType } from "../../../../../shared/utilities/utility-types";
import { ActivatedRoute } from "@angular/router";
import { ToastService } from "../../../../../shared/services";

@Component({
  selector: "app-insurance-type-edit",
  templateUrl: "./insurance-type-edit.component.html",
  styleUrls: ["./insurance-type-edit.component.scss"],
  providers: [InsuranceTypeService],
})
export class InsuranceTypeEditComponent implements OnInit {
  formGroup!: FormGroup<FormGroupType<Partial<InsuranceTypDto>>>;
  form: NgForm;

  feilds: FormFieldConfigType[] = [];
  model: Partial<InsuranceTypDto>;
  insuranceTypeId: number;
  isLoading: boolean;
  showLoading: boolean;
  constructor(
    private _insuranceTypeService: InsuranceTypeService,
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
    this.insuranceTypeId = this._activatedRoute.snapshot.params["id"];
    this._getData();
  }

  saveHandler() {
    this.showLoading = true;
    this._insuranceTypeService
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
      this._insuranceTypeService
        .getById(this.insuranceTypeId)
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
}
