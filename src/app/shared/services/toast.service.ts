import { Injectable } from "@angular/core";
import { NbToastrService } from "@nebular/theme";
@Injectable({
  providedIn: "root",
})
export class ToastService {
  constructor(private toaster: NbToastrService) {}
  success(message: string, title?: string) {
    this.toaster.success(message, title);
  }
  error(message: string, title?: string) {
    this.toaster.danger(message, title);
  }
  info(message: string, title?: string) {
    this.toaster.info(message, title);
  }
}
