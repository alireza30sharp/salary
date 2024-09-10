import { Pipe, PipeTransform } from "@angular/core";
import { Validators } from "@angular/forms";
import { FormFieldConfigValidatorType } from "../../types/form-field-config-validator.type";

@Pipe({
  name: "hasReuqiredValidation",
})
export class HasReuqiredValidatorPipe implements PipeTransform {
  transform(validators?: FormFieldConfigValidatorType[]): boolean {
    return validators?.some((x) => x.type == Validators.required) || false;
  }
}
