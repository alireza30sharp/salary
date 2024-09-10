import { Pipe, PipeTransform } from "@angular/core";
import { ValidationErrors, Validators } from "@angular/forms";
import { FormFieldConfigType } from "../../types/form-field-config.type";
import { getValidatorFnName } from "../../types/get-validator-fn-name";

@Pipe({
  name: "getValidatorMessage",
})
export class GetValidatorMessagePipe implements PipeTransform {
  constructor() {}

  transform(
    field: FormFieldConfigType,
    errors: ValidationErrors
  ): string | null {
    const validators = field.validators || [];

    if (!errors) return null;
    const keys = Object.keys(errors);
    if (keys.length < 0) return null;

    const output: string[] = [];

    keys.forEach((key) => {
      const findedValidator =
        validators.length == 1
          ? validators[0]
          : validators.find(
              (x) =>
                getValidatorFnName(x.type).toLowerCase() === key.toLowerCase()
            );

      if (findedValidator?.message?.trim()) {
        output.push(findedValidator.message);
      } else {
        switch (key) {
          case Validators.required.name:
            output.push("این فیلد اجباری");
            break;

          case Validators.pattern.name:
            output.push("THIS FIELD IS INCORRECT"); // TODO: add translation
            break;

          case "invalidDate":
            output.push("فرمت تاریخ نامعتبر");
            break;

          default:
            output.push(field.title + " HAS ERROR"); // TODO: add translation
            break;
        }
      }
    });

    return output.length ? output.join(" | ") : null;
  }
}
