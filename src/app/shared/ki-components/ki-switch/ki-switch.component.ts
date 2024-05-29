import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { SizeType } from "../../types/size.type";

@Component({
  selector: "ki-switch",
  templateUrl: "./ki-switch.component.html",
  styleUrls: ["./ki-switch.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KiSwitchComponent),
      multi: true,
    },
  ],
})
export class KiSwitchComponent implements OnInit, ControlValueAccessor {
  @Input() value: string;
  @Input() name: string;
  @Input() text: string;
  @Input() checked: boolean;
  @Input() disabled: boolean;
  @Input() size?: SizeType;
  @Input() id?: string;

  @Output() changeCallback: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onChangeFn = (_: any) => {};
  onTouchedFn = () => {};

  change(value: boolean) {
    this.onChangeFn(value);
    this.changeCallback.emit(value);
  }

  writeValue(value: boolean) {
    this.checked = value;
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }
}
