import { FormGroup } from "@angular/forms";

import { FormFieldConfigValidatorType } from "./form-field-config-validator.type";
import { FieldConfigType } from "./field-config.type";
import {
  UiCheckboxComponentInterface,
  UiInputComponentInterface,
  UiSelectComponentInterface,
  UiTextareaComponentInterface,
} from "../ki-components";

export type TextboxFormFieldConfigType = {
  type: "textbox";
  config?: UiInputComponentInterface;
};

export type TextareaFormFieldConfigType = {
  type: "textarea";
  config?: UiTextareaComponentInterface;
};

export type SelectFormFieldConfigType = {
  type: "select";
  config: UiSelectComponentInterface;
};

export type DatePickerFormFieldConfigType = {
  type: "date-picker";
  config?: any;
};

export type CheckboxFormFieldConfigType = {
  type: "checkbox";
  config?: UiCheckboxComponentInterface;
};

export type FormFieldConfigType = {
  idAttr?: string;
  defaultValue?: any;
  readonly?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  hideLabel?: boolean;
  invisible?: boolean;
  validators?: FormFieldConfigValidatorType[];
  columnWidthNumber?: 2 | 3 | 4 | 6 | 8 | 12;
  changeEvent?: (value: any, formGroup: FormGroup, isInitial?: boolean) => void;
} & FieldConfigType &
  (
    | TextboxFormFieldConfigType
    | TextareaFormFieldConfigType
    | SelectFormFieldConfigType
    | DatePickerFormFieldConfigType
    | CheckboxFormFieldConfigType
  );
