import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmType } from './confirm.interface';

@Component({
  selector: 'ki-confirmation',
  templateUrl: './ki-confirmation.component.html',
  styleUrls: ['./ki-confirmation.component.scss'],
})
export class KiConfirmationComponent {
  @Input() title: string;
  @Input() description: string;
  @Input() acceptText?: string;
  @Input() declineText?: string;
  @Input() type: ConfirmType = 'Confirm';

  constructor(private activeModal: NgbActiveModal) {}

  onClick(value: boolean) {
    this.activeModal.close(value);
  }
}
