import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as _pages from "./pages";
import { SharedModule } from "../../../../shared/shared.module";
import { PaymentLocationComponent } from "./payment-location.component";
import { PaymentLocationRoutingModule } from "./payment-location-routing.module";
@NgModule({
  declarations: [
    PaymentLocationComponent,
    _pages.PaymentLocationAddComponent,
    _pages.PaymentLocationEditComponent,
    _pages.PaymentLocationListComponent,
  ],
  imports: [CommonModule, PaymentLocationRoutingModule, SharedModule],
})
export class PaymentLocationModule {}
