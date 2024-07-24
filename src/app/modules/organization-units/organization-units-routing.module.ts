import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import * as _pages from "./pages";
import { Paths } from "../../shared/utilities/paths";
import { OrganizationUnitsComponent } from "./organization-units.component";

const routes: Routes = [
  {
    path: " ",

    component: OrganizationUnitsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationUnitsRoutingModule {}
