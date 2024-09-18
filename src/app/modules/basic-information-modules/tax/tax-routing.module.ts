import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import * as _pages from "./pages";
import { Paths } from "../../../shared/utilities/paths";
import { TaxComponent } from "./tax.component";

const routes: Routes = [
  {
    path: "",
    component: TaxComponent,
    children: [
      {
        path: Paths.Tax.list().path,
        component: _pages.TaxListComponent,
      },
      {
        path: Paths.Tax.add().path,
        component: _pages.TaxAddComponent,
      },
      {
        path: Paths.Tax.edit().path,
        component: _pages.TaxEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaxRoutingModule {}
