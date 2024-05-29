import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ki-form-group',
  templateUrl: './ki-form-group.component.html',
  styleUrls: ['./ki-form-group.component.scss'],
})
export class KiFormGroupComponent implements OnInit {
  @Input() for: string;
  @Input() label: string;
  @Input() labelColNumber: number;
  @Input() showRequireSign: boolean;
  @Input() alignCenter?: boolean;
  @Input() hideError?: boolean;
  @Input() errorMessage?: string;
  @Input() noBottomDistance?: boolean;
  @Input() removeLabel?: boolean;

  constructor() {}

  ngOnInit() {}
}
