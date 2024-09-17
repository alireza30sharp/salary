import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as _pages from "./pages";
import { SharedModule } from "../../../shared/shared.module";
import { BenefitDeductionComponent } from "./benefit-deduction.component";
import { BenefitDeductionRoutingModule } from "./benefit-deduction-routing.module";
@NgModule({
  declarations: [
    BenefitDeductionComponent,
    _pages.BenefitDeductionAddComponent,
    _pages.BenefitDeductionEditComponent,
    _pages.BenefitDeductionListComponent,
  ],
  imports: [CommonModule, BenefitDeductionRoutingModule, SharedModule],
})
export class BenefitDeductionModule {}
