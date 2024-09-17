import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { finalize } from "rxjs";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { AgGridInterFace } from "../../../../../shared/interfaces/ag-grid.interface";
import { ConfirmInterFace } from "../../../../../shared/ki-components/ki-confirmation/confirm.interface";
import { ModalService, ToastService } from "../../../../../shared/services";
import { Paths } from "../../../../../shared/utilities/paths";
import { propertyOf } from "../../../../../shared/utilities/property-of";
import {
  CellOperationsClickEvent,
  FlagStateCellRenderer,
} from "../../../../../shared/components/ag-grid";
import { ChangeWorkShopsService } from "../../../../../services/change-work-shop.service";
import { WorkShopsFilter } from "../../../work-shops/models";
import { BenefitDeductionService } from "../../services/benefit-deduction.service";
import { BenefitDeductionDto } from "../../models";

@Component({
  selector: "app-benefit-deduction-list",
  templateUrl: "./benefit-deduction-list.component.html",
  styleUrls: ["./benefit-deduction-list.component.scss"],
  providers: [BenefitDeductionService],
})
export class BenefitDeductionListComponent implements OnInit {
  columnsDefault: AgGridInterFace[] = [
    {
      field: propertyOf<BenefitDeductionDto>("id"),
      headerName: "row_NO",
      hide: true,
    },
    {
      field: propertyOf<BenefitDeductionDto>("workShopId"),
      hide: true,
    },
    {
      field: "عملیات",
      cellClass: "d-flex justify-content-center align-items-center",
      editable: false,
      minWidth: 150,
      cellRenderer: CellOperationsClickEvent,
      cellRendererParams: {
        onClickRemove: (params) => {
          const param: ConfirmInterFace = {
            acceptText: "بله",
            declineText: "خیر",
            description: "آیا از عملیات مورد نظر اطمینان دارید؟",
            title: "حذف" + " " + `"${params.node?.name.toUpperCase()}"`,
            type: "Confirm",
          };
          this._modalService.showConfirm(param, false).then((res) => {
            if (res) {
              this.onDeleteItem(params.node);
            }
          });
        },
        onClickEdit: (params) => {
          this._router.navigateByUrl(
            Paths.BenefitDeduction.edit(params.node.id).url
          );
        },
      },
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
    {
      field: propertyOf<BenefitDeductionDto>("orderIndex"),
      headerName: "ترتیب",
      filter: "agTextColumnFilter",
    },
  ];
  rowDataDefault = new Array<BenefitDeductionDto>();
  defaultColDef: AgGridInterFace = {
    flex: 1,
    width: 150,
    filter: true,
    resizable: true,
  };
  selectRow = new Array<BenefitDeductionDto>();
  isShowLoadingDelete: boolean = false;
  isShowLoadingRefrash: boolean = false;
  constructor(
    private _BenefitDeductionService: BenefitDeductionService,
    private _modalService: ModalService,
    private _changeWorkShops: ChangeWorkShopsService,
    private _toastService: ToastService,
    private readonly _location: Location,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this._changeWorkShops.activeWorkShopsSource$.subscribe((workShopId) => {
      this.getAll();
    });
  }
  onRefrashSelected() {
    this.getAll();
  }
  cancelClickHandler() {
    this._location.back();
  }
  newWorkShpps() {
    this._router.navigateByUrl(Paths.BenefitDeduction.add().url);
  }
  getAll() {
    let model = new WorkShopsFilter();
    this.isShowLoadingRefrash = true;
    this._BenefitDeductionService
      .GetAll(model)
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
  onSelectedRowsChangeEvent(event: Array<BenefitDeductionDto>) {
    this.selectRow = new Array<BenefitDeductionDto>();
    this.selectRow = event;
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
    this._BenefitDeductionService.delete(item.id).subscribe({
      next: (res) => {
        if (res.isOk) {
          this.getAll();
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
