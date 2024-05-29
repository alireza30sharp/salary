import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from "@angular/forms";
import { NgbCalendar, NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { SizeType } from "../../types/size.type";

@Component({
  selector: "ki-date-picker",
  templateUrl: "./ki-date-picker.component.html",
  styleUrls: ["./ki-date-picker.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KiDatePickerComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => KiDatePickerComponent),
      multi: true,
    },
  ],
})
export class KiDatePickerComponent implements OnInit, ControlValueAccessor {
  @Input() id?: string;
  @Input() disabled: boolean = false;
  @Input() disableFooter: boolean = true;
  @Input() hideDatepickerIcon: boolean = false;
  @Input() placement?: "top" | "bottom" | "left" | "right" | "auto" = "auto";
  @Input() state?: "error" | "success" | "";
  @Input() size?: SizeType;
  @Input() readonly?: string;
  @Input() placeholder?: string;
  @Input() minDate = { year: 1940, month: 1, day: 1 };
  @Input() maxDate = { year: 2100, month: 1, day: 1 };

  @Output() onDateSelectCallback: EventEmitter<any> = new EventEmitter();

  constructor(private calendar: NgbCalendar) {}

  ngOnInit(): void {}

  onChanged: any = () => {};
  onTouched: any = () => {};
  onValidationChange: any = () => {};

  @Input("value") _value: NgbDate;

  get value() {
    return this._value;
  }

  set value(value: any) {
    this._value = value;

    this.onChanged(this._value);
    this.onValidationChange();
  }

  writeValue(obj: any): void {
    this.value = obj || null;
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  isValidDate(s) {
    const enteredDate = new Date(s);
    const minDate = new Date(
      this.minDate.year,
      this.minDate.month - 1,
      this.minDate.day
    );
    const maxDate = new Date(
      this.maxDate.year,
      this.maxDate.month - 1,
      this.maxDate.day
    );

    let validDateRange = enteredDate >= minDate && enteredDate <= maxDate;

    // date valid 2023/01/1 OR 2023/10/02
    // date valid 2023-01-1 OR 2023-10-02
    let dateRegSlash = /^\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$/;
    let dateRegeDash = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
    if ((dateRegSlash.test(s) || dateRegeDash.test(s)) && validDateRange) {
      return true;
    } else {
      return false;
    }
  }
  validate(control: AbstractControl): ValidationErrors {
    let isInvalid = true;
    if (typeof this._value === "string") {
      isInvalid = !this.isValidDate(this._value);
    } else {
      isInvalid = this._value && !this.calendar.isValid(this._value);
    }
    isInvalid ? (this.state = "error") : (this.state = "");
    return isInvalid ? { invalidDate: isInvalid } : null;
  }
  registerOnValidatorChange?(fn: () => void): void {
    this.onValidationChange = fn;
  }

  update($event) {
    this.onDateChanged($event);
  }

  selectToday(e) {
    e.close();
    this.value = this.calendar.getToday();
    this.onDateChanged(this.value);
  }

  reset(e) {
    e.close();
    this.value = null;
    this.onDateChanged(this.value);
  }

  onDateChanged(date) {
    if (typeof date === "string") {
      if (this.isValidDate(date)) {
        let dateTemp = new Date(date);
        date = {
          day: dateTemp.getDate(),
          month: dateTemp.getMonth() + 1,
          year: dateTemp.getFullYear(),
        };
        this.onChanged(date);
        this.onDateSelectCallback.emit(date);
      }
    } else {
      this.onChanged(date);
      this.onDateSelectCallback.emit(date);
    }
  }
}
