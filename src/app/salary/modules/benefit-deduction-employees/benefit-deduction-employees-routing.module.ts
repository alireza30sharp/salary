import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import * as _pages from "./pages";
import { BenefitDeductionEmployeesComponent } from "./benefit-deduction-employees.component";
import { Paths } from "../../../shared/utilities/paths";

const routes: Routes = [
  {
    path: "",
    component: BenefitDeductionEmployeesComponent,
    children: [
      {
        path: Paths.BenefitDeductionEmployees.list().path,
        component: _pages.BenefitDeductionEmployeesListComponent,
      },
      {
        path: Paths.BenefitDeductionEmployees.add().path,
        component: _pages.BenefitDeductionEmployeesAddComponent,
      },
      {
        path: Paths.BenefitDeductionEmployees.edit().path,
        component: _pages.BenefitDeductionEmployeesEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BenefitDeductionEmployeesRoutingModule {}
