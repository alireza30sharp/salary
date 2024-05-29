import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { WorkShopsService } from "../../services/work-shops.service";
import { WorkShopsFilter } from "../../models";
import { ModalService } from "../../../shared/services";
import { AgGridInterFace } from "../../../shared/interfaces/ag-grid.interface";
import { propertyOf } from "../../../shared/utilities/property-of";
import {
  EducationEvidencesFormModalComponent,
  TaxFormModalComponent,
} from "../../components/templates";
import { EducationEvidencesService } from "../../services/education-evidences.service";
import { EducationEvidencesDto } from "../../models/education-evidences.model";
import { FlagStateCellRenderer } from "../../../shared/components/ag-grid";
import { finalize } from "rxjs";
import { ChangeWorkShopsService } from "../../../services/change-work-shop.service";

@Component({
  selector: "app-educatio-evidences-list",
  templateUrl: "./educatio-evidences-list.component.html",
  styleUrls: ["./educatio-evidences-list.component.scss"],
  providers: [EducationEvidencesService],
})
export class EducationEvidencesListComponent implements OnInit {
  columnsDefault: AgGridInterFace[] = [
    {
      field: propertyOf<EducationEvidencesDto>("id"),
      headerName: "row_NO",
      hide: true,
    },
    {
      field: propertyOf<EducationEvidencesDto>("workShopId"),
      hide: true,
    },

    {
      field: propertyOf<EducationEvidencesDto>("evidence"),
      headerName: "مدرک",
      filter: "agTextColumnFilter",
    },
    {
      field: propertyOf<EducationEvidencesDto>("orderIndex"),
      headerName: "ترتیب",
      filter: "agTextColumnFilter",
    },
    {
      field: propertyOf<EducationEvidencesDto>("isDefault"),
      headerName: "پیش فرض",
      cellRenderer: FlagStateCellRenderer,
    },
  ];
  rowDataDefault = new Array<EducationEvidencesDto>();
  selectRow = new Array<EducationEvidencesDto>();
  isShowLoadingDelete: boolean = false;
  isShowLoadingRefrash: boolean = false;
  constructor(
    private _educationEvidencesService: EducationEvidencesService,
    private _modalService: ModalService,
    private _changeWorkShops: ChangeWorkShopsService
  ) {}
  ngOnInit(): void {
    this.getEducationEvidencesList();
    this._changeWorkShops.activeWorkShopsSource$.subscribe((workShopId) => {
      this.getEducationEvidencesList();
    });
  }

  newWorkShpps(isEdit: boolean = false) {
    let entryId = null;
    if (isEdit) {
      entryId = this.selectRow[0].id;
    }
    this._modalService
      .open(
        EducationEvidencesFormModalComponent,
        "lg",
        { entryId: entryId },
        true
      )
      .then((value) => {
        this.getEducationEvidencesList();
      })
      .catch((err) => {});
  }
  getEducationEvidencesList() {
    let model = new WorkShopsFilter();
    this.isShowLoadingRefrash = true;
    this._educationEvidencesService
      .getEducationEvidencesList(model)
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

  onDeleteItem(item: EducationEvidencesDto) {
    this._educationEvidencesService.delete(item.id).subscribe((res) => {
      if (res.isOk) {
        this.getEducationEvidencesList();
      }
    });
  }
  onSelectedRowsChangeEvent(event: Array<EducationEvidencesDto>) {
    this.selectRow = new Array<EducationEvidencesDto>();
    this.selectRow = event;
  }
  onRefrashSelected() {
    this.getEducationEvidencesList();
  }
}
