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
import { EducationFieldsService } from "../../services/education-fields.service";
import { EducationFieldsDto } from "../../models";

@Component({
  selector: "app-education-fields-list",
  templateUrl: "./education-fields-list.component.html",
  styleUrls: ["./education-fields-list.component.scss"],
  providers: [EducationFieldsService],
})
export class EducationFieldsListComponent implements OnInit {
  columnsDefault: AgGridInterFace[] = [
    {
      field: propertyOf<EducationFieldsDto>("id"),
      headerName: "row_NO",
      hide: true,
    },
    {
      field: propertyOf<EducationFieldsDto>("workShopId"),
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
            title: "حذف" + " " + `"${params.node?.field.toUpperCase()}"`,
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
            Paths.EducationFields.edit(params.node.id).url
          );
        },
      },
    },
    {
      field: propertyOf<EducationFieldsDto>("field"),
      headerName: "رشته تحصیلی",
      filter: "agTextColumnFilter",
    },
    {
      field: propertyOf<EducationFieldsDto>("orderIndex"),
      headerName: "ترتیب",
      filter: "agTextColumnFilter",
    },
    {
      field: propertyOf<EducationFieldsDto>("isDefault"),
      headerName: "پیش فرض",
      cellRenderer: FlagStateCellRenderer,
    },
  ];
  rowDataDefault = new Array<EducationFieldsDto>();
  defaultColDef: AgGridInterFace = {
    flex: 1,
    width: 150,
    filter: true,
    resizable: true,
  };
  selectRow = new Array<EducationFieldsDto>();
  isShowLoadingDelete: boolean = false;
  isShowLoadingRefrash: boolean = false;
  constructor(
    private _EducationFieldsService: EducationFieldsService,
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
    this._router.navigateByUrl(Paths.EducationFields.add().url);
  }
  getAll() {
    let model = new WorkShopsFilter();
    this.isShowLoadingRefrash = true;
    this._EducationFieldsService
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
  onSelectedRowsChangeEvent(event: Array<EducationFieldsDto>) {
    this.selectRow = new Array<EducationFieldsDto>();
    this.selectRow = event;
  }
  removeCell() {
    const params: ConfirmInterFace = {
      acceptText: "بله",
      declineText: "خیر",
      description: "آیا از عملیات مورد نظر اطمینان دارید؟",
      title: "حذف" + " " + `"${this.selectRow[0].field.toUpperCase()}"`,
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
  onDeleteItem(item: EducationFieldsDto) {
    this._EducationFieldsService.delete(item.id).subscribe({
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
