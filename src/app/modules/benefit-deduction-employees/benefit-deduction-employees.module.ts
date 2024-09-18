import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as _pages from "./pages";
import { BenefitDeductionEmployeesComponent } from "./benefit-deduction-employees.component";
import { BenefitDeductionEmployeesRoutingModule } from "./benefit-deduction-employees-routing.module";
import { SharedModule } from "../../shared/shared.module";
@NgModule({
  declarations: [
    BenefitDeductionEmployeesComponent,
    _pages.BenefitDeductionEmployeesAddComponent,
    _pages.BenefitDeductionEmployeesEditComponent,
    _pages.BenefitDeductionEmployeesListComponent,
  ],
  imports: [CommonModule, BenefitDeductionEmployeesRoutingModule, SharedModule],
})
export class BenefitDeductionEmployeesModule {}
