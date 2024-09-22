import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import * as _pages from "./pages";
import { Paths } from "../../../../shared/utilities/paths";
import { WageOrdersComponent } from "./wage-orders.component";

const routes: Routes = [
  {
    path: "",
    component: WageOrdersComponent,
    children: [
      {
        path: Paths.wageOrders.list().path,
        component: _pages.WageOrdersListComponent,
      },
      {
        path: Paths.wageOrders.add().path,
        component: _pages.WageOrdersAddComponent,
      },
      {
        path: Paths.wageOrders.edit().path,
        component: _pages.WageOrdersEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WageOrdersRoutingModule {}
