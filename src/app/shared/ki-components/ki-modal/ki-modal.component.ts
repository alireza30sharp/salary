import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ki-modal',
  templateUrl: './ki-modal.component.html',
  styleUrls: ['./ki-modal.component.scss'],
})
export class kiModalComponent implements OnInit, OnChanges {
  @Input() hideCloseIcon: boolean = false;
  @Input() showPrimaryButton: boolean = false;
  @Input() showCancelButton: boolean = false;
  @Input() showSkipButton: boolean = false;
  @Input() title: string | undefined;
  @Input() primaryButtonText: string | undefined;
  @Input() primaryButtonFor?: string;
  @Input() showPrimaryButtonLoading?: boolean;
  @Input() cancelButtonText: string | undefined;
  @Input() cancelButtonFor?: string;
  @Input() skipButtonText: string | undefined;
  @Input() skipButtonFor?: string;
  @Input() hideHeaderActions?: string;

  @Output() onPrimaryButtonCallback: EventEmitter<any> = new EventEmitter();
  @Output() onCloseCallback: EventEmitter<any> = new EventEmitter();

  headerActionsIsShow?: boolean;

  private currentAccountId?: number;

  constructor(
    private ngbActiveModel: NgbActiveModal,
    private readonly _route: ActivatedRoute
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.headerActionsIsShow =
      this.currentAccountId > 0 && !this.hideHeaderActions;
  }

  onPrimaryButtonClicked() {
    this.onPrimaryButtonCallback.emit();
  }

  closeModal(reason?: boolean) {
    this.onCloseCallback.emit(reason);
    this.ngbActiveModel.close();
  }

  addTaskHandler() {}

  addNoteHandler() {}
}
