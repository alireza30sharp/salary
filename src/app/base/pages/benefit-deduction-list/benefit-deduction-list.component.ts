import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { WorkShopsService } from "../../services/work-shops.service";
import { WorkShopsFilter } from "../../models";
import { ModalService, ToastService } from "../../../shared/services";
import { BenefitDeductionService } from "../../services/benefit-deduction.service";
import { BenefitDeductionFormModalComponent } from "../../components/templates/benefit-deduction-form-modal/benefit-deduction-form-modal.component";
import { AgGridInterFace } from "../../../shared/interfaces/ag-grid.interface";
import { propertyOf } from "../../../shared/utilities/property-of";
import { BenefitDeductionDto } from "../../models/benefit-deduction.model";
import { finalize } from "rxjs";
import { ChangeWorkShopsService } from "../../../services/change-work-shop.service";
import { ConfirmInterFace } from "../../../shared/ki-components/ki-confirmation/confirm.interface";
import { Location } from "@angular/common";
import { ListViewFilterInterFace } from "../../../shared/interfaces/list-view-filter-config.interface";
import { ClientPrerequisitsService } from "../../../services/client-prerequisits";

@Component({
  selector: "app-benefit-deduction-list",
  templateUrl: "./benefit-deduction-list.component.html",
  styleUrls: ["./benefit-deduction-list.component.scss"],
  providers: [BenefitDeductionService],
})
export class BenefitDeductionListComponent implements OnInit {
  columnsDefault: AgGridInterFace[] = [
    {
      field: propertyOf<BenefitDeductionDto>("row_NO"),
      headerName: "row_NO",
      hide: true,
    },
    {
      field: propertyOf<BenefitDeductionDto>("workShopId"),
      hide: true,
    },
    {
      field: propertyOf<BenefitDeductionDto>("id"),
      hide: true,
    },

    {
      field: propertyOf<BenefitDeductionDto>("code"),
      headerName: "کد",
      filter: "agNumberColumnFilter",
    },
    {
      field: propertyOf<BenefitDeductionDto>("name"),
      headerName: "نام",
      filter: "agTextColumnFilter",
    },
    {
      field: propertyOf<BenefitDeductionDto>("typeName"),
      headerName: "نوع",
      filter: "agTextColumnFilter",
    },
    {
      field: propertyOf<BenefitDeductionDto>("idMoin"),
      headerName: "معین",
    },
    {
      field: propertyOf<BenefitDeductionDto>("idTafsili"),
      headerName: "تفضیلی",
    },
    {
      field: propertyOf<BenefitDeductionDto>("idTafsili2"),
      headerName: "تفضیلی2",
    },
  ];
  rowDataDefault = new Array<BenefitDeductionDto>();
  selectRow = new Array<BenefitDeductionDto>();
  isShowLoadingDelete: boolean = false;
  isShowLoadingRefrash: boolean = false;
  configViewFilter: ListViewFilterInterFace = {
    showFromDate: true,
    showToDate: true,
    showEmployeeId: true,
    showBenefitDeduction: true,
    showFromAmount: true,
    showToAmount: true,
    showComment: true,
  };
  constructor(
    private _benefitDeductionService: BenefitDeductionService,
    private _modalService: ModalService,
    private _changeWorkShops: ChangeWorkShopsService,
    private readonly _location: Location,
    private _toastService: ToastService,
    private clientPrerequis: ClientPrerequisitsService
  ) {
    clientPrerequis.getEmployeeClientPrerequisites(true).subscribe((res) => {});
    clientPrerequis
      .getBenefitDaductionClientPrerequisites(true)
      .subscribe((res) => {});
  }
  ngOnInit(): void {
    this.getGetBenefitsDeductionsList();
    this._changeWorkShops.activeWorkShopsSource$.subscribe((workShopId) => {
      this.getGetBenefitsDeductionsList();
    });
  }
  onSearchHandelar(event) {
    console.table(event);
  }
  cancelClickHandler() {
    this._location.back();
  }
  newWorkShpps(isEdit: boolean = false) {
    let entryId = null;
    if (isEdit) {
      entryId = this.selectRow[0].id;
    }
    this._modalService
      .open(BenefitDeductionFormModalComponent, "lg", { entryId: entryId })
      .then((value) => {
        this.getGetBenefitsDeductionsList();
      })
      .catch((err) => {});
  }
  getGetBenefitsDeductionsList() {
    this.isShowLoadingRefrash = true;
    let model = new WorkShopsFilter();
    this._benefitDeductionService
      .getGetBenefitsDeductionsList(model)
      .pipe(
        finalize(() => {
          this.isShowLoadingRefrash = false;
        })
      )
      .subscribe((res) => {
        if (res.isOk) {
          this.rowDataDefault = res.data.data;
        }
      });
  }

  removeCell() {
    const params: ConfirmInterFace = {
      acceptText: "بله",
      declineText: "خیر",
      description: "آیا از عملیات مورد نظر اطمینان دارید؟",
      title: "حذف" + " " + `"${this.selectRow[0].name.toUpperCase()}"`,
      type: "Confirm",
    };
    this._modalService.showConfirm(params, false).then((res) => {
      if (res) {
        if (this.selectRow.length) {
          for (let i = 0; i <= this.selectRow.length; i++) {
            this.onDeleteItem(this.selectRow[i]);
          }
        }
      }
    });
  }

  onDeleteItem(item: BenefitDeductionDto) {
    this.isShowLoadingDelete = true;
    this._benefitDeductionService
      .deleteBenefitDeduction(item.id)
      .pipe(
        finalize(() => {
          this.isShowLoadingDelete = false;
        })
      )
      .subscribe({
        next: (res) => {
          if (res.isOk) {
            this.getGetBenefitsDeductionsList();
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
  onSelectedRowsChangeEvent(event: Array<BenefitDeductionDto>) {
    this.selectRow = new Array<BenefitDeductionDto>();
    this.selectRow = event;
  }
  onRefrashSelected() {
    this.getGetBenefitsDeductionsList();
  }
}
