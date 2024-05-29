import {
  Component,
  QueryList,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import {
  NgbCalendar,
  NgbDate,
  NgbDateStruct,
  NgbInputDatepickerConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { ICellEditorAngularComp } from 'ag-grid-angular';
@Component({
  selector: 'app-ag-grid-date-select',
  templateUrl: './date-select.html',
  styleUrls: ['./date-select.scss'],
  providers: [NgbInputDatepickerConfig],
})
export class DateSelectCellRenderer implements ICellEditorAngularComp {
  private params: any;
  inputDate: Date;
  @ViewChildren('input', { read: ViewContainerRef })
  public inputs: QueryList<any>;
  private focusedInput: number = 0;

  agInit(params: any): void {
    this.params = params;
    this.inputDate = this.params.value;
  }

  ngAfterViewInit() {
    this.focusOnInputNextTick(this.inputs.first);
  }

  private focusOnInputNextTick(input: ViewContainerRef) {
    window.setTimeout(() => {
      if (input && input.element) {
        input.element.nativeElement.focus();
      }
    }, 0);
  }

  getValue() {
    return this.inputDate;
  }

  isPopup(): boolean {
    return true;
  }

  onKeyDown(event): void {
    let key = event.which || event.keyCode;
    if (key == 9) {
      this.preventDefaultAndPropagation(event);
      this.focusedInput =
        this.focusedInput === this.inputs.length - 1
          ? 0
          : this.focusedInput + 1;

      let focusedInput = this.focusedInput;
      let inputToFocusOn = this.inputs.find((item: any, index: number) => {
        return index === focusedInput;
      });

      this.focusOnInputNextTick(inputToFocusOn);
    } else if (key == 13) {
      this.inputs.forEach((input) => {
        if (!input.element.nativeElement.value) {
          this.preventDefaultAndPropagation(event);
          this.focusOnInputNextTick(input);
        }
      });
    }
  }

  private preventDefaultAndPropagation(event) {
    event.preventDefault();
    event.stopPropagation();
  }
}
