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
    _template.WorkShopsFormModalComponent,
    _template.BenefitDeductionFormModalComponent,
    _template.TaxFormModalComponent,
    _template.EducationEvidencesFormModalComponent,
    _template.EducationFieldsFormModalComponent,
    _pages.WorkShopsListComponent,
    _pages.BenefitDeductionListComponent,
    _pages.TaxListComponent,
    _pages.EducationEvidencesListComponent,
    _pages.EducationFieldsListComponent,
  ],
})
export class BaseModule {}
