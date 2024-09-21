import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as _pages from "./pages";
import { SharedModule } from "../../../../shared/shared.module";
import { WorkShopsComponent } from "./work-shops.component";
import { WorkShopsRoutingModule } from "./work-shops-routing.module";
@NgModule({
  declarations: [
    WorkShopsComponent,
    _pages.WorkShopsAddComponent,
    _pages.WorkShopsEditComponent,
    _pages.WorkShopsListComponent,
  ],
  imports: [CommonModule, WorkShopsRoutingModule, SharedModule],
})
export class WorkShopsModule {}
