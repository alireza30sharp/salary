import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import * as _pages from "./pages";
import { Paths } from "../../../shared/utilities/paths";
import { EmployesComponent } from "./employes.component";

const routes: Routes = [
  {
    path: "",
    component: EmployesComponent,
    children: [
      {
        path: Paths.Employes.list().path,
        component: _pages.EmployesListComponent,
      },
      {
        path: Paths.Employes.add().path,
        component: _pages.EmployesAddComponent,
      },
      {
        path: Paths.Employes.edit().path,
        component: _pages.EmployesEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployesRoutingModule {}
