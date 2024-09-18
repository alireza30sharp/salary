import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as _pages from "./pages";
import { SharedModule } from "../../../shared/shared.module";
import { EmployesComponent } from "./employes.component";
import { EmployesRoutingModule } from "./employes-routing.module";
@NgModule({
  declarations: [
    EmployesComponent,
    _pages.EmployesAddComponent,
    _pages.EmployesEditComponent,
    _pages.EmployesListComponent,
  ],
  imports: [CommonModule, EmployesRoutingModule, SharedModule],
})
export class EmployesModule {}
