import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { WorkShopsService } from "../../services/work-shops.service";
import { WorkShopsFilter } from "../../models";
import { ModalService } from "../../../shared/services";
import { BenefitDeductionService } from "../../services/benefit-deduction.service";
import { BenefitDeductionFormModalComponent } from "../../components/templates/benefit-deduction-form-modal/benefit-deduction-form-modal.component";
import { AgGridInterFace } from "../../../shared/interfaces/ag-grid.interface";
import { propertyOf } from "../../../shared/utilities/property-of";
import { BenefitDeductionDto } from "../../models/benefit-deduction.model";
import { finalize } from "rxjs";
import { ChangeWorkShopsService } from "../../../services/change-work-shop.service";

@Component({
  selector: "app-benefit-deduction-list",
  templateUrl: "./benefit-deduction-list.component.html",
  styleUrls: ["./benefit-deduction-list.component.scss"],
  providers: [BenefitDeductionService],
})
export class BenefitDeductionListComponent implements OnInit {
  columnsDefault: AgGridInterFace[] = [
    {
      field: propertyOf<BenefitDeductionDto>("row_NO"),
      headerName: "row_NO",
      hide: true,
    },
    {
      field: propertyOf<BenefitDeductionDto>("workShopId"),
      hide: true,
    },
    {
      field: propertyOf<BenefitDeductionDto>("id"),
      hide: true,
    },
    {
      field: propertyOf<BenefitDeductionDto>("idMoin"),
      hide: true,
    },
    {
      field: propertyOf<BenefitDeductionDto>("idTafsili"),
      hide: true,
    },
    {
      field: propertyOf<BenefitDeductionDto>("idTafsili2"),
      hide: true,
      filter: "agTextColumnFilter",
    },
    {
      field: propertyOf<BenefitDeductionDto>("code"),
      headerName: "کد",
      filter: "agNumberColumnFilter",
    },
    {
      field: propertyOf<BenefitDeductionDto>("nameMoin"),
      headerName: "معین",
      filter: "agTextColumnFilter",
    },
    {
      field: propertyOf<BenefitDeductionDto>("name"),
      headerName: "نام",
      filter: "agTextColumnFilter",
    },
    {
      field: propertyOf<BenefitDeductionDto>("nameTafsili"),
      headerName: "تفضیلی",
    },
    {
      field: propertyOf<BenefitDeductionDto>("nameTafsili2"),
      headerName: "تفضیلی2",
      filter: "agTextColumnFilter",
    },
    {
      field: propertyOf<BenefitDeductionDto>("typeName"),
      headerName: "نوع",
      filter: "agTextColumnFilter",
    },
  ];
  rowDataDefault = new Array<BenefitDeductionDto>();
  selectRow = new Array<BenefitDeductionDto>();
  isShowLoadingDelete: boolean = false;
  isShowLoadingRefrash: boolean = false;
  constructor(
    private _benefitDeductionService: BenefitDeductionService,
    private _modalService: ModalService,
    private _changeWorkShops: ChangeWorkShopsService
  ) {}
  ngOnInit(): void {
    this.getGetBenefitsDeductionsList();
    this._changeWorkShops.activeWorkShopsSource$.subscribe((workShopId) => {
      this.getGetBenefitsDeductionsList();
    });
  }

  newWorkShpps(isEdit: boolean = false) {
    let entryId = null;
    if (isEdit) {
      entryId = this.selectRow[0].id;
    }
    this._modalService
      .open(BenefitDeductionFormModalComponent, "lg", { entryId: entryId })
      .then((value) => {
        this.getGetBenefitsDeductionsList();
      })
      .catch((err) => {});
  }
  getGetBenefitsDeductionsList() {
    this.isShowLoadingRefrash = true;
    let model = new WorkShopsFilter();
    this._benefitDeductionService
      .getGetBenefitsDeductionsList(model)
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

  onDeleteItem(item: BenefitDeductionDto) {
    this.isShowLoadingDelete = true;
    this._benefitDeductionService
      .deleteBenefitDeduction(item.id)
      .pipe(
        finalize(() => {
          this.isShowLoadingDelete = false;
        })
      )
      .subscribe((res) => {
        if (res.isOk) {
          this.getGetBenefitsDeductionsList();
        }
      });
  }
  onSelectedRowsChangeEvent(event: Array<BenefitDeductionDto>) {
    this.selectRow = new Array<BenefitDeductionDto>();
    this.selectRow = event;
  }
  onRefrashSelected() {
    this.getGetBenefitsDeductionsList();
  }
}
