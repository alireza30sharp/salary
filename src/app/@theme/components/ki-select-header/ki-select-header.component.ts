import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { propertyOf } from "../../utilities/property-of";
import { SelectOptionInterface } from "../../interfaces/select-option.interface";
import { SizeType } from "../../types/size.type";

@Component({
  selector: "ki-select-header",
  templateUrl: "./ki-select-header.component.html",
  styleUrls: ["./ki-select-header.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => kiSelectHeaderComponent),
      multi: true,
    },
  ],
})
export class kiSelectHeaderComponent implements ControlValueAccessor {
  @Input() options: Array<any>;
  @Input() _value: any;
  @Input() placeholder: string;
  @Input() bindLabel: string = propertyOf<SelectOptionInterface>("label");
  @Input() bindValue: string = propertyOf<SelectOptionInterface>("value");
  @Input() readonly: string;
  @Input() disabled: boolean;
  @Input() allowClear: boolean = false;
  @Input() multiple: boolean = false;
  @Input() dropDownPosition: "bottom" | "top" | "auto" = "auto";
  @Input() size?: SizeType;
  @Input() state?: "error" | "success";
  @Input() id?: string;
  @Input() isloading?: boolean = false;
  @Input() allowHighlight?: boolean = false;
  @Output() onChangeCalback: EventEmitter<any> = new EventEmitter();

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChangeFn(val);
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
    this.value = obj === null ? null : obj;
  }

  public onChange() {
    this.onChangeFn(this.value);
  }

  change(val) {
    if (this.multiple) {
      let tempValue = [];
      val.forEach((el) => tempValue.push(el[this.bindValue]));
      this.value = tempValue;
    } /*else {
      this.value = val[this.bindValue];
    }*/
    this.onChangeCalback.emit(this.value);
  }

  openHandler() {
    setTimeout(() => {
      const classNames: string[] = [];

      if (this.state) {
        classNames.push("ng-dropdown-panel--" + this.state);
      }

      if (this.size) {
        classNames.push("ng-dropdown-panel--" + this.size);
      }

      if (!classNames.length) return;

      const panel = document.querySelector(".ng-dropdown-panel");
      if (!panel) return;
      classNames.forEach((className) => {
        panel.classList.add(className);
      });
    }, 0);
  }
}
