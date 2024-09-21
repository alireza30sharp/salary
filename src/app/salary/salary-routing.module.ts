import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { SalaryComponent } from "./salary.component";
import * as _pages from "./pages";
import { RecordsOfChangesListComponent } from "./components/templates/records-of-changes-list/app-records-of-changes-list.component";
import { Paths } from "../shared/utilities/paths";

const routes: Routes = [
  {
    path: "",
    component: SalaryComponent,
    children: [
      {
        path: "change-page/:type",
        component: RecordsOfChangesListComponent,
      },
      {
        path: "work-shops",
        loadChildren: () =>
          import(
            "./modules/basic-information-modules/work-shops/work-shops.module"
          ).then((m) => m.WorkShopsModule),
      },
      {
        path: "benefit-deduction",
        loadChildren: () =>
          import(
            "./modules/basic-information-modules/benefit-deduction/benefit-deduction.module"
          ).then((m) => m.BenefitDeductionModule),
      },
      {
        path: "tax",
        loadChildren: () =>
          import("./modules/basic-information-modules/tax/tax.module").then(
            (m) => m.TaxModule
          ),
      },

      {
        path: "education-evidences",
        loadChildren: () =>
          import(
            "./modules/basic-information-modules/educatio-evidences/educatio-evidences.module"
          ).then((m) => m.EducationEvidencesModule),
      },
      {
        path: "education-fields",
        loadChildren: () =>
          import(
            "./modules/basic-information-modules/education-fields/education-fields.module"
          ).then((m) => m.EducationFieldsModule),
      },
      {
        path: "employment-types",
        loadChildren: () =>
          import(
            "./modules/basic-information-modules/employment-types/employment-types.module"
          ).then((m) => m.EmploymentTypesModule),
      },
      {
        path: "organization-post",
        loadChildren: () =>
          import(
            "./modules/basic-information-modules/organization-post/organization-post.module"
          ).then((m) => m.OrganizationPostModule),
      },
      {
        path: "employes",
        loadChildren: () =>
          import(
            "./modules/basic-information-modules/employes/employes.module"
          ).then((m) => m.EmployesModule),
      },
      {
        path: "benefit-deduction-employees-list",
        component: _pages.BenefitDeductionEmployeesListComponent,
      },

      {
        path: "payment-location",
        loadChildren: () =>
          import(
            "./modules/basic-information-modules/payment-location/payment-location.module"
          ).then((m) => m.PaymentLocationModule),
      },

      {
        path: "layout",
        loadChildren: () =>
          import("./layout/layout.module").then((m) => m.LayoutModule),
      },
      {
        path: "organization-units",
        loadChildren: () =>
          import("./modules/organization-units/organization-units.module").then(
            (m) => m.OrganizationUnitsModule
          ),
      },
      {
        path: "system-operation",
        loadChildren: () =>
          import("./modules/system-operation/system-operation.module").then(
            (m) => m.SystemOperationModule
          ),
      },
      {
        path: "wage-orders",
        loadChildren: () =>
          import("./modules/wage-orders/wage-orders.module").then(
            (m) => m.WageOrdersModule
          ),
      },
      {
        path: "employment-order",
        loadChildren: () =>
          import("./modules/employment-order/employment-order.module").then(
            (m) => m.EmploymentOrderModule
          ),
      },
      {
        path: "insurance-type",
        loadChildren: () =>
          import(
            "./modules/basic-information-modules/Insurance-type/Insurance-type.module"
          ).then((m) => m.InsuranceTypeModule),
      },
      {
        path: "exemption-types",
        loadChildren: () =>
          import(
            "./modules/basic-information-modules/exemption-types/exemption-types.module"
          ).then((m) => m.ExemptionTypesModule),
      },
      {
        path: "",
        redirectTo: "system-operation/list",
        pathMatch: "full",
      },

      {
        path: "advance",
        loadChildren: () =>
          import("./modules/advance/advance.module").then(
            (m) => m.AdvanceModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalaryRoutingModule {}
