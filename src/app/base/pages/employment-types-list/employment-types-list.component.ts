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
import { EmploymentTypesDto } from "../../models/employment-types.model";
import { EmploymentTypesService } from "../../services/employment-types.service";
import { ConfirmInterFace } from "../../../shared/ki-components/ki-confirmation/confirm.interface";

@Component({
  selector: "app-employment-types-list",
  templateUrl: "./employment-types-list.component.html",
  styleUrls: ["./employment-types-list.component.scss"],
  providers: [EmploymentTypesService],
})
export class EmploymentTypesListComponent implements OnInit {
  columnsDefault: AgGridInterFace[] = [
    {
      field: propertyOf<EmploymentTypesDto>("id"),
      headerName: "row_NO",
      hide: true,
    },
    {
      field: propertyOf<EmploymentTypesDto>("workShopId"),
      hide: true,
    },

    {
      field: propertyOf<EmploymentTypesDto>("typeText"),
      headerName: "نوع استخدامی",
      filter: "agTextColumnFilter",
    },
    {
      field: propertyOf<EmploymentTypesDto>("orderIndex"),
      headerName: "ترتیب",
      filter: "agTextColumnFilter",
    },
    {
      field: propertyOf<EmploymentTypesDto>("isDefault"),
      headerName: "پیش فرض",
      cellRenderer: FlagStateCellRenderer,
    },
  ];
  rowDataDefault = new Array<EmploymentTypesDto>();
  selectRow = new Array<EmploymentTypesDto>();
  isShowLoadingDelete: boolean = false;
  isShowLoadingRefrash: boolean = false;
  constructor(
    private _employmentTypesService: EmploymentTypesService,
    private _modalService: ModalService,
    private _changeWorkShops: ChangeWorkShopsService
  ) {}
  ngOnInit(): void {
    this.getAllEducationEvidences();
    this._changeWorkShops.activeWorkShopsSource$.subscribe((workShopId) => {
      this.getAllEducationEvidences();
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
        this.getAllEducationEvidences();
      })
      .catch((err) => {});
  }
  getAllEducationEvidences() {
    let model = new WorkShopsFilter();
    this.isShowLoadingRefrash = true;
    this._employmentTypesService
      .getAllEducationEvidences(model)
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
      title: "حذف" + " " + `"${this.selectRow[0].typeText.toUpperCase()}"`,
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

  onDeleteItem(item: EmploymentTypesDto) {
    this._employmentTypesService.delete(item.id).subscribe((res) => {
      if (res.isOk) {
        this.getAllEducationEvidences();
      }
    });
  }
  onSelectedRowsChangeEvent(event: Array<EmploymentTypesDto>) {
    this.selectRow = new Array<EmploymentTypesDto>();
    this.selectRow = event;
  }
  onRefrashSelected() {
    this.getAllEducationEvidences();
  }
}
