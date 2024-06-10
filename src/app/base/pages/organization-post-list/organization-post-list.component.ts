import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { WorkShopsFilter } from "../../models";
import { ModalService } from "../../../shared/services";
import { AgGridInterFace } from "../../../shared/interfaces/ag-grid.interface";
import { propertyOf } from "../../../shared/utilities/property-of";
import {
  EducationFieldsFormModalComponent,
  EmploymentTypesFormModalComponent,
} from "../../components/templates";
import { FlagStateCellRenderer } from "../../../shared/components/ag-grid";
import { finalize } from "rxjs";
import { ChangeWorkShopsService } from "../../../services/change-work-shop.service";
import { OrganizationPostDto } from "../../models/organization-post.model";
import { OrganizationPostService } from "../../services/organization-post.service";
import { ConfirmInterFace } from "../../../shared/ki-components/ki-confirmation/confirm.interface";

@Component({
  selector: "app-organization-post-list",
  templateUrl: "./organization-post-list.component.html",
  styleUrls: ["./organization-post-list.component.scss"],
  providers: [OrganizationPostService],
})
export class OrganizationPostListComponent implements OnInit {
  columnsDefault: AgGridInterFace[] = [
    {
      field: propertyOf<OrganizationPostDto>("id"),
      headerName: "row_NO",
      hide: true,
    },
    {
      field: propertyOf<OrganizationPostDto>("workShopId"),
      hide: true,
    },

    {
      field: propertyOf<OrganizationPostDto>("post"),
      headerName: "پست سازمانی",
      filter: "agTextColumnFilter",
    },
    {
      field: propertyOf<OrganizationPostDto>("orderIndex"),
      headerName: "ترتیب",
      filter: "agTextColumnFilter",
    },
    {
      field: propertyOf<OrganizationPostDto>("isDefault"),
      headerName: "پیش فرض",
      cellRenderer: FlagStateCellRenderer,
    },
  ];
  rowDataDefault = new Array<OrganizationPostDto>();
  selectRow = new Array<OrganizationPostDto>();
  isShowLoadingDelete: boolean = false;
  isShowLoadingRefrash: boolean = false;
  constructor(
    private _OrganizationPostService: OrganizationPostService,
    private _modalService: ModalService,
    private _changeWorkShops: ChangeWorkShopsService
  ) {}
  ngOnInit(): void {
    this.getAllOrganizationPosts();
    this._changeWorkShops.activeWorkShopsSource$.subscribe((workShopId) => {
      this.getAllOrganizationPosts();
    });
  }

  newWorkShpps(isEdit: boolean = false) {
    let entryId = null;
    if (isEdit) {
      entryId = this.selectRow[0].id;
    }
    this._modalService
      .open(EmploymentTypesFormModalComponent, "lg", { entryId: entryId }, true)
      .then((value) => {
        this.getAllOrganizationPosts();
      })
      .catch((err) => {});
  }
  getAllOrganizationPosts() {
    let model = new WorkShopsFilter();
    this.isShowLoadingRefrash = true;
    this._OrganizationPostService
      .GetAllOrganizationPosts(model)
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

  onDeleteItem(item: OrganizationPostDto) {
    this._OrganizationPostService.delete(item.id).subscribe((res) => {
      if (res.isOk) {
        this.getAllOrganizationPosts();
      }
    });
  }
  onSelectedRowsChangeEvent(event: Array<OrganizationPostDto>) {
    this.selectRow = new Array<OrganizationPostDto>();
    this.selectRow = event;
  }
  onRefrashSelected() {
    this.getAllOrganizationPosts();
  }
}
