import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Form } from "@angular/forms";
import { LoadingStateFrom } from "../../../../shared/models";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastService } from "../../../../shared/services";
import { finalize } from "rxjs/operators";
import { BenefitDeductionDto } from "../../../models/benefit-deduction.model";
import { BenefitDeductionService } from "../../../services/benefit-deduction.service";

@Component({
  selector: "app-benefit-deduction-form-modal",
  templateUrl: "./benefit-deduction-form-modal.component.html",
  styleUrls: ["./benefit-deduction-form-modal.component.scss"],
  providers: [BenefitDeductionService],
})
export class BenefitDeductionFormModalComponent
  extends LoadingStateFrom
  implements OnInit
{
  @Input() entryId?: number;
  initialData?: BenefitDeductionDto = new BenefitDeductionDto();
  readonly submitButtonId: string = "submit-button-benefit-deduction";
  isLoading?: boolean;
  isEditMode: boolean = false;
  isLoadingSaveChange?: boolean = false;

  constructor(
    private _activeModal: NgbActiveModal,
    private _toastService: ToastService,
    private _benefitDeductionService: BenefitDeductionService
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
      this._benefitDeductionService.getById(this.entryId).subscribe((res) => {
        if (res.isOk) {
          this.initialData = res.data;
        }
        this.isLoading = false;
      });
    }
  }
  saveHandler(data: BenefitDeductionDto) {
    this.isLoadingSaveChange = true;
    if (this.isLoadingForm) {
      //this._toastService.error('::Please_Wait_While_Executing_The_Request');
      return;
    }
    this.startLoading();
    if (this.entryId) {
      this._benefitDeductionService
        .updateBenefitDeduction(data as any)
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
      this._benefitDeductionService
        .createBenefitDeduction(data as any)
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
