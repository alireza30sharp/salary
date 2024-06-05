import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { DxTreeViewComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent {
  @ViewChild(DxTreeViewComponent) set treeView(elm: DxTreeViewComponent) {
    if (elm) {
      this._treeView = elm;
    }
  }

  @Input() dataSource: DataSource | CustomStore;
  @Input() keyExpr: string;
  @Input() itemsExpr: string;
  @Input() dataStructure: 'plain' | 'tree' = 'plain';
  @Input() itemTemplate: 'defaultTemplate' | 'dynamicTemplate' = 'defaultTemplate';
  @Input() selectionMode: 'single' | 'multiple' = 'single';
  @Input() parentIdExpr: string;
  @Input() displayExpr: string;
  @Input() searchEnabled: boolean = true;
  @Input() selectByClick: boolean = true;
  @Input() public dynamicTemplate: TemplateRef<any>;
  @Input() templateCategory: number = 0;
  @Input() set expandNodeTree(value) {
    if (value && this._treeView) {
      this.expandNode(value);
    }
  }
  @Input() set collapseAllNodesTree(value: boolean) {
    if (value) {
      this.collapseAllNodes();
    }
  }
  @Input() set reloadNodeId(id: number) {
    if (id != 0 && this._treeView) {
      this._treeView.instance.getDataSource().reload();
    }
  }

  @Output() menuItemClickEvent = new EventEmitter<any>();
  @Output() nodeSelectEvent = new EventEmitter<any>();
  recursiveSelectionEnabled = false;
  selectedRowKeys: any[] = [];
  private _treeView: DxTreeViewComponent;
  constructor() {}
  selectNode(e) {
    if (e.node.selected) {
      this.nodeSelectEvent.emit(e.itemData);
      if (this.nodeSelectEvent.observed) {
        return;
      }
    }
  }
  expandNode(key) {
    this._treeView.instance.expandItem(key);
    this._treeView.instance.selectItem(key);
    // const selectedEmployees =  this.treeView.component.getSelectedNodes()
  }
  collapseNode(key) {
    this._treeView.instance.collapseItem(key);
  }
  expandAllNodes() {
    this._treeView.instance.expandAll();
  }
  collapseAllNodes() {
    this._treeView.instance.collapseAll();
  }
}
