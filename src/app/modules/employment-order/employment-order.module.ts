import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as _pages from "./pages";
import { SharedModule } from "../../shared/shared.module";
import { EmploymentOrderComponent } from "./employment-order.component";
import { EmploymentOrderRoutingModule } from "./employment-order-routing.module";
@NgModule({
  declarations: [
    EmploymentOrderComponent,
    _pages.EmploymentOrderAddComponent,
    _pages.EmploymentOrderEditComponent,
    _pages.EmploymentOrderListComponent,
  ],
  imports: [CommonModule, EmploymentOrderRoutingModule, SharedModule],
})
export class EmploymentOrderModule {}
