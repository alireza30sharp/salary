import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as _pages from "./pages";
import { SharedModule } from "../../../shared/shared.module";
import { TaxComponent } from "./tax.component";
import { TaxRoutingModule } from "./tax-routing.module";
@NgModule({
  declarations: [
    TaxComponent,
    _pages.TaxAddComponent,
    _pages.TaxEditComponent,
    _pages.TaxListComponent,
  ],
  imports: [CommonModule, TaxRoutingModule, SharedModule],
})
export class TaxModule {}
