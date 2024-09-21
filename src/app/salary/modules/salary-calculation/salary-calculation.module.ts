import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as _pages from "./pages";
import { SharedModule } from "../../../shared/shared.module";
import { SalaryCalculationComponent } from "./salary-calculation.component";
import { SalaryCalculationRoutingModule } from "./salary-calculation-routing.module";
@NgModule({
  declarations: [
    SalaryCalculationComponent,
    _pages.SalaryCalculationAddComponent,
  ],
  imports: [CommonModule, SalaryCalculationRoutingModule, SharedModule],
})
export class SalaryCalculationModule {}
