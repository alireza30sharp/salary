import { NgModule } from "@angular/core";
import { NbMenuModule } from "@nebular/theme";
import { ThemeModule } from "../@theme/theme.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { BaseComponent } from "./base.component";
import { BaseRoutingModule } from "./base-routing.module";
import * as _organisms from "./components/organisms";
import * as _template from "./components/templates";
import * as _pages from "./pages";
import { SharedModule } from "../shared/shared.module";
import { RecordsOfChangesListComponent } from "./components/templates/records-of-changes-list/app-records-of-changes-list.component";
@NgModule({
  imports: [
    BaseRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    SharedModule,
  ],
  declarations: [
    BaseComponent,
    _organisms.WorkShopsFormComponent,
    _organisms.BenefitDeductionFormComponent,
    _organisms.TaxFormComponent,
    _organisms.EducationEvidencesFormComponent,
    _organisms.EducationFieldsFormComponent,
    _organisms.EmploymentTypesFormComponent,
    _organisms.OrganizationPostFormComponent,
    _organisms.PaymentLocationFormComponent,
    _organisms.EmployesFormComponent,
    _organisms.BenefitDeductionEmployeesFormComponent,
    _template.WorkShopsFormModalComponent,
    _template.BenefitDeductionFormModalComponent,
    _template.TaxFormModalComponent,
    _template.EducationEvidencesFormModalComponent,
    _template.EducationFieldsFormModalComponent,
    _template.EmploymentTypesFormModalComponent,
    _template.OrganizationPostFormModalComponent,
    _template.PaymentLocationFormModalComponent,
    _template.EmployesFormModalComponent,
    _template.BenefitDeductionEmployeesFormModalComponent,
    _pages.WorkShopsListComponent,
    _pages.BenefitDeductionListComponent,
    _pages.TaxListComponent,
    _pages.EducationEvidencesListComponent,
    _pages.EducationFieldsListComponent,
    _pages.EmploymentTypesListComponent,
    _pages.OrganizationPostListComponent,
    _pages.PaymentLocationListComponent,
    _pages.EmployesListComponent,
    _pages.BenefitDeductionEmployeesListComponent,
    RecordsOfChangesListComponent,
  ],
})
export class BaseModule {}
