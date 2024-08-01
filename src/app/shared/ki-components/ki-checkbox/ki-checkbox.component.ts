import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { SizeType } from "../../types/size.type";

@Component({
  selector: "ki-checkbox",
  templateUrl: "./ki-checkbox.component.html",
  styleUrls: ["./ki-checkbox.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KiCheckboxComponent),
      multi: true,
    },
  ],
})
export class KiCheckboxComponent implements OnInit {
  @ViewChild("chk") inputRef: ElementRef<HTMLInputElement>;
  @Input() value: string;
  @Input() type: "radio" | "checkbox" = "checkbox";
  @Input() name: string;
  @Input() text: string;
  @Input() checked: boolean;
  @Input() disabled: boolean;
  @Input() indeterminate?: boolean;
  @Input() size?: SizeType;
  @Input() id?: string;
  @Input() set setFocusItem(item: boolean) {
    this.setFocus();
  }
  @Output() onChangeValue: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onChange: any = () => {};
  onTouched: any = () => {};

  change(value) {
    this.onChange(value);
    this.onChangeValue.emit(value);
  }

  writeValue(value) {
    if (this.type == "checkbox") {
      this.checked = value;
    } else {
      this.checked = value == this.value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setFocus() {
    if (this.inputRef && this.inputRef.nativeElement) {
      this.inputRef.nativeElement.focus();
    }
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.checked = !this.checked;
      this.change(this.checked);
    }
  }
}
