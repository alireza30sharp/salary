import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import * as _pages from "./pages";
import { SystemOperationComponent } from "./system-operation.component";

const routes: Routes = [
  {
    path: "",
    component: SystemOperationComponent,
    children: [
      {
        path: "monthly-performance",
        loadChildren: () =>
          import("../monthly-performance/monthly-performance.module").then(
            (m) => m.MonthlyPerformanceModule
          ),
      },
      {
        path: "benefit-deduction-employees",
        loadChildren: () =>
          import(
            "../benefit-deduction-employees/benefit-deduction-employees.module"
          ).then((m) => m.BenefitDeductionEmployeesModule),
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
