import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ModalService, SelectListService } from "../../../../shared/services";
import { AgGridInterFace } from "../../../../shared/interfaces/ag-grid.interface";
import { propertyOf } from "../../../../shared/utilities/property-of";
import { ChangeWorkShopsService } from "../../../../services/change-work-shop.service";
import { delay, finalize } from "rxjs";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

import { numberCellFormatter_valueFormatter } from "../../../../shared/interfaces/aggrid-master";
import {
  CellEditorNumberComponent,
  SelectUnitComponent,
} from "../../../../shared/components/ag-grid";
import { SelectCellRendererParams } from "../../../../shared/components/ag-grid/select-cell-render/select-cell-render";
import { ClientPrerequisitsService } from "../../../../services/client-prerequisits";
import {
  cacheKeyEnum,
  clientPrerequisitsInterface,
} from "../../../../shared/models/clientPrerequisits";
import { SelectOptionInterface } from "../../../../shared/interfaces/select-option.interface";
import { DateUtilies } from "../../../../shared/utilities/Date";
import { ToastService } from "../../../../shared/services";

import { WageOrdersService } from "../../services/wage-orders.service";
import { wageOrderDetailDto, wageOrdersDto } from "../../models";
import { maskPrefixTaxRate } from "../../../../base/models/rul";
import { Location } from "@angular/common";
@Component({
  selector: "app-wage-orders-add",
  templateUrl: "./wage-orders-add.component.html",
  styleUrls: ["./wage-orders-add.component.scss"],
  providers: [WageOrdersService],
})
export class WageOrdersAddComponent implements OnInit {
  employeList?: SelectOptionInterface<any>[];
  benefitDeductions?: SelectOptionInterface<any>[];
  columnsDefault: AgGridInterFace[] = [
    {
      field: propertyOf<wageOrderDetailDto>("id"),
      hide: true,
    },
    {
      headerName: "ردیف",
      valueGetter: "node.rowIndex + 1",
    },
    {
      field: propertyOf<wageOrderDetailDto>("benefitDeductionId"),
      headerName: "مزایا و کسورات",
      cellEditor: SelectUnitComponent,
      cellRenderer: SelectCellRendererParams,
      cellEditorParams: {
        values: this._selectListService.getSectionsHoleSize(),
        allowTyping: true,
        filterList: true,
        highlightMatch: true,
        valueListMaxHeight: 220,
      },
      startEditing: true,
      editable: true,
      requerd: true,
    },
    {
      field: propertyOf<wageOrderDetailDto>("price"),
      headerName: "مبلغ",
      editable: true,
      cellClass: "text-center",
      filter: "agNumberColumnFilter",
      cellEditor: CellEditorNumberComponent,
      valueFormatter: numberCellFormatter_valueFormatter,
    },
    {
      field: propertyOf<wageOrderDetailDto>("calculateOnInsurance"),
      headerName: "محاسبه روی بیمه",
      editable: true,
      cellClass: "text-center center-content",
      cellRenderer: "agCheckboxCellRenderer",
      cellEditor: "agCheckboxCellEditor",
    },
    {
      field: propertyOf<wageOrderDetailDto>("calculateOnTax"),
      headerName: "محاسبه روی مالیات",
      editable: true,
      cellClass: "text-center center-content",
      cellRenderer: "agCheckboxCellRenderer",
      cellEditor: "agCheckboxCellEditor",
    },
  ];
  defaultColDef: AgGridInterFace = {
    flex: 1,

    filter: true,

    resizable: true,
  };
  editType: "fullRow";
  isEditMode: boolean = true;
  rowDataDefault = new Array<wageOrderDetailDto>();
  selectRow = new Array<wageOrderDetailDto>();
  isShowLoadingDelete: boolean = false;
  showLoading: boolean = false;
  isShowLoadingRefrash: boolean = false;
  wageOrdersModel = new wageOrdersDto();
  persianBirthDate: NgbDateStruct;
  maskPrefixTaxRate = maskPrefixTaxRate;
  listclientPrerequisits: clientPrerequisitsInterface[];
  cacheKeyType = cacheKeyEnum;
  constructor(
    private _modalService: ModalService,
    private _changeWorkShops: ChangeWorkShopsService,
    private _selectListService: SelectListService,
    private _toastService: ToastService,
    private _wageOrdersService: WageOrdersService,
    private readonly _location: Location
  ) {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this._changeWorkShops.employeListData$
      .pipe(delay(100))
      .subscribe((employeList) => {
        if (employeList) {
          this.employeList = employeList;
        }
      });
    this._changeWorkShops.benefitDeductionsData$
      .pipe(delay(100))
      .subscribe((benefitDeductionsData) => {
        if (benefitDeductionsData) {
          this.benefitDeductions = benefitDeductionsData;
        }
      });
    this._changeWorkShops.activeWorkShopsSource$
      .pipe(delay(100))
      .subscribe((workShopId) => {
        this.wageOrdersModel.workShopId = +workShopId;
      });
  }
  clickSearchHander() {
    this.showLoading = true;

    this.wageOrdersModel.persianStartDate = DateUtilies.convertDate(
      this.persianBirthDate
    );
    if (
      this.wageOrdersModel?.details &&
      this.wageOrdersModel.details.length > 0
    ) {
      this._wageOrdersService
        .create(this.wageOrdersModel)
        .pipe(
          finalize(() => {
            this.showLoading = false;
          })
        )
        .subscribe({
          next: (res) => {
            if (res.isOk) {
              this.isEditMode = false;
              this._toastService.success(res.data.message);
              this.resateData();
              setTimeout(() => {
                this.isEditMode = true;
              }, 100);
            }
          },
          error: (err) => {
            let msg = "";
            if (err.error.messages) {
              this._toastService.error(err.error.messages);
              msg = err.error.messages.join(" ");
            } else if (err.error.message) {
              this._toastService.error(err.error.message);
            }
          },
        });
    } else {
      this._toastService.error(
        "لطفا لیست مزایاو کسورات را برای کارمند مشخص کنید"
      );
      this.showLoading = false;
    }
  }
  onRefrashSelected() {}
  saveCellHandeler(details: wageOrderDetailDto[]) {
    this.wageOrdersModel.details = [];
    details = details.map((d) => {
      d.id = "0";
      return d;
    });
    this.wageOrdersModel.details = [...details];
  }
  cancelClickHandler() {
    this._location.back();
  }
  resateData() {
    this.rowDataDefault = new Array<wageOrderDetailDto>();
    this.wageOrdersModel.comment = null;
    this.wageOrdersModel.details = null;
    this.wageOrdersModel.employerInsurance = null;
    this.wageOrdersModel.hasInsurance = false;
    this.wageOrdersModel.isTaxable = false;
    this.wageOrdersModel.persianStartDate = null;
    this.wageOrdersModel.unEmploymentInsurance = null;
    this.wageOrdersModel.workerInsurance = null;
    this.wageOrdersModel.employeeId = null;
    this.persianBirthDate = null;
  }
  onSelectedRowsChangeEvent(event: Array<wageOrdersDto>) {}
}
