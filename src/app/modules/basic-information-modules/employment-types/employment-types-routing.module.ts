import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import * as _pages from "./pages";
import { Paths } from "../../../shared/utilities/paths";
import { EmploymentTypesComponent } from "./employment-types.component";

const routes: Routes = [
  {
    path: "",
    component: EmploymentTypesComponent,
    children: [
      {
        path: Paths.EmploymentTypes.list().path,
        component: _pages.EmploymentTypesListComponent,
      },
      {
        path: Paths.EmploymentTypes.add().path,
        component: _pages.EmploymentTypesAddComponent,
      },
      {
        path: Paths.EmploymentTypes.edit().path,
        component: _pages.EmploymentTypesEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmploymentTypesRoutingModule {}
