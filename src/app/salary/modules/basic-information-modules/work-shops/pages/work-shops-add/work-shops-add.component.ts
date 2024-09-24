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
import { ToastService } from "../../../../../../shared/services";
import { GeneralFormComponent } from "../../../../../../shared/components/general-form/general-form.component";
import { FormFieldConfigType } from "../../../../../../shared/types/form-field-config.type";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { propertyOf } from "../../../../../../shared/utilities/property-of";
import { FormGroupType } from "../../../../../../shared/utilities/utility-types";
import { WorkShopsDto } from "../../models";
import { WorkShopsService } from "../../services/work-shops.service";

@Component({
  selector: "app-work-shops-add",
  templateUrl: "./work-shops-add.component.html",
  styleUrls: ["work-shops-add.component.scss"],
  providers: [WorkShopsService],
})
export class WorkShopsAddComponent implements OnInit {
  formGroup!: FormGroup<FormGroupType<Partial<WorkShopsDto>>>;
  form: NgForm;
  feilds: FormFieldConfigType[] = [];
  model: Partial<WorkShopsDto>;

  showLoading: boolean;
  constructor(
    private _WorkShopsService: WorkShopsService,
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
    this._WorkShopsService
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
  private _formChangeHandler(values: Partial<WorkShopsDto>) {
    setTimeout(() => {
      let valid = this.formGroup.invalid;
      console.table(valid);
    }, 0);
  }
}
