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
import { EmploymentTypesDto } from "../../models";
import { EmploymentTypesService } from "../../services/employment-types.service";

@Component({
  selector: "app-employment-types-edit",
  templateUrl: "./employment-types-edit.component.html",
  styleUrls: ["./employment-types-edit.component.scss"],
  providers: [EmploymentTypesService],
})
export class EmploymentTypesEditComponent implements OnInit {
  formGroup!: FormGroup<FormGroupType<Partial<EmploymentTypesDto>>>;
  form: NgForm;
  feilds: FormFieldConfigType[] = [];
  model: Partial<EmploymentTypesDto>;
  id: number;
  isLoading: boolean;
  showLoading: boolean;
  constructor(
    private _EmploymentTypesService: EmploymentTypesService,
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
    this._EmploymentTypesService
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
      this._EmploymentTypesService
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
        title: "نوع استخدامی*",
        columnWidthNumber: 6,
        binding: propertyOf<EmploymentTypesDto>("typeText"),
        validators: [
          {
            type: Validators.required,
          },
        ],
      },
      {
        type: "textbox",
        title: "ترتیب",
        binding: propertyOf<EmploymentTypesDto>("orderIndex"),
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
        type: "checkbox",
        title: " پیش فرض'",
        binding: propertyOf<EmploymentTypesDto>("isDefault"),
        columnWidthNumber: 3,
      },
    ];
  }
}
