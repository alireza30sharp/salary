import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Form } from "@angular/forms";
import { EmployeDto } from "../../../models/employee.model";
import { LoadingStateFrom } from "../../../../shared/models";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastService } from "../../../../shared/services";
import { EmployesService } from "../../../services/employes.service";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-employes-form-modal",
  templateUrl: "./employes-form-modal.component.html",
  styleUrls: ["./employes-form-modal.component.scss"],
  providers: [EmployesService],
})
export class EmployesFormModalComponent
  extends LoadingStateFrom
  implements OnInit
{
  @Input() entryId?: number;
  initialData?: EmployeDto = new EmployeDto();
  readonly submitButtonId: string = "submit-button-employes";
  isLoading?: boolean = false;
  isLoadingSaveChange?: boolean = false;
  isEditMode: boolean = false;
  constructor(
    private _activeModal: NgbActiveModal,
    private _toastService: ToastService,
    private _employesService: EmployesService
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
      this._employesService.getById(this.entryId).subscribe((res) => {
        if (res.isOk) {
          this.initialData = res.data;
        }
        this.isLoading = false;
      });
    }
  }
  saveHandler(data: EmployeDto) {
    debugger;
    this.isLoadingSaveChange = true;
    if (this.isLoadingForm) {
      //this._toastService.error('::Please_Wait_While_Executing_The_Request');
      return;
    }
    this.startLoading();
    if (this.entryId) {
      this.isLoadingSaveChange = true;
      this._employesService
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
      this._employesService
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
