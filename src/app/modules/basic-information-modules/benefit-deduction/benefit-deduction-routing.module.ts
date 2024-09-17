import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import * as _pages from "./pages";
import { Paths } from "../../../shared/utilities/paths";
import { BenefitDeductionComponent } from "./benefit-deduction.component";

const routes: Routes = [
  {
    path: "",
    component: BenefitDeductionComponent,
    children: [
      {
        path: Paths.BenefitDeduction.list().path,
        component: _pages.BenefitDeductionListComponent,
      },
      {
        path: Paths.BenefitDeduction.add().path,
        component: _pages.BenefitDeductionAddComponent,
      },
      {
        path: Paths.BenefitDeduction.edit().path,
        component: _pages.BenefitDeductionEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BenefitDeductionRoutingModule {}
