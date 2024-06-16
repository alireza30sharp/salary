import { Injectable, NgModule } from "@angular/core";
import {
  NgbDatepickerModule,
  NgbDateStruct,
  NgbDateAdapter,
} from "@ng-bootstrap/ng-bootstrap";
import {
  NgbCalendar,
  NgbCalendarPersian,
  NgbDatepickerI18n,
} from "@ng-bootstrap/ng-bootstrap";
import { NgbDatepickerI18nPersian } from "./datepickerI18nPersian";
@Injectable()
export class CustomAdapter extends NgbDateAdapter<any> {
  readonly DELIMITER = "-";

  fromModel(value: string | NgbDateStruct): NgbDateStruct | null {
    if (value) {
      if (typeof value == "string") {
        const date = value.split(this.DELIMITER);
        return {
          day: parseInt(date[0], 10),
          month: parseInt(date[1], 10),
          year: parseInt(date[2], 10),
        };
      } else {
        return value;
      }
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): NgbDateStruct {
    return date;
  }
}

@NgModule({
  exports: [NgbDatepickerModule],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbCalendar, useClass: NgbCalendarPersian },
    { provide: NgbDatepickerI18n, useClass: NgbDatepickerI18nPersian },
  ],
})
export class DatePickerModule {}
