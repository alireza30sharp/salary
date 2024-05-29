import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { SizeType } from "../../types/size.type";
import {
  NbComponentShape,
  NbComponentSize,
  NbComponentStatus,
} from "@nebular/theme";

@Component({
  selector: "ki-textarea",
  templateUrl: "./ki-textarea.component.html",
  styleUrls: ["./ki-textarea.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KiTextareaComponent),
      multi: true,
    },
  ],
})
export class KiTextareaComponent implements OnInit {
  @Input("value") _value = "";

  @Input() id?: string;
  @Input() placeholder: string;
  @Input() disable: boolean = false;
  @Input() readonly: boolean = false;
  @Input() fieldSize: NbComponentSize = "medium";
  @Input() shape: NbComponentShape = "semi-round";
  @Input() fullWidth: boolean = false;
  @Input() status?: NbComponentStatus = "basic";
  @Input() rows?: number;
  @Input() height?: string;

  constructor() {}

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
  }

  ngOnInit() {}

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

  public onChange() {
    this.onChangeFn(this.value);
  }
}
