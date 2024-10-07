import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { Section, SectionData } from "../../model/Section";
import { OverflowType } from "../../../shared/types/overflow.type";
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { FormFieldConfigType } from "../../../shared/types/form-field-config.type";
import { propertyOf } from "../../../shared/utilities/property-of";
import { isNil } from "../../../shared/utilities/is-nil";
import { DateUtilies } from "../../../shared/utilities/Date";
import { FormFieldConfigValidatorType } from "../../../shared/types/form-field-config-validator.type";

@Component({
  selector: "app-workshop-monthly-info",
  templateUrl: "./workshop-monthly-info.component.html",
  styleUrls: ["./workshop-monthly-info.component.scss"],
})
export class WorkshopMonthlyInfoComponent implements OnChanges {
  @Input() formGroup: FormGroup = this._formBuilder.group({});
  @Input() cssHeight?: string;
  @Input() cssMinHeight?: string;
  @Input() cssOverflow?: OverflowType = "auto";
  @Input() showPadding?: boolean;
  @Input() idAttr?: string;
  @Input() showLoading: boolean;
  @Input() title: string = ""; // عنوان اصلی کامپوننت
  @Input() sections: Section[] = []; // بخش‌های داینامیک
  @Input() titleFontSize: string = "25px"; // سایز فونت عنوان اصلی
  @Input() set data(item: any) {
    this._data = item;
    if (this._data && this.sections) {
      // مقداردهی فیلدهای value بر اساس field
      this.populateValues();
    }
  }
  @Input() fields?: SectionData[];

  @Output() submitEvent = new EventEmitter<FormGroup>();
  @Output() saveEvent = new EventEmitter<FormGroup>();
  @Output() changeEvent = new EventEmitter<any>();

  private _data: any;
  constructor(private readonly _formBuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    const formGroupChange =
      changes[propertyOf<WorkshopMonthlyInfoComponent>("formGroup")];
    if (formGroupChange && this.formGroup) {
      this.formGroup.valueChanges.subscribe((values) => {
        this.changeEvent.emit(values);
      });
    }
  }
  // تابع برای محاسبه اندازه ستون‌ها بر اساس تعداد
  getColumnClass(columnCount: number): number {
    return 12 / columnCount; // محاسبه اندازه ستون بر اساس تعداد ستون‌ها
  }
  // متدی برای مقداردهی فیلد value بر اساس field

  populateValues() {
    this.sections.forEach((section) => {
      section.columns.forEach((column) => {
        column.forEach((field: any) => {
          // مقداردهی فیلدهای value بر اساس داده‌های ورودی
          field.value = this._data[field.binding] ?? null;
          // اضافه کردن کنترل به فرم
          this._addControls(field);
        });
      });
    });
  }
  submitHandler() {
    this.submitEvent.emit(this.formGroup);
    if (this.formGroup.valid) {
      this.saveEvent.emit(this.formGroup.value);
    }
  }

  textboxChangeHandler(changedValue: any, field: any) {
    if (typeof field.changeEvent == "function" && field.type == "textbox") {
      field.changeEvent(field.value, this.formGroup);
    }
  }
  private _addControls(field: SectionData) {
    const control = this._formBuilder.control(
      !isNil(field.value) ? field.value : null,
      this._bindValidations(field.validators)
    );

    if (field.disabled) {
      control.disable();
    }

    // اضافه کردن کنترل به فرم
    this.formGroup.addControl(field.binding, control);
  }
  private _prepareData(values: any, datePickerFields: FormFieldConfigType[]) {
    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        const value = values[key];
        if (
          datePickerFields.some((x) => x.binding == key) &&
          value &&
          typeof value !== "string"
        ) {
          values[key] = DateUtilies.convertDate(value);
        }
      }
    }
  }
  private _bindValidations(
    validators?: FormFieldConfigValidatorType[]
  ): ValidatorFn {
    if (validators?.length > 0) {
      return Validators.compose(validators.map((item) => item.type));
    }
    return null;
  }
}
