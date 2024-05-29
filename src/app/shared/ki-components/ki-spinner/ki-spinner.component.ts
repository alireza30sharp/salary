import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ki-spinner',
  templateUrl: './ki-spinner.component.html',
  styleUrls: ['./ki-spinner.component.scss'],
})
export class KiSpinnerComponent {
  @Input() color:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark' = 'light';
  @Input() margin: string = '';
  @Input() size: 'small' | 'default' = 'default';
  @Input() buttonMode: boolean;
  @Input() matchParent: boolean;

  constructor() {}
}
