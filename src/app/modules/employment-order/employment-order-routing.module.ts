import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import * as _pages from "./pages";
import { Paths } from "../../shared/utilities/paths";
import { EmploymentOrderComponent } from "./employment-order.component";

const routes: Routes = [
  {
    path: "",
    component: EmploymentOrderComponent,
    children: [
      { path: "", redirectTo: "list", pathMatch: "full" },
      {
        path: Paths.wageOrders.list().path,
        component: _pages.EmploymentOrdersListComponent,
      },
      {
        path: Paths.wageOrders.add().path,
        component: _pages.EmploymentOrderAddComponent,
      },
      {
        path: Paths.wageOrders.edit().path,
        component: _pages.EmploymentOrderEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmploymentOrderRoutingModule {}
