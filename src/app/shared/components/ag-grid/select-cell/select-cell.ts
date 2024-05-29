import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-ag-grid-select-cell',
  templateUrl: './select-cell.html',
  styleUrls: ['./select-cell.scss'],
})
export class SelectCellRenderer {
  params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  refresh() {
    return false;
  }
}
