import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { BaseComponent } from "./base.component";
import * as _pages from "./pages";
import { RecordsOfChangesListComponent } from "./components/templates/records-of-changes-list/app-records-of-changes-list.component";
import { Paths } from "../shared/utilities/paths";

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
        path: "wage-orders",
        component: _pages.WageOrdersComponent,
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
        path: "employes-list",
        component: _pages.EmployesListComponent,
      },
      {
        path: "benefit-deduction-employees-list",
        component: _pages.BenefitDeductionEmployeesListComponent,
      },
      {
        path: "employment-orders-list",
        component: _pages.EmploymentOrdersListComponent,
      },
      {
        path: "payment-location",
        component: _pages.PaymentLocationListComponent,
      },

      {
        path: "layout",
        loadChildren: () =>
          import("./layout/layout.module").then((m) => m.LayoutModule),
      },
      {
        path: "organization-units",
        loadChildren: () =>
          import(
            "../modules/organization-units/organization-units.module"
          ).then((m) => m.OrganizationUnitsModule),
      },
      {
        path: "system-operation",
        loadChildren: () =>
          import("../modules/system-operation/system-operation.module").then(
            (m) => m.SystemOperationModule
          ),
      },
      {
        path: "",
        redirectTo: "system-operation/list",
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
