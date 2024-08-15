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

    return `${year}/${month}/${day}`;
  }

  static convertDateToNgbDateStruct(date: string): NgbDateStruct | null {
    if (!date) return null;

    // Attempt to parse the date as Gregorian using multiple formats
    const gregorianDate = moment(date, ["MM/DD/YYYY", "M/D/YYYY"], true);
    if (gregorianDate.isValid()) {
      // Convert to Jalali date
      const jalaliDate = gregorianDate.locale("fa").format("jYYYY/jMM/jDD");
      const [year, month, day] = jalaliDate.split("/").map(Number);

      return { year, month, day };
    }

    // If parsing fails, return null
    return null;
  }
  static convertDatePersionToNgbDateStruct(date: string): NgbDateStruct | null {
    if (!date) return null;
    const [year, month, day] = date.split("/").map(Number);

    return { year, month, day };

    // If parsing fails, return null
    return null;
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
