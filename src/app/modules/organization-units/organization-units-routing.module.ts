import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import * as _pages from "./pages";
import { Paths } from "../../shared/utilities/paths";

const routes: Routes = [
  {
    path: "",
    component: _pages.OrganizationUnitsTreeComponent,
    children: [
      {
        path: Paths.organizationUnits.edit().path,
        component: _pages.OrganizationUnitsEditComponent,
      },
      {
        path: Paths.organizationUnits.add().path,
        component: _pages.OrganizationUnitsAddComponent,
      },
    ],
  },
  // {
  //   path: "",
  //   component: OrganizationUnitsComponent,
  //   children: [
  //     { path: "", redirectTo: "tree", pathMatch: "full" },
  //     {
  //       path: "tree",
  //       component: _pages.OrganizationUnitsTreeComponent,
  //       children: [
  //         {
  //           path: Paths.organizationUnits.edit().path,
  //           component: _pages.OrganizationUnitsEditComponent,
  //         },
  //         {
  //           path: Paths.organizationUnits.add().path,
  //           component: _pages.OrganizationUnitsAddComponent,
  //         },
  //       ],
  //     },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationUnitsRoutingModule {}
