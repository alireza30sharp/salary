import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ki-validation',
  templateUrl: './ki-validation.component.html',
  styleUrls: ['./ki-validation.component.scss'],
})
export class KiValidationComponent implements OnInit {
  @Input() hide: boolean = true;
  @Input() message: string;
  constructor() {}

  ngOnInit(): void {}
}
