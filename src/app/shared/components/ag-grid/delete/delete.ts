import { Component } from '@angular/core';

@Component({
  selector: 'app-ag-grid-delete',
  templateUrl: './delete.html',
  styleUrls: ['./delete.scss'],
})
export class DeleteCellRenderer {
  private params: any;

  agInit(params: any): void {
    this.params = params;
  }
  btnClickedHandler() {
    this.params.onClick(this.params.rowIndex);
  }
}
