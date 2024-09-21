import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as _pages from "./pages";
import { SharedModule } from "../../../shared/shared.module";
import { SystemOperationComponent } from "./system-operation.component";
import { SystemOperationRoutingModule } from "./system-operation-routing.module";
@NgModule({
  declarations: [SystemOperationComponent, _pages.ListComponent],
  imports: [CommonModule, SystemOperationRoutingModule, SharedModule],
})
export class SystemOperationModule {}
