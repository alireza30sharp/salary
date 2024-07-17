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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemOperationRoutingModule {}
