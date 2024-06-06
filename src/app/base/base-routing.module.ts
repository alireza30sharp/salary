import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { BaseComponent } from "./base.component";
import * as _pages from "./pages";
import { RecordsOfChangesListComponent } from "./components/templates/records-of-changes-list/app-records-of-changes-list.component";

const routes: Routes = [
  {
    path: "",
    component: BaseComponent,
    children: [
      {
        path: "change-page/:type",
        component: RecordsOfChangesListComponent,
      },
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
        path: "employment-types",
        component: _pages.EmploymentTypesListComponent,
      },
      {
        path: "organization-post",
        component: _pages.OrganizationPostListComponent,
      },
      {
        path: "payment-location",
        component: _pages.PaymentLocationListComponent,
      },
      {
        path: "organization-units",
        loadChildren: () =>
          import(
            "../modules/organization-units/organization-units.module"
          ).then((m) => m.OrganizationUnitsModule),
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
