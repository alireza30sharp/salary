import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { WorkShopsService } from "../../services/work-shops.service";
import { WorkShopsFilter } from "../../models";
import { ModalService } from "../../../shared/services";
import { AgGridInterFace } from "../../../shared/interfaces/ag-grid.interface";
import { propertyOf } from "../../../shared/utilities/property-of";
import { EducationFieldsFormModalComponent } from "../../components/templates";
import { FlagStateCellRenderer } from "../../../shared/components/ag-grid";
import { finalize } from "rxjs";
import { ChangeWorkShopsService } from "../../../services/change-work-shop.service";
import { EducationFieldsService } from "../../services/education-fields.service";
import { EducationFieldsDto } from "../../models/education-fields.model";
import { ConfirmInterFace } from "../../../shared/ki-components/ki-confirmation/confirm.interface";
import { Location } from "@angular/common";

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
  selectRow = new Array<EducationFieldsDto>();
  isShowLoadingDelete: boolean = false;
  isShowLoadingRefrash: boolean = false;
  constructor(
    private _educationFieldsService: EducationFieldsService,
    private _modalService: ModalService,
    private _changeWorkShops: ChangeWorkShopsService,
    private readonly _location: Location
  ) {}
  ngOnInit(): void {
    this.getEducationFieldsList();
    this._changeWorkShops.activeWorkShopsSource$.subscribe((workShopId) => {
      this.getEducationFieldsList();
    });
  }

  newWorkShpps(isEdit: boolean = false) {
    let entryId = null;
    if (isEdit) {
      entryId = this.selectRow[0].id;
    }
    this._modalService
      .open(EducationFieldsFormModalComponent, "lg", { entryId: entryId }, true)
      .then((value) => {
        this.getEducationFieldsList();
      })
      .catch((err) => {});
  }
  cancelClickHandler() {
    this._location.back();
  }
  getEducationFieldsList() {
    let model = new WorkShopsFilter();
    this.isShowLoadingRefrash = true;
    this._educationFieldsService
      .getEducationFieldsList(model)
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
    this._educationFieldsService.delete(item.id).subscribe((res) => {
      if (res.isOk) {
        this.getEducationFieldsList();
      }
    });
  }
  onSelectedRowsChangeEvent(event: Array<EducationFieldsDto>) {
    this.selectRow = new Array<EducationFieldsDto>();
    this.selectRow = event;
  }
  onRefrashSelected() {
    this.getEducationFieldsList();
  }
}
