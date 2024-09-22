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
import { WorkShopsService } from "../../services/work-shops.service";
import { WorkShopsDto } from "../../models";

@Component({
  selector: "app-work-shops-edit",
  templateUrl: "./work-shops-edit.component.html",
  styleUrls: ["./work-shops-edit.component.scss"],
  providers: [WorkShopsService],
})
export class WorkShopsEditComponent implements OnInit {
  formGroup!: FormGroup<FormGroupType<Partial<WorkShopsDto>>>;
  form: NgForm;
  feilds: FormFieldConfigType[] = [];
  model: Partial<WorkShopsDto>;
  id: number;
  isLoading: boolean;
  showLoading: boolean;
  constructor(
    private _WorkShopsService: WorkShopsService,
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
    this._WorkShopsService
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
      this._WorkShopsService
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
        title: "نام کارگاه",
        columnWidthNumber: 3,
        binding: propertyOf<WorkShopsDto>("workShopName"),
        validators: [
          {
            type: Validators.required,
          },
        ],
      },
      {
        idAttr: "txtFistName",
        type: "textbox",
        title: "ردیف پیمان",
        columnWidthNumber: 3,
        binding: propertyOf<WorkShopsDto>("radifPeyman"),
        validators: [
          {
            type: Validators.required,
          },
        ],
      },
      {
        type: "textbox",
        title: "کد کارگاه",
        columnWidthNumber: 3,
        binding: propertyOf<WorkShopsDto>("workShopCode"),
        validators: [
          {
            type: Validators.required,
          },
        ],
      },
      {
        type: "textbox",
        title: "نام شرکت",
        columnWidthNumber: 3,
        binding: propertyOf<WorkShopsDto>("companyName"),
        validators: [
          {
            type: Validators.required,
          },
        ],
      },
      {
        type: "textbox",
        title: "نام کارفرما",
        columnWidthNumber: 3,
        binding: propertyOf<WorkShopsDto>("employerName"),
        validators: [
          {
            type: Validators.required,
          },
        ],
      },
      {
        type: "textbox",
        title: "نام شعبه تامین اجتماعی",
        columnWidthNumber: 6,
        binding: propertyOf<WorkShopsDto>("socialSecurityBranchName"),
        validators: [
          {
            type: Validators.required,
          },
        ],
      },
      // {
      //   type: "textbox",
      //   title: "ترتیب",
      //   binding: propertyOf<WorkShopsDto>("orderIndex"),
      //   columnWidthNumber: 3,
      //   validators: [
      //     {
      //       type: Validators.required,
      //     },
      //   ],
      //   config: {
      //     type: "number",
      //     onlyNumber: true,
      //   },
      //   changeEvent: (changedValue, formGroup) => {},
      // },
      {
        type: "checkbox",
        title: "وضعیت",
        binding: propertyOf<WorkShopsDto>("isActive"),
        columnWidthNumber: 3,
      },
      {
        type: "checkbox",
        title: "کارگاه پیش فرض'",
        binding: propertyOf<WorkShopsDto>("isDefault"),
        columnWidthNumber: 3,
      },
      {
        idAttr: "txtFistName",
        type: "textarea",
        title: "آدرس کارگاه",
        binding: propertyOf<WorkShopsDto>("workShopAddress"),
        columnWidthNumber: 6,
      },
    ];
  }
}
