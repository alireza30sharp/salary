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
  static generateYearlyList(): Array<any> {
    let yearlyList = [];
    for (let year = 1360; year <= 1500; year++) {
      yearlyList.push({ label: year.toString(), value: year });
    }
    return yearlyList;
  }

  /**
   *
   * @returns{ fromDate: string, toDate: string }
   * getTodayDateRange(): این تابع تاریخ از ابتدای روز جاری تا انتهای روز جاری را به فرمت YYYY/MM/DD HH:mm:ss برمی‌گرداند. این برای صفحاتی که به فیلتر کردن داده‌ها برای روز جاری نیاز دارند، مناسب است.
   */
  static getTodayDateRange(): {
    fromDate: NgbDateStruct;
    toDate: NgbDateStruct;
  } {
    const startOfDay = moment().locale("fa").startOf("day");
    const endOfDay = moment().locale("fa").endOf("day");

    return {
      fromDate: this.convertMomentToNgbDateStruct(startOfDay),
      toDate: this.convertMomentToNgbDateStruct(endOfDay),
    };
  }

  /**
   *
   * @returns{ fromDate: string, toDate: string }
   * getCurrentMonthDateRange(): این تابع تاریخ از ابتدای ماه جاری تا انتهای ماه جاری را برمی‌گرداند. این برای صفحاتی که به یک دامنه زمانی ماهانه نیاز دارند، کاربردی است.
   */
  static getCurrentMonthDateRange(): {
    fromDate: NgbDateStruct;
    toDate: NgbDateStruct;
  } {
    const startOfMonth = moment().locale("fa").startOf("jMonth");
    const endOfMonth = moment().locale("fa").endOf("jMonth");

    return {
      fromDate: this.convertMomentToNgbDateStruct(startOfMonth),
      toDate: this.convertMomentToNgbDateStruct(endOfMonth),
    };
  }

  /**
   *
   * @param daysAgo
   * @returns
   * getCustomDateRange(daysAgo: number): این تابع به شما اجازه می‌دهد یک دامنه زمانی سفارشی تعریف کنید. به عنوان مثال، اگر daysAgo برابر با 7 باشد، دامنه‌ای از 7 روز پیش تا روز جاری تولید می‌شود.
   */
  static getCustomDateRange(daysAgo: number): {
    fromDate: NgbDateStruct;
    toDate: NgbDateStruct;
  } {
    const fromDate = moment()
      .locale("fa")
      .subtract(daysAgo, "days")
      .startOf("day");
    const toDate = moment().locale("fa").endOf("day");

    return {
      fromDate: this.convertMomentToNgbDateStruct(fromDate),
      toDate: this.convertMomentToNgbDateStruct(toDate),
    };
  }
  /**
   *
   * @param type
   * @param daysAgo
   * @returns
   * getDateRange(type: 'today' | 'thisMonth' | 'custom', daysAgo?: number): این تابع اصلی به شما اجازه می‌دهد که نوع فیلتر (امروز، ماه جاری یا سفارشی) را انتخاب کنید. اگر نوع فیلتر سفارشی باشد، باید پارامتر daysAgo را هم وارد کنید.
   */
  static getDateRange(
    type: "today" | "thisMonth" | "custom",
    daysAgo?: number
  ): { fromDate: NgbDateStruct; toDate: NgbDateStruct } {
    switch (type) {
      case "today":
        return this.getTodayDateRange();
      case "thisMonth":
        return this.getCurrentMonthDateRange();
      case "custom":
        if (daysAgo !== undefined) {
          return this.getCustomDateRange(daysAgo);
        }
        throw new Error("For custom range, please provide daysAgo parameter");
      default:
        throw new Error("Invalid date range type");
    }
  }
  static convertMomentToNgbDateStruct(
    momentDate: moment.Moment
  ): NgbDateStruct {
    const jalaliDate = momentDate
      .format("jYYYY/jMM/jDD")
      .split("/")
      .map(Number);
    return {
      year: jalaliDate[0],
      month: jalaliDate[1],
      day: jalaliDate[2],
    };
  }

  /**
   *
   * @returns
   * تابع getFirstDayOfCurrentMonth: این تابع از moment برای محاسبه روز اول ماه جاری استفاده می‌کند. با استفاده از متد startOf('jMonth')، روز اول ماه جلالی محاسبه می‌شود.
   */
  static getFirstDayOfCurrentMonth(): NgbDateStruct {
    const firstDayOfMonth = moment().locale("fa").startOf("jMonth"); // Start of the current Jalali month
    return this.convertMomentToNgbDateStruct(firstDayOfMonth);
  }
}
