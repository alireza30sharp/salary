import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import * as _pages from "./pages";
import { InsuranceTypeComponent } from "./Insurance-type.component";
import { Paths } from "../../../../shared/utilities/paths";

const routes: Routes = [
  {
    path: "",
    component: InsuranceTypeComponent,
    children: [
      {
        path: Paths.InsuranceType.list().path,
        component: _pages.InsuranceTypeListComponent,
      },
      {
        path: Paths.InsuranceType.add().path,
        component: _pages.InsuranceTypeAddComponent,
      },
      {
        path: Paths.InsuranceType.edit().path,
        component: _pages.InsuranceTypeEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsuranceTypeRoutingModule {}
