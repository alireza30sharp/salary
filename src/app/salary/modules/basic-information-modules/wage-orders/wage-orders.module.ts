import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as _pages from "./pages";
import { SharedModule } from "../../../../shared/shared.module";
import { WageOrdersComponent } from "./wage-orders.component";
import { WageOrdersRoutingModule } from "./wage-orders-routing.module";
@NgModule({
  declarations: [
    WageOrdersComponent,
    _pages.WageOrdersEditComponent,
    _pages.WageOrdersAddComponent,
    _pages.WageOrdersListComponent,
  ],
  imports: [CommonModule, WageOrdersRoutingModule, SharedModule],
})
export class WageOrdersModule {}
