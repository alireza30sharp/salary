import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as _pages from "./pages";
import { SharedModule } from "../../../shared/shared.module";
import { InsuranceTypeComponent } from "./Insurance-type.component";
import { InsuranceTypeRoutingModule } from "./Insurance-type-routing.module";
@NgModule({
  declarations: [
    InsuranceTypeComponent,
    _pages.InsuranceTypeEditComponent,
    _pages.InsuranceTypeAddComponent,
    _pages.InsuranceTypeListComponent,
  ],
  imports: [CommonModule, InsuranceTypeRoutingModule, SharedModule],
})
export class InsuranceTypeModule {}
