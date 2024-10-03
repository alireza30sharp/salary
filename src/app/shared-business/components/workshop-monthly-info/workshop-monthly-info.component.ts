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

  // تابع برای محاسبه اندازه ستون‌ها بر اساس تعداد
  getColumnClass(columnCount: number): number {
    return 12 / columnCount; // محاسبه اندازه ستون بر اساس تعداد ستون‌ها
  }
}
