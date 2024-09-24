import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { finalize } from "rxjs";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { AgGridInterFace } from "../../../../../../shared/interfaces/ag-grid.interface";
import { ChangeWorkShopsService } from "../../../../../../services/change-work-shop.service";
import { ConfirmInterFace } from "../../../../../../shared/ki-components/ki-confirmation/confirm.interface";
import { ModalService } from "../../../../../../shared/services";
import { Paths } from "../../../../../../shared/utilities/paths";
import { propertyOf } from "../../../../../../shared/utilities/property-of";
import {
  CellOperationsClickEvent,
  FlagStateCellRenderer,
} from "../../../../../../shared/components/ag-grid";
import { OrganizationPostService } from "../../services/organization-post.service";
import { OrganizationPostDto } from "../../models";

@Component({
  selector: "app-organization-post-list",
  templateUrl: "./organization-post-list.component.html",
  styleUrls: ["./organization-post-list.component.scss"],
  providers: [OrganizationPostService],
})
export class OrganizationPostListComponent implements OnInit {
  columnsDefault: AgGridInterFace[] = [
    {
      field: propertyOf<OrganizationPostDto>("row_NO"),
      headerName: "row_NO",
      hide: true,
    },
    {
      field: propertyOf<OrganizationPostDto>("id"),
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
            title: "حذف" + " " + `"${params.node?.post.toUpperCase()}"`,
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
            Paths.OrganizationPost.edit(params.node.id).url
          );
        },
      },
    },

    {
      field: propertyOf<OrganizationPostDto>("post"),
      headerName: "پست سازمانی",
      filter: "agTextColumnFilter",
      minWidth: 150,
    },
    {
      field: propertyOf<OrganizationPostDto>("orderIndex"),
      headerName: "ترتیب",
      filter: "agNumberColumnFilter",
      minWidth: 150,
    },
    {
      field: propertyOf<OrganizationPostDto>("isDefault"),
      headerName: "پیش فرض",
      cellRenderer: FlagStateCellRenderer,
      minWidth: 150,
    },
  ];
  rowDataDefault = new Array<OrganizationPostDto>();
  defaultColDef: AgGridInterFace = {
    flex: 1,
    width: 150,
    filter: true,
    resizable: true,
  };
  selectRow = new Array<OrganizationPostDto>();
  isShowLoadingDelete: boolean = false;
  isShowLoadingRefrash: boolean = false;
  constructor(
    private _OrganizationPostService: OrganizationPostService,
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
    this._router.navigateByUrl(Paths.OrganizationPost.add().url);
  }
  getAll() {
    this.isShowLoadingRefrash = true;
    this._OrganizationPostService
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
  onSelectedRowsChangeEvent(event: Array<OrganizationPostDto>) {
    this.selectRow = new Array<OrganizationPostDto>();
    this.selectRow = event;
  }
  removeCell() {
    const params: ConfirmInterFace = {
      acceptText: "بله",
      declineText: "خیر",
      description: "آیا از عملیات مورد نظر اطمینان دارید؟",
      title: "حذف" + " " + `"${this.selectRow[0].post.toUpperCase()}"`,
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
    this._OrganizationPostService
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