import { Pipe, PipeTransform } from "@angular/core";
import { FormFieldConfigType } from "../../types/form-field-config.type";

@Pipe({
  name: "getElementId",
})
export class GetElementIdPipe implements PipeTransform {
  transform(field: FormFieldConfigType, formUniqueKey: number): string | null {
    if (field.idAttr) return field.idAttr;
    return formUniqueKey + "-" + field.binding;
  }
}
