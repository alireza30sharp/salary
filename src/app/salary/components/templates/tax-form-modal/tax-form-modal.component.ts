import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Form } from "@angular/forms";
import { LoadingStateFrom } from "../../../../shared/models";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastService } from "../../../../shared/services";
import { finalize } from "rxjs/operators";
import { TaxDto } from "../../../models/tax.model";
import { TaxService } from "../../../services/tax.service";

@Component({
  selector: "app-tax-form-modal",
  templateUrl: "./tax-form-modal.component.html",
  styleUrls: ["./tax-form-modal.component.scss"],
  providers: [TaxService],
})
export class TaxFormModalComponent extends LoadingStateFrom implements OnInit {
  @Input() entryId?: number;
  initialData?: TaxDto = new TaxDto();
  readonly submitButtonId: string = "submit-button";
  isLoading?: boolean;
  isEditMode: boolean = false;
  isLoadingSaveChange?: boolean = false;
  constructor(
    private _activeModal: NgbActiveModal,
    private _toastService: ToastService,
    private _taxService: TaxService
  ) {
    super();
  }
  ngOnInit(): void {
    this.isEditMode = !!this.entryId;
    this._getInitialData();
  }

  private _getInitialData() {
    if (this.isEditMode) {
      this._taxService.getById(this.entryId).subscribe((res) => {
        if (res.isOk) {
          this.initialData = res.data;
        }
        this.isLoading = false;
      });
    }
  }
  saveHandler(data: TaxDto) {
    this.isLoadingSaveChange = true;
    if (this.isLoadingForm) {
      //this._toastService.error('::Please_Wait_While_Executing_The_Request');
      return;
    }
    this.startLoading();
    if (this.entryId) {
      this.isLoadingSaveChange = true;
      this._taxService
        .update(data as any)
        .pipe(
          finalize(() => {
            this.isLoadingSaveChange = false;
            this.finalize();
          })
        )
        .subscribe({
          next: (res) => {
            if (res.isOk) {
              this._toastService.success(res.data.message);
              this.cancelHandler();
            }
          },
          error: (err) => {
            let msg = "";
            if (err.error.messages) {
              this._toastService.error(err.error.messages);
              msg = err.error.messages.join(" ");
            } else if (err.error.message) {
              this._toastService.error(err.error.message);
              msg = err.error.message.join(" ");
            }
          },
        });
    } else {
      this._taxService
        .createTax(data as any)
        .pipe(
          finalize(() => {
            this.isLoadingSaveChange = false;
            this.finalize();
          })
        )
        .subscribe({
          next: (res) => {
            if (res.isOk) {
              this._toastService.success(res.data.message);
            }
          },
          error: (err) => {
            let msg = "";
            if (err.error.messages) {
              this._toastService.error(err.error.messages);
              msg = err.error.messages.join(" ");
            } else if (err.error.message) {
              this._toastService.error(err.error.message);
              msg = err.error.message.join(" ");
            }
          },
        });
    }
  }
  cancelHandler() {
    this._activeModal.close(false);
  }
}
