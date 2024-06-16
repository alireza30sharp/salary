import { Component, inject, Injectable } from "@angular/core";
import {
  NgbCalendar,
  NgbCalendarPersian,
  NgbDatepickerI18n,
  NgbDatepickerModule,
  NgbDateStruct,
} from "@ng-bootstrap/ng-bootstrap";
const WEEKDAYS_SHORT = ["د", "س", "چ", "پ", "ج", "ش", "ی"];
const MONTHS = [
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

@Injectable()
export class NgbDatepickerI18nPersian extends NgbDatepickerI18n {
  getWeekdayLabel(weekday: number) {
    return WEEKDAYS_SHORT[weekday - 1];
  }
  getMonthShortName(month: number) {
    return MONTHS[month - 1];
  }
  getMonthFullName(month: number) {
    return MONTHS[month - 1];
  }
  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.year}-${this.getMonthFullName(date.month)}-${date.day}`;
  }
}
