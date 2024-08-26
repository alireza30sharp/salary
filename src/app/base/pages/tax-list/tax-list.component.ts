import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { WorkShopsService } from "../../services/work-shops.service";
import { WorkShopsFilter } from "../../models";
import { ModalService, ToastService } from "../../../shared/services";
import { AgGridInterFace } from "../../../shared/interfaces/ag-grid.interface";
import { propertyOf } from "../../../shared/utilities/property-of";
import { BenefitDeductionDto } from "../../models/benefit-deduction.model";
import { TaxService } from "../../services/tax.service";
import { TaxFormModalComponent } from "../../components/templates";
import { ChangeWorkShopsService } from "../../../services/change-work-shop.service";
import { finalize } from "rxjs";
import { TaxDto } from "../../models/tax.model";
import { ConfirmInterFace } from "../../../shared/ki-components/ki-confirmation/confirm.interface";
import { Location } from "@angular/common";
import { numberCellFormatter_valueFormatter } from "../../../shared/interfaces/aggrid-master";

@Component({
  selector: "app-tax-list",
  templateUrl: "./tax-list.component.html",
  styleUrls: ["./tax-list.component.scss"],
  providers: [TaxService],
})
export class TaxListComponent implements OnInit {
  columnsDefault: AgGridInterFace[] = [
    {
      field: propertyOf<TaxDto>("row_No"),
      headerName: "row_NO",
      hide: true,
    },
    {
      headerName: "ردیف",
      cellRenderer: (params) => {
        if (params.node.rowPinned) {
          return "جمع کل:";
        }
        return params.node.rowIndex + 1;
      },
    },
    {
      field: propertyOf<TaxDto>("workShopId"),
      hide: true,
    },
    {
      field: propertyOf<TaxDto>("id"),
      hide: true,
    },
    {
      field: propertyOf<TaxDto>("code"),
      hide: true,
    },
    {
      field: propertyOf<TaxDto>("taxTypeName"),
      headerName: "نوع",
    },
    {
      field: propertyOf<TaxDto>("fromMoneyStr"),
      headerName: "از مبلغ",
      aggFunc: "sum",
      cellRenderer: "agAnimateShowChangeCellRenderer",
      valueFormatter: numberCellFormatter_valueFormatter,
    },
    {
      field: propertyOf<TaxDto>("toMoneyStr"),
      headerName: "تا مبلغ",
      aggFunc: "sum",
      valueFormatter: numberCellFormatter_valueFormatter,
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },

    {
      field: propertyOf<TaxDto>("comment"),
      headerName: "توضحیات",
      filter: "agTextColumnFilter",
    },
  ];
  rowDataDefault = new Array<TaxDto>();
  selectRow = new Array<TaxDto>();
  isShowLoadingDelete: boolean = false;
  isShowLoadingRefrash: boolean = false;
  constructor(
    private _taxService: TaxService,
    private _modalService: ModalService,
    private _changeWorkShops: ChangeWorkShopsService,
    private readonly _location: Location,
    private _toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.getTaxList();
    this._changeWorkShops.activeWorkShopsSource$.subscribe((workShopId) => {
      this.getTaxList();
    });
  }

  onRefrashSelected() {
    this.getTaxList();
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
      .open(TaxFormModalComponent, "lg", { entryId: entryId }, true)
      .then((value) => {
        this.getTaxList();
      })
      .catch((err) => {});
  }
  getTaxList() {
    let model = new WorkShopsFilter();
    this.isShowLoadingRefrash = true;
    this._taxService.getTaxList(model).subscribe({
      next: (res) => {
        if (res.isOk) {
          this.rowDataDefault = res.data.data;
        }
      },
      complete: () => {
        this.isShowLoadingRefrash = false;
      },
      error: (err) => {},
    });
  }

  removeCell() {
    const params: ConfirmInterFace = {
      acceptText: "بله",
      declineText: "خیر",
      description: "آیا از عملیات مورد نظر اطمینان دارید؟",
      title: "حذف" + " " + `"${this.selectRow[0].taxTypeName.toUpperCase()}"`,
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
  onDeleteItem(item: TaxDto) {
    this.isShowLoadingDelete = true;
    this._taxService
      .delete(item.workShopId, item.id)
      .pipe(
        finalize(() => {
          this.isShowLoadingDelete = false;
        })
      )
      .subscribe({
        next: (res) => {
          if (res.isOk) {
            this.getTaxList();
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
  onSelectedRowsChangeEvent(event: Array<TaxDto>) {
    this.selectRow = new Array<TaxDto>();
    this.selectRow = event;
  }
}
