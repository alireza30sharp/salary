import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import * as _pages from "./pages";
import { Paths } from "../../../../shared/utilities/paths";
import { ExemptionTypesComponent } from "./exemption-types.component";

const routes: Routes = [
  {
    path: "",
    component: ExemptionTypesComponent,
    children: [
      {
        path: Paths.ExemptionTypes.list().path,
        component: _pages.ExemptionTypesListComponent,
      },
      {
        path: Paths.ExemptionTypes.add().path,
        component: _pages.ExemptionTypesAddComponent,
      },
      {
        path: Paths.ExemptionTypes.edit().path,
        component: _pages.ExemptionTypesEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExemptionTypesRoutingModule {}
