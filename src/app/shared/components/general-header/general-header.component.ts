import { Location } from '@angular/common';
import { Component, EventEmitter, Input, Output, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-general-header',
  templateUrl: './general-header.component.html',
  styleUrls: ['./general-header.component.scss'],
})
export class GeneralHeaderComponent {
  @Input() title: string;
  @Input() subtitle?: string;
  @Input() hideBackButton?: boolean;
  @Input() backButtonTooltip?: boolean;

  @Output() backCallback = new EventEmitter<Event>();

  @ContentChild('icon', { static: false })
  icon?: TemplateRef<any>;

  constructor(private readonly _location: Location) {}

  backHandler(e: Event) {
    if (this.backCallback.observed) {
      this.backCallback.emit(e);
    } else {
      this._location.back();
    }
  }
}
