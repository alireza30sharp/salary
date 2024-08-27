import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import * as _pages from "./pages";
import { Paths } from "../../shared/utilities/paths";
import { SystemOperationComponent } from "./system-operation.component";

const routes: Routes = [
  {
    path: "",
    component: SystemOperationComponent,
    children: [
      {
        path: "list",
        component: _pages.ListComponent,
      },
      {
        path: "monthly-performance",
        loadChildren: () =>
          import("../monthly-performance/monthly-performance.module").then(
            (m) => m.MonthlyPerformanceModule
          ),
      },
      {
        path: "salary-calculation",
        loadChildren: () =>
          import("../salary-calculation/salary-calculation.module").then(
            (m) => m.SalaryCalculationModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemOperationRoutingModule {}
