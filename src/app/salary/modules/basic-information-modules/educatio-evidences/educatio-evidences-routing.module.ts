import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import * as _pages from "./pages";
import { Paths } from "../../../../shared/utilities/paths";
import { EducationEvidencesComponent } from "./educatio-evidences.component";

const routes: Routes = [
  {
    path: "",
    component: EducationEvidencesComponent,
    children: [
      {
        path: Paths.EducationEvidences.list().path,
        component: _pages.EducationEvidencesListComponent,
      },
      {
        path: Paths.EducationEvidences.add().path,
        component: _pages.EducationEvidencesAddComponent,
      },
      {
        path: Paths.EducationEvidences.edit().path,
        component: _pages.EducationEvidencesEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EducationEvidencesRoutingModule {}
