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
import { ExemptionTypesService } from "../../services/exemption-types.service";
import { ExemptionTypesDto } from "../../models";

@Component({
  selector: "app-exemption-types-add",
  templateUrl: "./exemption-types-add.component.html",
  styleUrls: ["exemption-types-add.component.scss"],
  providers: [ExemptionTypesService],
})
export class ExemptionTypesAddComponent implements OnInit {
  formGroup!: FormGroup<FormGroupType<Partial<ExemptionTypesDto>>>;
  form: NgForm;
  feilds: FormFieldConfigType[] = [];
  model: Partial<ExemptionTypesDto>;

  showLoading: boolean;
  constructor(
    private _ExemptionTypesService: ExemptionTypesService,
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
    this._ExemptionTypesService
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
        title: "نوع معافیت",
        columnWidthNumber: 3,
        binding: propertyOf<ExemptionTypesDto>("exemptionType"),
        validators: [
          {
            type: Validators.required,
          },
        ],
      },
      {
        type: "textbox",
        title: "ترتیب",
        binding: propertyOf<ExemptionTypesDto>("orderIndex"),
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
        binding: propertyOf<ExemptionTypesDto>("isDefault"),
        columnWidthNumber: 3,
      },
    ];
  }
  private _formChangeHandler(values: Partial<ExemptionTypesDto>) {
    setTimeout(() => {
      let valid = this.formGroup.invalid;
      console.table(valid);
    }, 0);
  }
}
