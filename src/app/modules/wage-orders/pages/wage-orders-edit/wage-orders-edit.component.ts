import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ModalService, SelectListService } from "../../../../shared/services";
import { AgGridInterFace } from "../../../../shared/interfaces/ag-grid.interface";
import { propertyOf } from "../../../../shared/utilities/property-of";
import { ChangeWorkShopsService } from "../../../../services/change-work-shop.service";
import { finalize } from "rxjs";
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
import { WageOrdersService } from "../../services/wage-orders.service";
import { wageOrderDetailDto, wageOrdersDto } from "../../models";
import { maskPrefixTaxRate } from "../../../../base/models/rul";

@Component({
  selector: "app-wage-orders-edit",
  templateUrl: "./wage-orders-edit.component.html",
  styleUrls: ["./wage-orders-edit.component.scss"],
  providers: [WageOrdersService],
})
export class WageOrdersEditComponent implements OnInit {
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
    private _clientPrerequis: ClientPrerequisitsService,
    private _wageOrdersService: WageOrdersService
  ) {
    this._clientPrerequis.getClientPrerequisits().subscribe((res) => {
      if (res.isOk) {
        this.listclientPrerequisits = res.data;
        this.employeList = this.listclientPrerequisits
          .find((f) => f.cacheKey == this.cacheKeyType.employees)
          .cacheData.map((item) => ({
            label: item.name,
            value: item.id,
          }));
        this.benefitDeductions = this.listclientPrerequisits
          .find((f) => f.cacheKey == this.cacheKeyType.company_types)
          .cacheData.map((item) => ({
            label: item.desc,
            value: item.code,
          }));
      }
    });
  }
  ngOnInit(): void {
    this._changeWorkShops.activeWorkShopsSource$.subscribe((workShopId) => {
      this.wageOrdersModel.workShopId = +workShopId;
    });
  }
  clickSearchHander() {
    debugger;
    this.showLoading = true;
    this.wageOrdersModel.persianStartDate = DateUtilies.convertDate(
      this.persianBirthDate
    );
    if (this.wageOrdersModel.details.length > 0) {
      this._wageOrdersService
        .create(this.wageOrdersModel)
        .pipe(
          finalize(() => {
            this.showLoading = false;
          })
        )
        .subscribe({
          next: (res) => {
            console.table(res);
          },
        });
    }
  }
  onRefrashSelected() {}
  saveCellHandeler(details: wageOrderDetailDto[]) {
    this.wageOrdersModel.details = [];
    this.wageOrdersModel.details = [...details];
  }
  onSelectedRowsChangeEvent(event: Array<wageOrdersDto>) {}
}
