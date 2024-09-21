import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import * as _pages from "./pages";
import { Paths } from "../../../../shared/utilities/paths";
import { PaymentLocationComponent } from "./payment-location.component";

const routes: Routes = [
  {
    path: "",
    component: PaymentLocationComponent,
    children: [
      {
        path: Paths.PaymentLocation.list().path,
        component: _pages.PaymentLocationListComponent,
      },
      {
        path: Paths.PaymentLocation.add().path,
        component: _pages.PaymentLocationAddComponent,
      },
      {
        path: Paths.PaymentLocation.edit().path,
        component: _pages.PaymentLocationEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentLocationRoutingModule {}
