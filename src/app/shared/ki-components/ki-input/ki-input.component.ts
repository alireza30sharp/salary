import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgModel,
  ValidationErrors,
} from "@angular/forms";
import ValidatorsHelper from "../../helpers/validators.helper";
import {
  NbComponentOrCustomStatus,
  NbComponentShape,
  NbComponentSize,
  NbComponentStatus,
} from "@nebular/theme";
import { TaxRate } from "../../../base/models/rul";
type InputType =
  | "password"
  | "number"
  | "text"
  | "email"
  | "phone"
  | "tel"
  | "rate"
  | "currency"
  | "fax"
  | "file";

export interface KiInputComponentInterface {
  type?: InputType;
  min?: number;
  max?: number;
  step?: string;
  onlyNumber?: boolean;
  maskType?: "separator" | "percent" | (string & {});
  maskDecimalDigit?: number;
  maskThousandSeparator?: string;
  maskPrefix?: string;
  maskAllowNegativeNumbers?: boolean;
  readonly?: boolean;
}
@Component({
  selector: "ki-input",
  templateUrl: "./ki-input.component.html",
  styleUrls: ["./ki-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KiInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => KiInputComponent),
      multi: true,
    },
  ],
})
export class KiInputComponent
  implements ControlValueAccessor, OnChanges, KiInputComponentInterface
{
  @Input() _value = "";
  @Input() id?: string;
  @Input() placeholder: string;
  @Input() type: InputType = "text";
  @Input() min?: number;
  @Input() fullWidth: boolean = false;
  @Input() max?: number;
  @Input() step?: string;
  @Input() fieldSize: NbComponentSize = "medium";
  @Input() shape: NbComponentShape = "semi-round";
  @Input() onlyNumber: boolean = false;
  @Input() disable: boolean = false;
  @Input() readonly: boolean;
  @Input() accept: string;
  @Input() fromMoney: NgModel;
  @Input() set setFocusItem(item: boolean) {
    if (item) {
      this.setFocus();
    }
  }

  _status?: NbComponentStatus = "basic";
  _statusFirst;
  @Input() set status(state: NbComponentStatus) {
    this._status = state;
    this._statusFirst = state;
  }
  @Input() startIconClassName?: string;
  @Input() endIconClassName?: string;
  @Input() template?: any;
  @Input() maskType?: "separator" | "percent" | (string & {});
  @Input() maskDecimalDigit?: number = 2;
  @Input() maskThousandSeparator?: string = ",";
  @Input() maskPrefix?: string = "";
  @Input() maskAllowNegativeNumbers?: boolean = true;
  @Input() sepLimitation: string = "999999999999999";
  @Output() onFileSelectedCallback: EventEmitter<File> = new EventEmitter();
  @Output() onEnterCallback: EventEmitter<string> = new EventEmitter();
  @Output() onChangeCallback: EventEmitter<any> = new EventEmitter();
  @Output() keydownCallback = new EventEmitter<KeyboardEvent>();
  @Output() focusCallback = new EventEmitter<Event>();
  @ViewChild("inputRef") inputRef: ElementRef<HTMLInputElement>;

  mask?: string;

  private _phonelengthMin = 1;
  private _phonelengthMax = 11;
  constructor() {}

  get value() {
    return this._value;
  }

  set value(val) {
    if (val !== this._value) {
      this._value = val;
      this.onChangeFn(val);
      this.validate();
      this.onChangeCallback.emit(this.value);
    }
    this.onTouchedFn();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["maskType"]) {
      if (this.maskType === "time") {
        this.mask = "00:00"; // ماسک برای فرمت زمان
      } else if (this.maskType === "separator" || this.maskType === "percent") {
        this.mask =
          this.maskType +
          (this.maskDecimalDigit ? "." + this.maskDecimalDigit : "");
      } else {
        this.mask = this.maskType;
      }
    }
  }
  validate(): ValidationErrors {
    let isInvalid = true;
    this.min = null;
    this.max = null;
    switch (this.type) {
      case "email":
        isInvalid = !ValidatorsHelper.isEmailValid(this._value);
        if (isInvalid) {
          this._status = "danger";
        } else {
          this._status = this._statusFirst;
        }
        return isInvalid ? { isInvalid: isInvalid } : null;
        break;
      case "fax":
        this.min = this._phonelengthMin;
        this.max = this._phonelengthMax;

        isInvalid = !ValidatorsHelper.isFaxValid(this._value);
        return isInvalid ? { isInvalid: isInvalid } : null;
        break;
      case "phone":
        this.min = this._phonelengthMin;
        this.max = this._phonelengthMax;

        isInvalid = !ValidatorsHelper.isPhoneValid(this._value);
        return isInvalid ? { isInvalid: isInvalid } : null;
        break;
      case "tel":
        this.min = this._phonelengthMin;
        this.max = this._phonelengthMax;

        isInvalid = !ValidatorsHelper.isphonetelValid(this._value);
        return isInvalid ? { isInvalid: isInvalid } : null;
        break;
      case "rate":
        if (+this._value > TaxRate) {
          return { isRate: true };
        }
        break;
      case "currency":
        let from = this.fromMoney?.model
          ? this.fromMoney?.model
          : this.fromMoney;
        if (from && +this._value < +from) {
          return { isCurrency: true };
        }
        break;
      default:
        isInvalid = this._value && this.min && this._value.length < this.min;
        return isInvalid ? { minLength: isInvalid } : null;
        break;
    }
  }

  public onChangeFn = (_: any) => {};

  public onTouchedFn = () => {};

  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  public writeValue(obj: any): void {
    this.value = obj;
  }

  public onChange(event) {
    if (event.data !== undefined) {
      this.onChangeCallback.emit(this.value);
    }

    this.onChangeFn(this.value);
  }

  numberOnly(event: any): boolean {
    if (!this.onlyNumber) return true;
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
      return false;
    }
    return true;
  }

  onEnter(e) {
    this.onEnterCallback.emit(e);
  }

  keydownHandler(event: KeyboardEvent) {
    if (
      this.type === "currency" &&
      (this.value != "" || +this.value != 0) &&
      event.key === " "
    ) {
      event.preventDefault();
      this.value = this.value + "000";
    }
    this.keydownCallback.emit(event);
  }

  focusHandler(event: Event) {
    this.focusCallback.emit(event);
  }

  setFocus() {
    if (this.inputRef && this.inputRef.nativeElement) {
      this.inputRef.nativeElement.focus();
    }
  }
}
