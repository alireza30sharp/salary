import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationPackageDto } from '@proxy/dtos/navigation-action-package';
@Component({
  selector: 'app-navigation-action-buttons-form',
  templateUrl: './navigation-action-buttons-form.component.html',
  styleUrls: ['./navigation-action-buttons-form.component.scss'],
})
export class NavigationActionButtonsFormComponent {
  @Input() model?: NavigationPackageDto = {
    hideForAdmin: false,
  };
  @Input() readonly?: boolean;
  @Input() submitButtonId?: string = 'navigation-submit-button-id';
  @Input() showLoading?: boolean;
  @Output() submitEvent = new EventEmitter<NavigationPackageDto>();
  columnClassNumber?: number = 6;
  constructor() {}

  submitHandler(form: NgForm) {
    this.submitEvent.emit(this.model);
  }
}
