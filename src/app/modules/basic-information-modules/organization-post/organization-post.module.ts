import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as _pages from "./pages";
import { SharedModule } from "../../../shared/shared.module";
import { OrganizationPostComponent } from "./organization-post.component";
import { OrganizationPostRoutingModule } from "./organization-post-routing.module";
import { OrganizationPostListComponent } from "./pages";
@NgModule({
  declarations: [
    OrganizationPostComponent,
    _pages.OrganizationPostAddComponent,
    _pages.OrganizationPostEditComponent,
    OrganizationPostListComponent,
  ],
  imports: [CommonModule, OrganizationPostRoutingModule, SharedModule],
})
export class OrganizationPostModule {}
