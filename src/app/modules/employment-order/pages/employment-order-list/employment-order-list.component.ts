import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ModalService } from "../../../../shared/services";
import { AgGridInterFace } from "../../../../shared/interfaces/ag-grid.interface";
import { propertyOf } from "../../../../shared/utilities/property-of";
import { finalize } from "rxjs";
import { ConfirmInterFace } from "../../../../shared/ki-components/ki-confirmation/confirm.interface";
import { ChangeWorkShopsService } from "../../../../services/change-work-shop.service";
import { Router } from "@angular/router";
import { wageOrderListDto } from "../../models/wage-orders.model";
import { CellOperationsClickEvent } from "../../../../shared/components/ag-grid";
import { Paths } from "../../../../shared/utilities/paths";
import { ClientPrerequisitsService } from "../../../../services/client-prerequisits";
import { Location } from "@angular/common";
import { EmploymentOrderService } from "../../services/employment-order.service";

@Component({
  selector: "app-employment-order-list",
  templateUrl: "./employment-order-list.component.html",
  styleUrls: ["./employment-order-list.component.scss"],
  providers: [EmploymentOrderService],
})
export class EmploymentOrderListComponent implements OnInit {
  columnsDefault: AgGridInterFace[] = [
    {
      field: propertyOf<wageOrderListDto>("row_NO"),
      headerName: "row_NO",
      hide: true,
    },
    {
      field: propertyOf<wageOrderListDto>("id"),
      hide: true,
    },

    {
      field: propertyOf<wageOrderListDto>("code"),
      hide: true,
    },
    {
      field: propertyOf<wageOrderListDto>("employeeId"),
      hide: true,
    },
    {
      field: "عملیات",
      cellClass: "d-flex justify-content-center align-items-center",
      editable: false,
      width: 15,
      cellRenderer: CellOperationsClickEvent,
      cellRendererParams: {
        onClickRemove: (params) => {
          const param: ConfirmInterFace = {
            acceptText: "بله",
            declineText: "خیر",
            description: "آیا از عملیات مورد نظر اطمینان دارید؟",
            title: "حذف" + " " + `"${params.node?.employeeName.toUpperCase()}"`,
            type: "Confirm",
          };
          this._modalService.showConfirm(param, false).then((res) => {
            if (res) {
              this.onDeleteItem(params.node);
            }
          });
        },
        onClickEdit: (params) => {
          this._router.navigateByUrl(Paths.wageOrders.edit(params.node.id).url);
        },
      },
    },
    {
      field: propertyOf<wageOrderListDto>("employeeName"),
      filter: "agTextColumnFilter",
      headerName: "نام کارمند",
    },
    {
      field: propertyOf<wageOrderListDto>("employerInsurance"),
      headerName: "سهم بیمه کارمند",
      filter: "agNumberColumnFilter",
    },

    {
      field: propertyOf<wageOrderListDto>("unEmploymentInsurance"),
      headerName: "سهم بیمه بیکاری",
      filter: "agNumberColumnFilter",
    },
    {
      field: propertyOf<wageOrderListDto>("persianStartDate"),
      headerName: "تاریخ",
      filter: "agTextColumnFilter",
    },
    {
      field: propertyOf<wageOrderListDto>("personnelCode"),
      headerName: "کد",
      filter: "agTextColumnFilter",
    },
    {
      field: propertyOf<wageOrderListDto>("comment"),
      headerName: "توضیحات",
      filter: "agTextColumnFilter",
    },
  ];
  rowDataDefault = new Array<wageOrderListDto>();
  defaultColDef: AgGridInterFace = {
    flex: 1,

    filter: true,

    resizable: true,
  };
  selectRow = new Array<wageOrderListDto>();
  isShowLoadingDelete: boolean = false;
  isShowLoadingRefrash: boolean = false;
  constructor(
    private _wageOrdersService: EmploymentOrderService,
    private _modalService: ModalService,
    private _changeWorkShops: ChangeWorkShopsService,
    private _router: Router,
    private _clientPrerequisitsService: ClientPrerequisitsService,
    private readonly _location: Location
  ) {}
  ngOnInit(): void {
    this._changeWorkShops.activeWorkShopsSource$.subscribe((workShopId) => {
      this.getWageOrders();
    });
  }
  onRefrashSelected() {
    this.getWageOrders();
  }
  cancelClickHandler() {
    this._location.back();
  }
  newWorkShpps() {
    this._router.navigateByUrl(Paths.wageOrders.add().url);
  }
  getWageOrders() {
    this.isShowLoadingRefrash = true;
    this._wageOrdersService.get().subscribe({
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
      title: "حذف" + " " + `"${this.selectRow[0].employeeName.toUpperCase()}"`,
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
  onDeleteItem(item: wageOrderListDto) {
    this.isShowLoadingDelete = true;
    this._wageOrdersService
      .delete(item.employeeId, item.id)
      .pipe(
        finalize(() => {
          this.isShowLoadingDelete = false;
        })
      )
      .subscribe((res) => {
        if (res.isOk) {
          this.getWageOrders();
        }
      });
  }
  // onSelectedRowsChangeEvent(event: Array<BenefitDeductionDto>) {
  //   this.selectRow = new Array<BenefitDeductionDto>();
  //   this.selectRow = event;
  // }
}
