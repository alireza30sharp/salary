import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as _pages from "./pages";
import { SharedModule } from "../../../shared/shared.module";
import { ExemptionTypesComponent } from "./exemption-types.component";
import { ExemptionTypesRoutingModule } from "./exemption-types-routing.module";
@NgModule({
  declarations: [
    ExemptionTypesComponent,
    _pages.ExemptionTypesAddComponent,
    _pages.ExemptionTypesEditComponent,
    _pages.ExemptionTypesListComponent,
  ],
  imports: [CommonModule, ExemptionTypesRoutingModule, SharedModule],
})
export class ExemptionTypesModule {}
