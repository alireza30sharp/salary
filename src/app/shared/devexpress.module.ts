import { NgModule } from "@angular/core";
import { DxTreeViewModule, DxTreeListModule } from "devextreme-angular";

@NgModule({
  imports: [DxTreeViewModule, DxTreeListModule],
  exports: [DxTreeViewModule, DxTreeListModule],
})
export class DevexpressModule {}
