import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "numberSeparator",
})
export class NumberSeparatorPipe implements PipeTransform {
  transform(value: number | string, separator: boolean = true): string {
    if (value === null || value === undefined) {
      return "";
    }

    // اگر جداکننده فعال باشد، فرمت را اعمال کن
    if (separator) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // در غیر این صورت مقدار را به صورت عادی برگردان
    return value.toString();
  }
}
