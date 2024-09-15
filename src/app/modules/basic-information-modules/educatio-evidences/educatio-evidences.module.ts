import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as _pages from "./pages";
import { SharedModule } from "../../../shared/shared.module";
import { EducationEvidencesComponent } from "./educatio-evidences.component";
import { EducationEvidencesRoutingModule } from "./educatio-evidences-routing.module";
@NgModule({
  declarations: [
    EducationEvidencesComponent,
    _pages.EducationEvidencesAddComponent,
    _pages.EducationEvidencesEditComponent,
    _pages.EducationEvidencesListComponent,
  ],
  imports: [CommonModule, EducationEvidencesRoutingModule, SharedModule],
})
export class EducationEvidencesModule {}
