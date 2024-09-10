import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import * as _pages from "./pages";
import { Paths } from "../../shared/utilities/paths";
import { AdvanceComponent } from "./advance.component";

const routes: Routes = [
  {
    //مشخص می کنیم برای هر اکشن کدام کامپوننت لود بشه
    path: "",
    component: AdvanceComponent,
    children: [
      { path: "", redirectTo: "list", pathMatch: "full" },
      {
        path: Paths.advance.list().path,
        component: _pages.AdvanceListComponent,
      },
      {
        path: Paths.advance.add().path,
        component: _pages.advanceAddComponent,
      },
      {
        path: Paths.advance.edit().path,
        component: _pages.AdvanceEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvanceRoutingModule {}
