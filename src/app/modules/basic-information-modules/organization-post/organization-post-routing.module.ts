import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import * as _pages from "./pages";
import { Paths } from "../../../shared/utilities/paths";
import { OrganizationPostComponent } from "./organization-post.component";

const routes: Routes = [
  {
    path: "",
    component: OrganizationPostComponent,
    children: [
      {
        path: Paths.OrganizationPost.list().path,
        component: _pages.OrganizationPostListComponent,
      },
      {
        path: Paths.OrganizationPost.add().path,
        component: _pages.OrganizationPostAddComponent,
      },
      {
        path: Paths.OrganizationPost.edit().path,
        component: _pages.OrganizationPostEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationPostRoutingModule {}
