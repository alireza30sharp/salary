import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { finalize } from "rxjs";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { InsuranceTypeService } from "../../services/Insurance-type.service";
import { AgGridInterFace } from "../../../../../../shared/interfaces/ag-grid.interface";
import { ChangeWorkShopsService } from "../../../../../../services/change-work-shop.service";
import { ConfirmInterFace } from "../../../../../../shared/ki-components/ki-confirmation/confirm.interface";
import { ModalService } from "../../../../../../shared/services";
import { Paths } from "../../../../../../shared/utilities/paths";
import { propertyOf } from "../../../../../../shared/utilities/property-of";
import { InsuranceTypDto } from "../../models/Insurance-type.model";
import {
  CellOperationsClickEvent,
  FlagStateCellRenderer,
} from "../../../../../../shared/components/ag-grid";

@Component({
  selector: "app-insurance-type-list",
  templateUrl: "./insurance-type-list.component.html",
  styleUrls: ["./insurance-type-list.component.scss"],
  providers: [InsuranceTypeService],
})
export class InsuranceTypeListComponent implements OnInit {
  columnsDefault: AgGridInterFace[] = [
    {
      field: propertyOf<InsuranceTypDto>("row_NO"),
      headerName: "row_NO",
      hide: true,
    },
    {
      field: propertyOf<InsuranceTypDto>("id"),
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
            title:
              "حذف" + " " + `"${params.node?.insuranceType.toUpperCase()}"`,
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
            Paths.InsuranceType.edit(params.node.id).url
          );
        },
      },
    },
    {
      field: propertyOf<InsuranceTypDto>("code"),
      headerName: "کد",
      filter: "agTextColumnFilter",
      minWidth: 150,
    },
    {
      field: propertyOf<InsuranceTypDto>("insuranceType"),
      headerName: "نوع بیمه ",
      filter: "agTextColumnFilter",
      minWidth: 150,
    },
    {
      field: propertyOf<InsuranceTypDto>("orderIndex"),
      headerName: "ترتیب",
      filter: "agNumberColumnFilter",
      minWidth: 150,
    },
    {
      field: propertyOf<InsuranceTypDto>("isDefault"),
      headerName: "پیش فرض",
      cellRenderer: FlagStateCellRenderer,
      minWidth: 150,
    },
  ];
  rowDataDefault = new Array<InsuranceTypDto>();
  defaultColDef: AgGridInterFace = {
    flex: 1,
    width: 150,
    filter: true,
    resizable: true,
  };
  selectRow = new Array<InsuranceTypDto>();
  isShowLoadingDelete: boolean = false;
  isShowLoadingRefrash: boolean = false;
  constructor(
    private _insuranceTypeService: InsuranceTypeService,
    private _changeWorkShops: ChangeWorkShopsService,
    private _router: Router,
    private _modalService: ModalService,

    private readonly _location: Location
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
    this._router.navigateByUrl(Paths.InsuranceType.add().url);
  }
  getAll() {
    this.isShowLoadingRefrash = true;
    this._insuranceTypeService
      .GetAll()
      .pipe(
        finalize(() => {
          this.isShowLoadingRefrash = false;
        })
      )
      .subscribe({
        next: (res) => {
          if (res.isOk) {
            this.rowDataDefault = res.data.data;
          }
        },

        error: (err) => {},
      });
  }
  onSelectedRowsChangeEvent(event: Array<InsuranceTypDto>) {
    this.selectRow = new Array<InsuranceTypDto>();
    this.selectRow = event;
  }
  removeCell() {
    const params: ConfirmInterFace = {
      acceptText: "بله",
      declineText: "خیر",
      description: "آیا از عملیات مورد نظر اطمینان دارید؟",
      title: "حذف" + " " + `"${this.selectRow[0].insuranceType.toUpperCase()}"`,
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
  onDeleteItem(item: any) {
    this.isShowLoadingDelete = true;
    this._insuranceTypeService
      .delete(item.id)
      .pipe(
        finalize(() => {
          this.isShowLoadingDelete = false;
        })
      )
      .subscribe((res) => {
        if (res.isOk) {
          this.getAll();
        }
      });
  }
}
