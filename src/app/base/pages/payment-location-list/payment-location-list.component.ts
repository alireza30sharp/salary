import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { WorkShopsFilter } from "../../models";
import { ModalService } from "../../../shared/services";
import { AgGridInterFace } from "../../../shared/interfaces/ag-grid.interface";
import { propertyOf } from "../../../shared/utilities/property-of";
import { PaymentLocationFormModalComponent } from "../../components/templates";
import { FlagStateCellRenderer } from "../../../shared/components/ag-grid";
import { finalize } from "rxjs";
import { ChangeWorkShopsService } from "../../../services/change-work-shop.service";
import { PaymentLocationDto } from "../../models/payment-location.model";
import { PaymentLocationService } from "../../services/payment-location.service";

@Component({
  selector: "app-payment-location-list",
  templateUrl: "./payment-location-list.component.html",
  styleUrls: ["./payment-location-list.component.scss"],
  providers: [PaymentLocationService],
})
export class PaymentLocationListComponent implements OnInit {
  columnsDefault: AgGridInterFace[] = [
    {
      field: propertyOf<PaymentLocationDto>("id"),
      headerName: "row_NO",
      hide: true,
    },
    {
      field: propertyOf<PaymentLocationDto>("workShopId"),
      hide: true,
    },

    {
      field: propertyOf<PaymentLocationDto>("location"),
      headerName: "محل پرداخت",
      filter: "agTextColumnFilter",
    },
    {
      field: propertyOf<PaymentLocationDto>("orderIndex"),
      headerName: "ترتیب",
      filter: "agTextColumnFilter",
    },
    {
      field: propertyOf<PaymentLocationDto>("isDefault"),
      headerName: "پیش فرض",
      cellRenderer: FlagStateCellRenderer,
    },
  ];
  rowDataDefault = new Array<PaymentLocationDto>();
  selectRow = new Array<PaymentLocationDto>();
  isShowLoadingDelete: boolean = false;
  isShowLoadingRefrash: boolean = false;
  constructor(
    private _paymentLocationService: PaymentLocationService,
    private _modalService: ModalService,
    private _changeWorkShops: ChangeWorkShopsService
  ) {}
  ngOnInit(): void {
    this._changeWorkShops.activeWorkShopsSource$.subscribe((workShopId) => {
      this.getAllPaymentLocations();
    });
  }

  newWorkShpps(isEdit: boolean = false) {
    let entryId = null;
    if (isEdit) {
      entryId = this.selectRow[0].id;
    }
    this._modalService
      .open(PaymentLocationFormModalComponent, "lg", { entryId: entryId }, true)
      .then((value) => {
        this.getAllPaymentLocations();
      })
      .catch((err) => {});
  }
  getAllPaymentLocations() {
    let model = new WorkShopsFilter();
    this.isShowLoadingRefrash = true;
    this._paymentLocationService
      .GetAllPaymentLocations(model)
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
    if (this.selectRow.length) {
      for (let i = 0; i <= this.selectRow.length; i++) {
        this.onDeleteItem(this.selectRow[i]);
      }
    } else {
      //  this._toaster.error("لطفا یک رکورد انتخاب شود");
    }
  }

  onDeleteItem(item: PaymentLocationDto) {
    this._paymentLocationService.delete(item.id).subscribe((res) => {
      if (res.isOk) {
        this.getAllPaymentLocations();
      }
    });
  }
  onSelectedRowsChangeEvent(event: Array<PaymentLocationDto>) {
    this.selectRow = new Array<PaymentLocationDto>();
    this.selectRow = event;
  }
  onRefrashSelected() {
    this.getAllPaymentLocations();
  }
}
