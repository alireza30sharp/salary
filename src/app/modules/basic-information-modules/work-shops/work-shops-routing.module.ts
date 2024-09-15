import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import * as _pages from "./pages";
import { Paths } from "../../../shared/utilities/paths";
import { WorkShopsComponent } from "./work-shops.component";

const routes: Routes = [
  {
    path: "",
    component: WorkShopsComponent,
    children: [
      {
        path: Paths.WorkShops.list().path,
        component: _pages.WorkShopsListComponent,
      },
      {
        path: Paths.WorkShops.add().path,
        component: _pages.WorkShopsAddComponent,
      },
      {
        path: Paths.WorkShops.edit().path,
        component: _pages.WorkShopsEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkShopsRoutingModule {}
