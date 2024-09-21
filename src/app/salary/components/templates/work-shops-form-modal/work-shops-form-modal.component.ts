import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Form } from "@angular/forms";
import { WorkShopsDto } from "../../../models/work-shops.model";
import { LoadingStateFrom } from "../../../../shared/models";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastService } from "../../../../shared/services";
import { WorkShopsService } from "../../../services/work-shops.service";
import { finalize } from "rxjs/operators";
import { ChangeWorkShopsService } from "../../../../services/change-work-shop.service";

@Component({
  selector: "app-work-shops-form-modal",
  templateUrl: "./work-shops-form-modal.component.html",
  styleUrls: ["./work-shops-form-modal.component.scss"],
  providers: [WorkShopsService],
})
export class WorkShopsFormModalComponent
  extends LoadingStateFrom
  implements OnInit
{
  @Input() entryId?: number;
  initialData?: WorkShopsDto = new WorkShopsDto();
  readonly submitButtonId: string = "submit-button";
  isLoading?: boolean = false;
  isLoadingSaveChange?: boolean = false;
  isEditMode: boolean = false;
  constructor(
    private _activeModal: NgbActiveModal,
    private _toastService: ToastService,
    private _workShopsService: WorkShopsService,
    private _changeWorkShops: ChangeWorkShopsService
  ) {
    super();
  }
  ngOnInit(): void {
    this.isEditMode = !!this.entryId;
    this._getInitialData();
  }

  private _getInitialData() {
    if (this.isEditMode) {
      this.isLoading = true;
      this._workShopsService.getWorkShopById(this.entryId).subscribe((res) => {
        if (res.isOk) {
          this.initialData = res.data;
        }
        this.isLoading = false;
      });
    }
  }
  saveHandler(data: WorkShopsDto) {
    this.isLoadingSaveChange = true;
    if (this.isLoadingForm) {
      //this._toastService.error('::Please_Wait_While_Executing_The_Request');
      return;
    }
    this.startLoading();
    if (this.entryId) {
      this.isLoadingSaveChange = true;
      this._workShopsService
        .updateWorkShop(data as any)
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
              this._changeWorkShops.WorkShopsSource$.next(
                res.data.workerShopName
              );
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
      this._workShopsService
        .createWorkShops(data as any)
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
