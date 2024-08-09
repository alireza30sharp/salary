import { InjectionToken } from "@angular/core";

export const DATE_INPUT_FORMAT = new InjectionToken<
  "day-month-year" | "month-year" | "year"
>("Date Input Format");
