import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import * as _pages from "./pages";
import { Paths } from "../../shared/utilities/paths";
import { WageOrdersComponent } from "./wage-orders.component";

const routes: Routes = [
  {
    path: "",
    component: WageOrdersComponent,
    children: [
      { path: "", redirectTo: "list", pathMatch: "full" },
      {
        path: "list",
        component: _pages.WageOrdersListComponent,
      },
      {
        path: "add",
        component: _pages.WageOrdersAddComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WageOrdersRoutingModule {}
