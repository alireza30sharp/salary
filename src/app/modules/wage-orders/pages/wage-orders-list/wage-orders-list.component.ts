import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ModalService } from "../../../../shared/services";
import { AgGridInterFace } from "../../../../shared/interfaces/ag-grid.interface";
import { propertyOf } from "../../../../shared/utilities/property-of";
import { finalize } from "rxjs";
import { ConfirmInterFace } from "../../../../shared/ki-components/ki-confirmation/confirm.interface";
import { WageOrdersService } from "../../services/wage-orders.service";
import { ChangeWorkShopsService } from "../../../../services/change-work-shop.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-wage-orders-list",
  templateUrl: "./wage-orders-list.component.html",
  styleUrls: ["./wage-orders-list.component.scss"],
  providers: [WageOrdersService],
})
export class WageOrdersListComponent implements OnInit {
  // columnsDefault: AgGridInterFace[] = [
  //   {
  //     field: propertyOf<TaxDto>("row_No"),
  //     headerName: "row_NO",
  //     hide: true,
  //   },
  //   {
  //     field: propertyOf<TaxDto>("workShopId"),
  //     hide: true,
  //   },
  //   {
  //     field: propertyOf<TaxDto>("id"),
  //     hide: true,
  //   },
  //   {
  //     field: propertyOf<TaxDto>("code"),
  //     hide: true,
  //   },
  //   {
  //     field: propertyOf<TaxDto>("taxTypeName"),
  //     headerName: "نوع",
  //   },
  //   {
  //     field: propertyOf<TaxDto>("fromMoneyStr"),
  //     filter: "agTextColumnFilter",
  //     headerName: "از مبلغ",
  //   },
  //   {
  //     field: propertyOf<TaxDto>("toMoneyStr"),
  //     headerName: "تا مبلغ",
  //     filter: "agTextColumnFilter",
  //   },

  //   {
  //     field: propertyOf<TaxDto>("comment"),
  //     headerName: "توضحیات",
  //     filter: "agTextColumnFilter",
  //   },
  // ];
  rowDataDefault = new Array<any>();
  selectRow = new Array<any>();
  isShowLoadingDelete: boolean = false;
  isShowLoadingRefrash: boolean = false;
  constructor(
    private _wageOrdersService: WageOrdersService,
    private _modalService: ModalService,
    private _changeWorkShops: ChangeWorkShopsService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this._changeWorkShops.activeWorkShopsSource$.subscribe((workShopId) => {
      this.getWageOrders();
    });
  }
  onRefrashSelected() {
    this.getWageOrders();
  }
  newWorkShpps() {
    this._router.navigate(["/add"]);
  }
  getWageOrders() {
    debugger;
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
      title: "حذف" + " " + `"${this.selectRow[0].name.toUpperCase()}"`,
      type: "Confirm",
    };
    this._modalService.showConfirm(params, false).then((res) => {
      if (res) {
        if (this.selectRow.length) {
          for (let i = 0; i <= this.selectRow.length; i++) {
            //this.onDeleteItem(this.selectRow[i]);
          }
        }
      }
    });
  }
  // onDeleteItem(item: BenefitDeductionDto) {
  //   this.isShowLoadingDelete = true;
  //   this._taxService
  //     .delete(item.workShopId, item.id)
  //     .pipe(
  //       finalize(() => {
  //         this.isShowLoadingDelete = false;
  //       })
  //     )
  //     .subscribe((res) => {
  //       if (res.isOk) {
  //         this.getTaxList();
  //       }
  //     });
  // }
  // onSelectedRowsChangeEvent(event: Array<BenefitDeductionDto>) {
  //   this.selectRow = new Array<BenefitDeductionDto>();
  //   this.selectRow = event;
  // }
}
