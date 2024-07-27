import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  constructor(private toaster: ToastrService) {}
  success(message: string, title?: string) {
    this.toaster.success(message, title);
  }
  error(message: string, title?: string) {
    this.toaster.error(message, title);
  }
  info(message: string, title?: string) {
    this.toaster.info(message, title);
  }
}
