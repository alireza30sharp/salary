import { Component, Input } from "@angular/core";
import { Section } from "../../model/Section";

@Component({
  selector: "app-workshop-monthly-info",
  templateUrl: "./workshop-monthly-info.component.html",
  styleUrls: ["./workshop-monthly-info.component.scss"],
})
export class WorkshopMonthlyInfoComponent {
  @Input() title: string = ""; // عنوان اصلی کامپوننت
  @Input() sections: Section[] = []; // بخش‌های داینامیک
  @Input() titleFontSize: string = "25px"; // سایز فونت عنوان اصلی
  @Input() set data(item: any) {
    this._data = item;
    if (this._data && this.sections) {
      // مقداردهی فیلدهای value بر اساس field
      this.populateValues();
    }
  }
  private _data: any;

  // تابع برای محاسبه اندازه ستون‌ها بر اساس تعداد
  getColumnClass(columnCount: number): number {
    return 12 / columnCount; // محاسبه اندازه ستون بر اساس تعداد ستون‌ها
  }
  // متدی برای مقداردهی فیلد value بر اساس field
  populateValues() {
    this.sections.forEach((section) => {
      section.columns.forEach((column) => {
        column.forEach((field) => {
          // اگر فیلد در داده وجود داشت، مقدار آن را به value بایند کنیم
          field.value = this._data[field.field] ?? null;
        });
      });
    });
  }
  getValue(field: string): any {
    return this.data ? this.data[field] : null;
  }
}
