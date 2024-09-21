import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Form } from "@angular/forms";
import { WorkShopsDto } from "../../../models/work-shops.model";
import { LoadingStateFrom } from "../../../../shared/models";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastService } from "../../../../shared/services";
import { finalize } from "rxjs/operators";
import { EmploymentTypesDto } from "../../../models/employment-types.model";
import { EmploymentTypesService } from "../../../services/employment-types.service";

@Component({
  selector: "app-employment-types-form-modal",
  templateUrl: "./employment-types-form-modal.component.html",
  styleUrls: ["./employment-types-form-modal.component.scss"],
  providers: [EmploymentTypesService],
})
export class EmploymentTypesFormModalComponent
  extends LoadingStateFrom
  implements OnInit
{
  @Input() entryId?: number;
  initialData?: EmploymentTypesDto = new EmploymentTypesDto();
  readonly submitButtonId: string = "submit-button";
  isLoading?: boolean;
  isEditMode: boolean = false;
  isLoadingSaveChange?: boolean = false;

  constructor(
    private _activeModal: NgbActiveModal,
    private _toastService: ToastService,
    private _employmentTypesService: EmploymentTypesService
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
      this._employmentTypesService.getById(this.entryId).subscribe((res) => {
        if (res.isOk) {
          this.initialData = res.data;
        }
        this.isLoading = false;
      });
    }
  }
  saveHandler(data: EmploymentTypesDto) {
    this.isLoadingSaveChange = true;
    if (this.isLoadingForm) {
      //this._toastService.error('::Please_Wait_While_Executing_The_Request');
      return;
    }
    this.startLoading();
    if (this.entryId) {
      this._employmentTypesService
        .update(data as any)
        .pipe(
          finalize(() => {
            this.isLoadingSaveChange = false;
            this.finalize();
            this.cancelHandler();
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
    } else {
      this._employmentTypesService
        .create(data as any)
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
              //    this._toastService.error(err.error.messages);
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
