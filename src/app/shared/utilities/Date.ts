import { NgbDate, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export class DateUtilies {
  static convertDate(date: NgbDateStruct | null) {
    if (date == null) {
      return null;
    }

    const year = date.year.toString();
    const month = date.month.toString().padStart(2, "0");
    const day = date.day.toString().padStart(2, "0");

    return `${year}/${day}/${month}`;
  }

  static convertDateToNgbDateStruct(date: string): NgbDateStruct {
    if (date == null || date == "") return null;

    let convertedDate: NgbDateStruct = new NgbDate(
      +new Date(date).getFullYear(),
      +new Date(date).getMonth() + 1,
      +new Date(date).getDate()
    );

    return convertedDate;
  }

  static convertToNgbDateStruct(
    year: number,
    month: number,
    day: number
  ): NgbDateStruct {
    if (year == null || month == null || day == null) return null;

    let convertedDate: NgbDateStruct = new NgbDate(year, month + 1, day);

    return convertedDate;
  }
}
