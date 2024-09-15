import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { finalize } from "rxjs";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { AgGridInterFace } from "../../../../../shared/interfaces/ag-grid.interface";
import { ChangeWorkShopsService } from "../../../../../services/change-work-shop.service";
import { ConfirmInterFace } from "../../../../../shared/ki-components/ki-confirmation/confirm.interface";
import { ModalService } from "../../../../../shared/services";
import { Paths } from "../../../../../shared/utilities/paths";
import { propertyOf } from "../../../../../shared/utilities/property-of";
import {
  CellOperationsClickEvent,
  FlagStateCellRenderer,
} from "../../../../../shared/components/ag-grid";
import { WorkShopsService } from "../../services/work-shops.service";
import { WorkShopsDto, WorkShopsFilter } from "../../models";

@Component({
  selector: "app-work-shops-list",
  templateUrl: "./work-shops-list.component.html",
  styleUrls: ["./work-shops-list.component.scss"],
  providers: [WorkShopsService],
})
export class WorkShopsListComponent implements OnInit {
  columnsDefault: AgGridInterFace[] = [
    {
      field: propertyOf<WorkShopsDto>("row_NO"),
      headerName: "row_NO",
      hide: true,
    },
    {
      field: propertyOf<WorkShopsDto>("workShopId"),
      hide: true,
    },
    {
      field: propertyOf<WorkShopsDto>("isActive"),
      hide: true,
    },
    {
      field: propertyOf<WorkShopsDto>("workShopCode"),
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
            title: "حذف" + " " + `"${params.node?.companyName.toUpperCase()}"`,
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
            Paths.WorkShops.edit(params.node.workShopId).url
          );
        },
      },
    },
    {
      field: propertyOf<WorkShopsDto>("companyName"),
      headerName: "نام شرکت",
      filter: "agTextColumnFilter",
      headerClass: "companyName",
    },
    {
      field: propertyOf<WorkShopsDto>("employerName"),
      headerName: "نام کارفرما",
      filter: "agTextColumnFilter",
      headerClass: "employerName",
    },
    {
      field: propertyOf<WorkShopsDto>("workShopName"),
      headerName: "کارگاه",
      filter: "agTextColumnFilter",
      headerClass: "workShopName",
    },
    {
      field: propertyOf<WorkShopsDto>("isActive"),
      headerName: "وضعیت",
      filter: "agTextColumnFilter",
      headerClass: "isActiveString",
      cellRenderer: FlagStateCellRenderer,
    },
    {
      field: propertyOf<WorkShopsDto>("isDefaultString"),
      headerName: "پیش فرض",
      filter: "agTextColumnFilter",
      headerClass: "isDefaultString",
    },
    {
      field: propertyOf<WorkShopsDto>("socialSecurityBranchName"),
      headerName: "نام شعبه تامین اجتماعی",
      headerClass: "socialSecurityBranchName",
    },
    {
      field: propertyOf<WorkShopsDto>("workShopAddress"),
      headerName: "آدرس کارگاه",
      filter: "agTextColumnFilter",
      headerClass: "workShopAddress",
    },
  ];
  rowDataDefault = new Array<WorkShopsDto>();
  defaultColDef: AgGridInterFace = {
    flex: 1,
    width: 150,
    filter: true,
    resizable: true,
  };
  selectRow = new Array<WorkShopsDto>();
  isShowLoadingDelete: boolean = false;
  isShowLoadingRefrash: boolean = false;
  constructor(
    private _WorkShopsService: WorkShopsService,
    private _changeWorkShops: ChangeWorkShopsService,
    private _router: Router,
    private _modalService: ModalService,

    private readonly _location: Location
  ) {}
  ngOnInit(): void {
    this.getAll();
  }
  onRefrashSelected() {
    this.getAll();
  }
  cancelClickHandler() {
    this._location.back();
  }
  newWorkShpps() {
    this._router.navigateByUrl(Paths.WorkShops.add().url);
  }
  getAll() {
    let model = new WorkShopsFilter();
    this.isShowLoadingRefrash = true;
    this._WorkShopsService.GetAll(model).subscribe({
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
  onSelectedRowsChangeEvent(event: Array<WorkShopsDto>) {
    this.selectRow = new Array<WorkShopsDto>();
    this.selectRow = event;
  }
  removeCell() {
    const params: ConfirmInterFace = {
      acceptText: "بله",
      declineText: "خیر",
      description: "آیا از عملیات مورد نظر اطمینان دارید؟",
      title: "حذف" + " " + `"${this.selectRow[0].workShopName.toUpperCase()}"`,
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
    this._WorkShopsService
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
