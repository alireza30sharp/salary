import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  NgForm,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { FormFieldConfigType } from "../../types/form-field-config.type";
import { OverflowType } from "../../types/overflow.type";
import { propertyOf } from "../../utilities/property-of";
import { SelectOptionInterface } from "../../interfaces/select-option.interface";
import { DateUtilies } from "../../utilities/Date";
import { isNil } from "../../utilities/is-nil";
import { FormFieldConfigValidatorType } from "../../types/form-field-config-validator.type";

@Component({
  selector: "app-general-form",
  templateUrl: "./general-form.component.html",
  styleUrls: ["./general-form.component.scss"],
})
export class GeneralFormComponent implements OnChanges {
  @Input() idAttr?: string;
  @Input() fields?: FormFieldConfigType[];
  @Input() model?: any;
  @Input() formGroup?: FormGroup;
  @Input() form?: NgForm;
  @Input() cssHeight?: string;
  @Input() cssMinHeight?: string;
  @Input() cssOverflow?: OverflowType = "auto";
  @Input() columnCount?: number = 2;
  @Input() hideFooter?: boolean;
  @Input() showPadding?: boolean;

  @Output() submitEvent = new EventEmitter<FormGroup>();
  @Output() saveEvent = new EventEmitter<FormGroup>();
  @Output() changeEvent = new EventEmitter<any>();

  readonly formUniqueKey = new Date().getTime();

  constructor(private readonly _formBuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    const formGroupChange =
      changes[propertyOf<GeneralFormComponent>("formGroup")];
    if (formGroupChange && this.formGroup) {
      this.formGroup.valueChanges.subscribe((values) => {
        this.changeEvent.emit(values);
      });
    }

    const fieldsChange = changes[propertyOf<GeneralFormComponent>("fields")];
    if (fieldsChange && this.fields) {
      this._addControls(this.fields);
    }

    const modelChange = changes[propertyOf<GeneralFormComponent>("model")];
    if (modelChange) {
      this.formGroup.patchValue(this.model || {});
      for (const key in this.model) {
        if (Object.prototype.hasOwnProperty.call(this.model, key)) {
          const element = this.model[key];
          if (element) {
            const field = this.fields.find((x) => x.binding === key);
            if (field && typeof field.changeEvent === "function") {
              let value: any = element;
              if (field.type === "select") {
                value = field.config.options?.find(
                  (x) =>
                    x[
                      field.config.bindValue ||
                        propertyOf<SelectOptionInterface>("value")
                    ] == element
                );
              }

              if (value) {
                field.changeEvent(value, this.formGroup, true);
              }
            }
          }
        }
      }
    }
  }

  submitHandler() {
    this.submitEvent.emit(this.formGroup);
    if (this.formGroup.valid) {
      this.saveEvent.emit(this.formGroup.value);
    }
  }

  cancelHandler() {}

  textboxChangeHandler(changedValue: any, field: FormFieldConfigType) {
    if (typeof field.changeEvent == "function" && field.type == "textbox") {
      field.changeEvent(changedValue, this.formGroup);
    }
  }

  selectChangeHandler(changedValue: any, field: FormFieldConfigType) {
    if (typeof field.changeEvent == "function" && field.type == "select") {
      const changedItem = field.config.options.find(
        (x: any) =>
          x[
            field.config.bindValue || propertyOf<SelectOptionInterface>("value")
          ] == changedValue
      );

      field.changeEvent(changedItem || null, this.formGroup);
    }
  }

  datePickerChangeHandler(
    changedValue: NgbDateStruct,
    field: FormFieldConfigType
  ) {
    if (typeof field.changeEvent == "function" && field.type == "date-picker") {
      field.changeEvent(DateUtilies.convertDate(changedValue), this.formGroup);
    }
  }
  checkboxChangeHandler(
    changedValue: NgbDateStruct,
    field: FormFieldConfigType
  ) {
    if (typeof field.changeEvent == "function" && field.type == "checkbox") {
      field.changeEvent(changedValue, this.formGroup);
    }
  }
  private _addControls(fields: FormFieldConfigType[]) {
    if (!this.formGroup) {
      this.formGroup = this._formBuilder.group({});
      this.formGroup.valueChanges.subscribe((values) => {
        this._prepareData(
          values,
          fields.filter((x) => x.type === "date-picker")
        );
        this.changeEvent.emit({
          values,
        });
      });
    }

    fields?.forEach((field) => {
      const control = this._formBuilder.control(
        !isNil(field.defaultValue) ? field.defaultValue : null,
        this._bindValidations(field.validators)
      );

      if (field.disabled) {
        control.disable();
      }

      this.formGroup.addControl(field.binding, control);
    });
  }

  private _bindValidations(
    validators?: FormFieldConfigValidatorType[]
  ): ValidatorFn {
    if (validators?.length > 0) {
      return Validators.compose(validators.map((item) => item.type));
    }
    return null;
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
}
