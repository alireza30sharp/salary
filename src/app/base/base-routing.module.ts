import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { BaseComponent } from "./base.component";
import * as _pages from "./pages";

const routes: Routes = [
  {
    path: "",
    component: BaseComponent,
    children: [
      {
        path: "work-shops",
        component: _pages.WorkShopsListComponent,
      },
      {
        path: "benefit-deduction",
        component: _pages.BenefitDeductionListComponent,
      },
      {
        path: "tax",
        component: _pages.TaxListComponent,
      },
      {
        path: "education",
        component: _pages.EducationEvidencesListComponent,
      },
      {
        path: "fields",
        component: _pages.EducationFieldsListComponent,
      },
      {
        path: "layout",
        loadChildren: () =>
          import("./layout/layout.module").then((m) => m.LayoutModule),
      },
      {
        path: "",
        redirectTo: "work-shops",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule {}
