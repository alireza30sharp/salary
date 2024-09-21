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
import { EmploymentTypesDto } from "../../models";
import { EmploymentTypesService } from "../../services/employment-types.service";

@Component({
  selector: "app-employment-types-add",
  templateUrl: "./employment-types-add.component.html",
  styleUrls: ["./employment-types-add.component.scss"],
  providers: [EmploymentTypesService],
})
export class EmploymentTypesAddComponent implements OnInit {
  formGroup!: FormGroup<FormGroupType<Partial<EmploymentTypesDto>>>;
  form: NgForm;
  feilds: FormFieldConfigType[] = [];
  model: Partial<EmploymentTypesDto>;

  showLoading: boolean;
  constructor(
    private _EmploymentTypesService: EmploymentTypesService,
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
    this._EmploymentTypesService
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
  private _formChangeHandler(values: Partial<EmploymentTypesDto>) {
    setTimeout(() => {
      let valid = this.formGroup.invalid;
      console.table(valid);
    }, 0);
  }
}
