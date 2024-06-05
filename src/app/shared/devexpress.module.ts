import { NgModule } from '@angular/core';
import {
  DxBoxModule,
  DxDataGridModule,
  DxFilterBuilderModule,
  DxHtmlEditorModule,
  DxTreeViewModule,
  DxTreeListModule,
  DxDraggableModule,
  DxScrollViewModule
} from 'devextreme-angular';

@NgModule({
  imports: [
    DxTreeViewModule,
    DxDataGridModule,
    DxHtmlEditorModule,
    DxBoxModule,
    DxFilterBuilderModule,
    DxTreeListModule,
    DxDraggableModule,
    DxScrollViewModule
  ],
  exports: [
    DxTreeViewModule,
    DxDataGridModule,
    DxHtmlEditorModule,
    DxBoxModule,
    DxFilterBuilderModule,
    DxTreeListModule,
    DxDraggableModule,
    DxScrollViewModule
  ],
})
export class DevexpressModule { }
