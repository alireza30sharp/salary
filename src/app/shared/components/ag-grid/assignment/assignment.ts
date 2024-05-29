import { Component } from '@angular/core';

@Component({
  selector: 'app-ag-grid-assignment',
  templateUrl: './assignment.html',
  styleUrls: ['./assignment.scss'],
})
export class AssignmentCellRenderer {
  private params: any;

  agInit(params: any): void {
    this.params = params;
  }
  btnClickedHandler() {
    this.params.onClick(this.params.rowIndex);
  }
}
