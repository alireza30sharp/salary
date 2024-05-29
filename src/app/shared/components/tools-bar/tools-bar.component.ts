import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { Router } from "@angular/router";
import { NbComponentSize } from "@nebular/theme";
@Component({
  selector: "app-tools-bar",
  templateUrl: "./tools-bar.component.html",
  styleUrls: ["./tools-bar.component.scss"],
})
export class ToolsBarComponent implements OnInit {
  @Output() NewSelected: EventEmitter<void> = new EventEmitter();
  @Output() EditSelected: EventEmitter<void> = new EventEmitter();
  @Output() DeleteSelected: EventEmitter<void> = new EventEmitter();
  @Output() PerintSelected: EventEmitter<void> = new EventEmitter();
  @Output() RefrashSelected: EventEmitter<void> = new EventEmitter();
  @Input() disabled: boolean = false;
  @Input() sizeBtn?: NbComponentSize = "medium";
  @Input() isShowLoadingDelete?: boolean = false;
  @Input() isShowLoadingRefrash?: boolean = false;
  constructor() {}

  addEvent() {
    this.NewSelected.emit();
  }

  // متد ویرایش
  editEvent() {
    // if (!this.disabled) {
    this.EditSelected.emit();
    //  }
  }

  // متد حذف
  deleteEvent() {
    // if (!this.disabled) {
    this.DeleteSelected.emit();
    //}
  }
  escapeEvent() {
    alert("Escape");
  }
  refrashEvent() {
    this.RefrashSelected.emit();
  }
  perintEvent() {
    this.PerintSelected.emit();
  }
  ngOnInit(): void {}

  @HostListener("document:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.code === "F5") {
      event.stopPropagation();
      event.preventDefault();
      this.refrashEvent();
    }
    if (event.code === "F3") {
      event.stopPropagation();
      event.preventDefault();
      this.editEvent();
    }
    if (event.code === "F2") {
      event.stopPropagation();
      event.preventDefault();
      this.addEvent();
    }
    if (event.key === "Escape") {
      this.escapeEvent();
    }
    if ((event.shiftKey && event.code === "KeyP") || event.code === "KeyP") {
      event.stopPropagation();
      event.preventDefault();
      this.perintEvent();
    }
    // حذف: Ctrl  + D
    if (event.ctrlKey && event.code === "KeyD") {
      event.stopPropagation();
      event.preventDefault();
      this.deleteEvent();
    }
  }
}
