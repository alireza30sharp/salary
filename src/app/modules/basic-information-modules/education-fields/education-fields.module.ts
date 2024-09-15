import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as _pages from "./pages";
import { SharedModule } from "../../../shared/shared.module";
import { EducationFieldsComponent } from "./education-fields.component";
import { EducationFieldsRoutingModule } from "./education-fields-routing.module";
@NgModule({
  declarations: [
    EducationFieldsComponent,
    _pages.EducationFieldsAddComponent,
    _pages.EducationFieldsEditComponent,
    _pages.EducationFieldsListComponent,
  ],
  imports: [CommonModule, EducationFieldsRoutingModule, SharedModule],
})
export class EducationFieldsModule {}
