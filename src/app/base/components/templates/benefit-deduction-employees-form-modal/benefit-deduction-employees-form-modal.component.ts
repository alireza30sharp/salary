import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Form } from "@angular/forms";
import { BenefitDeductionEmployeesDto } from "../../../models/benefit-deduction-employees.model";
import { LoadingStateFrom } from "../../../../shared/models";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastService } from "../../../../shared/services";
import { BenefitDeductionEmployeesService } from "../../../services/benefit-deduction-employees.service";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-benefit-deduction-employees-form-modal",
  templateUrl: "./benefit-deduction-employees-form-modal.component.html",
  styleUrls: ["./benefit-deduction-employees-form-modal.component.scss"],
  providers: [BenefitDeductionEmployeesService],
})
export class BenefitDeductionEmployeesFormModalComponent
  extends LoadingStateFrom
  implements OnInit
{
  @Input() entryId?: number;
  initialData?: BenefitDeductionEmployeesDto = new BenefitDeductionEmployeesDto();
  readonly submitButtonId: string = "submit-button-employes";
  isLoading?: boolean = false;
  isLoadingSaveChange?: boolean = false;
  isEditMode: boolean = false;
  constructor(
    private _activeModal: NgbActiveModal,
    private _toastService: ToastService,
    private _benefitDeductionEmployeesService: BenefitDeductionEmployeesService
  ) {
    super();
  }
  ngOnInit(): void {
    this.isEditMode = !!this.entryId;
    this._getInitialData();
  }

  private _getInitialData() {
    debugger;
    if (this.isEditMode) {
      this.isLoading = true;
      this._benefitDeductionEmployeesService.getById(this.entryId).subscribe((res) => {
        if (res.isOk) {
          this.initialData = res.data;
        }
        this.isLoading = false;
      });
    }
  }
  saveHandler(data: BenefitDeductionEmployeesDto) {
    this.isLoadingSaveChange = true;
    if (this.isLoadingForm) {
      //this._toastService.error('::Please_Wait_While_Executing_The_Request');
      return;
    }
    this.startLoading();
    if (this.entryId) {
      this.isLoadingSaveChange = true;
      this._benefitDeductionEmployeesService
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
      this._benefitDeductionEmployeesService
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
