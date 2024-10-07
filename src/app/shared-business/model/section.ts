import { FormGroup } from "@angular/forms";
import {
  KiInputComponentInterface,
  UiCheckboxComponentInterface,
  UiSelectComponentInterface,
  UiTextareaComponentInterface,
} from "../../shared/ki-components";
import { FieldConfigType } from "../../shared/types/field-config.type";
import { FormFieldConfigValidatorType } from "../../shared/types/form-field-config-validator.type";

export type InputType = "number" | "text" | "label";
export interface lblComponentInterface {
  separator: boolean;
}

export type TextboxFormFieldConfigType = {
  type: "textbox";
  config?: KiInputComponentInterface;
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
export type LabelFormFieldConfigType = {
  type: "lbl";
  config?: lblComponentInterface;
};

// export type SectionData = {
//   label: string; // لیبل فیلد (مثل جمع دستمزد ماهانه)
//   type?: InputType; // نوع فیلد (مثل number یا string)
//   value?: any; // مقدار فیلد
//   separator?: boolean; // آیا باید جداکننده اضافه شود یا خیر
//   validators?: FormFieldConfigValidatorType[];
//   changeEvent?: (value: any, formGroup: FormGroup, isInitial?: boolean) => void;
// } & FieldConfigType &
//   (
//     | TextboxFormFieldConfigType
//     | TextareaFormFieldConfigType
//     | SelectFormFieldConfigType
//     | DatePickerFormFieldConfigType
//     | CheckboxFormFieldConfigType
//   );

export type Section = {
  title?: string; // عنوان اختیاری برای هر بخش
  columns: SectionData[][]; // هر ستون شامل چندین کلید و مقدار است
};

export type SectionData = {
  idAttr?: string;
  defaultValue?: any;
  readonly?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  hideLabel?: boolean;
  invisible?: boolean;
  validators?: FormFieldConfigValidatorType[];
  value?: string;
  columnWidthNumber?: 2 | 3 | 4 | 6 | 8 | 12;
  changeEvent?: (value: any, formGroup: FormGroup, isInitial?: boolean) => void;
} & FieldConfigType &
  (
    | TextboxFormFieldConfigType
    | TextareaFormFieldConfigType
    | SelectFormFieldConfigType
    | DatePickerFormFieldConfigType
    | CheckboxFormFieldConfigType
    | LabelFormFieldConfigType
  );
