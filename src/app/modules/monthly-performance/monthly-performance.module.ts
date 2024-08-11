import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as _pages from "./pages";
import { SharedModule } from "../../shared/shared.module";
import { MonthlyPerformanceComponent } from "./monthly-performance.component";
import { MonthlyPerformanceRoutingModule } from "./monthly-performance-routing.module";
@NgModule({
  declarations: [
    MonthlyPerformanceComponent,
    _pages.MonthlyPerformanceAddComponent,
  ],
  imports: [CommonModule, MonthlyPerformanceRoutingModule, SharedModule],
})
export class MonthlyPerformanceModule {}
