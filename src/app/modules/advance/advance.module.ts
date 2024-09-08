import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as _pages from "./pages";
import { SharedModule } from "../../shared/shared.module";
import { AdvanceComponent } from "./advance.component";
import { AdvanceRoutingModule } from "./advance-routing.module";

@NgModule({
  declarations: [
    AdvanceComponent,
    _pages.advanceAddComponent,
    _pages.AdvanceEditComponent,
    _pages.AdvanceListComponent,
  ],
  imports: [CommonModule, AdvanceRoutingModule, SharedModule],
})
export class AdvanceModule {}
