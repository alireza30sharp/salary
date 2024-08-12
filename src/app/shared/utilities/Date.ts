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
    if (date == null || date === "") return null;

    let convertedDate: NgbDateStruct;

    // Check if the date is in Jalali format
    if (moment(date, "jYYYY/jMM/jDD", true).isValid()) {
      const jalaliDate = moment.from(date, "fa", "jYYYY/jMM/jDD");
      convertedDate = {
        year: jalaliDate.jYear(),
        month: jalaliDate.jMonth() + 1, // moment.js months are zero-indexed
        day: jalaliDate.jDate(),
      };
    } else {
      // Assume date is in Gregorian format
      const gregorianDate = moment(date, "MM/DD/YYYY, h:mm:ss A");
      const jalaliDate = gregorianDate
        .locale("fa")
        .format("jYYYY/jMM/jDD")
        .split("/");
      convertedDate = {
        year: +jalaliDate[0],
        month: +jalaliDate[1],
        day: +jalaliDate[2],
      };
    }

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

  // Method to get the current month as an object
  static getCurrentMonth(): { label: string; value: number } {
    const now = moment();
    const month = now.jMonth() + 1;
    const monthNames = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];

    return { label: monthNames[month - 1], value: month };
  }

  // Method to get the current year as a numeric value
  static getCurrentYear(): number {
    const now = moment();
    return now.jYear();
  }
}
