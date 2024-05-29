import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Form } from "@angular/forms";
import { WorkShopsDto } from "../../../models/work-shops.model";
import { LoadingStateFrom } from "../../../../shared/models";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastService } from "../../../../shared/services";
import { finalize } from "rxjs/operators";
import { EducationEvidencesDto } from "../../../models/education-evidences.model";
import { EducationEvidencesService } from "../../../services/education-evidences.service";

@Component({
  selector: "app-educatio-evidences-form-modal",
  templateUrl: "./educatio-evidences-form-modal.component.html",
  styleUrls: ["./educatio-evidences-form-modal.component.scss"],
  providers: [EducationEvidencesService],
})
export class EducationEvidencesFormModalComponent
  extends LoadingStateFrom
  implements OnInit
{
  @Input() entryId?: number;
  initialData?: EducationEvidencesDto = new EducationEvidencesDto();
  readonly submitButtonId: string = "submit-button";
  isLoading?: boolean;
  isResetForm?: boolean;
  isEditMode: boolean = false;
  isLoadingSaveChange?: boolean = false;

  constructor(
    private _activeModal: NgbActiveModal,
    private _toastService: ToastService,
    private _educationEvidencesService: EducationEvidencesService
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
      this._educationEvidencesService.getById(this.entryId).subscribe((res) => {
        if (res.isOk) {
          this.initialData = res.data;
        }
        this.isLoading = false;
      });
    }
  }
  saveHandler(data: EducationEvidencesDto) {
    this.isResetForm = Object.assign(false, false);
    this.isLoadingSaveChange = true;
    if (this.isLoadingForm) {
      //this._toastService.error('::Please_Wait_While_Executing_The_Request');
      return;
    }
    this.startLoading();
    if (this.entryId) {
      this._educationEvidencesService
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
              this.isResetForm = true;
              this._toastService.success(res.data.message);
            }
          },
          error: (err) => {
            this.isResetForm = false;
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
      this._educationEvidencesService
        .createEducationEvidences(data as any)
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
