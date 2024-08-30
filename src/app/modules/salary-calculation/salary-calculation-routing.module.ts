import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import * as _pages from "./pages";
import { Paths } from "../../shared/utilities/paths";
import { SalaryCalculationComponent } from "./salary-calculation.component";

const routes: Routes = [
  {
    path: "",
    component: SalaryCalculationComponent,
    children: [
      { path: "", redirectTo: "add", pathMatch: "full" },
      {
        path: Paths.SalaryCalculation.add().path,
        component: _pages.SalaryCalculationAddComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalaryCalculationRoutingModule {}
