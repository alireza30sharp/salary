import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import * as _pages from "./pages";
import { Paths } from "../../shared/utilities/paths";
import { MonthlyPerformanceComponent } from "./monthly-performance.component";

const routes: Routes = [
  {
    path: "",
    component: MonthlyPerformanceComponent,
    children: [
      { path: "", redirectTo: "add", pathMatch: "full" },

      {
        path: Paths.MonthlyPerformance.add().path,
        component: _pages.MonthlyPerformanceAddComponent,
      },
      {
        path: Paths.MonthlyPerformance.edit().path,
        component: _pages.MonthlyPerformanceEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonthlyPerformanceRoutingModule {}
