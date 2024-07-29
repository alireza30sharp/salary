import { NgbDate, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "jalali-moment";

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

    const jalaliDate = moment(date, "MM/DD/YYYY, h:mm:ss A")
      .locale("fa")
      .format("jYYYY/jM/jD")
      .split("/");
    let convertedDate: NgbDateStruct = {
      year: +jalaliDate[0],
      month: +jalaliDate[1],
      day: +jalaliDate[2],
    };

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
