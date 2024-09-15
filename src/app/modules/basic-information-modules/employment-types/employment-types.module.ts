import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as _pages from "./pages";
import { SharedModule } from "../../../shared/shared.module";
import { EmploymentTypesComponent } from "./employment-types.component";
import { EmploymentTypesRoutingModule } from "./employment-types-routing.module";
@NgModule({
  declarations: [
    EmploymentTypesComponent,
    _pages.EmploymentTypesAddComponent,
    _pages.EmploymentTypesEditComponent,
    _pages.EmploymentTypesListComponent,
  ],
  imports: [CommonModule, EmploymentTypesRoutingModule, SharedModule],
})
export class EmploymentTypesModule {}
