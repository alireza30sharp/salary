import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import * as _pages from "./pages";
import { Paths } from "../../../shared/utilities/paths";
import { EducationFieldsComponent } from "./education-fields.component";

const routes: Routes = [
  {
    path: "",
    component: EducationFieldsComponent,
    children: [
      {
        path: Paths.EducationFields.list().path,
        component: _pages.EducationFieldsListComponent,
      },
      {
        path: Paths.EducationFields.add().path,
        component: _pages.EducationFieldsAddComponent,
      },
      {
        path: Paths.EducationFields.edit().path,
        component: _pages.EducationFieldsEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EducationFieldsRoutingModule {}
