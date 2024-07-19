import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { WorkShopsService } from "../../services/work-shops.service";
import { WorkShopsFilter } from "../../models";
import { ModalService } from "../../../shared/services";
import { AgGridInterFace } from "../../../shared/interfaces/ag-grid.interface";
import { propertyOf } from "../../../shared/utilities/property-of";
import { BenefitDeductionDto } from "../../models/benefit-deduction.model";
import { TaxService } from "../../services/tax.service";
import { TaxFormModalComponent } from "../../components/templates";
import { ChangeWorkShopsService } from "../../../services/change-work-shop.service";
import { finalize } from "rxjs";
import { TaxDto } from "../../models/tax.model";
import { ConfirmInterFace } from "../../../shared/ki-components/ki-confirmation/confirm.interface";
import { name } from "@devexpress/analytics-core/analytics-diagram";
import {
  wageOrderDetailDto,
  wageOrdersDto,
} from "../../models/wage-orders.model";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import {
  maskPrefixCurrencyCharacter,
  maskPrefixTaxRate,
} from "../../models/rul";
import { numberCellFormatter_valueFormatter } from "../../../shared/interfaces/aggrid-master";
import { SelectCellRenderer } from "../../../shared/components/ag-grid/select-cell/select-cell";

@Component({
  selector: "app-wage-orders",
  templateUrl: "./wage-orders.component.html",
  styleUrls: ["./wage-orders.component.scss"],
})
export class WageOrdersComponent implements OnInit {
  employeList = [
    {
      id: 1,
      name: "علیرضا کریمی",
    },
    {
      id: 2,
      name: "رضایی",
    },
    {
      id: 3,
      name: "امین",
    },
    {
      id: 4,
      name: "امید حیایی",
    },
    {
      id: 4,
      name: "یحیا کسری",
    },
    {
      id: 4,
      name: "حامد جوانمرد",
    },
  ];
  columnsDefault: AgGridInterFace[] = [
    {
      field: propertyOf<wageOrderDetailDto>("id"),
      hide: true,
    },
    {
      field: propertyOf<wageOrderDetailDto>("benefitDeductionId"),
      headerName: "مزایا و کسورات",
      chartDataType: "series",
      sortable: true,
      cellEditor: "agRichSelectCellEditor",
      cellRenderer: SelectCellRenderer,
      cellEditorParams: {
        values: this.selectListService.getSectionsHoleSize(),
        allowTyping: true,
        filterList: true,
        highlightMatch: true,
        valueListMaxHeight: 220,
      },
      startEditing: true,
      valueFormatter: numberCellFormatter_valueFormatter,
    },
    {
      field: propertyOf<wageOrderDetailDto>("price"),
      headerName: "مبلغ",
      editable: true,
      filter: "agNumberColumnFilter",
      cellEditor: "agNumberCellEditor",
      valueFormatter: numberCellFormatter_valueFormatter,
    },
  ];
  defaultColDef: AgGridInterFace = {
    flex: 1,
    cellEditor: true,
    filter: true,
    editable: true,
    resizable: true,
  };
  rowDataDefault = new Array<BenefitDeductionDto>();
  selectRow = new Array<BenefitDeductionDto>();
  isShowLoadingDelete: boolean = false;
  isShowLoadingRefrash: boolean = false;
  wageOrdersModel = new wageOrdersDto();
  persianBirthDate: NgbDateStruct;
  maskPrefixTaxRate = maskPrefixTaxRate;

  constructor(
    private _modalService: ModalService,
    private _changeWorkShops: ChangeWorkShopsService
  ) {}
  ngOnInit(): void {
    this._changeWorkShops.activeWorkShopsSource$.subscribe((workShopId) => {
      this.wageOrdersModel.workShopId = +workShopId;
    });
  }
  onRefrashSelected() {}

  onSelectedRowsChangeEvent(event: Array<BenefitDeductionDto>) {
    this.selectRow = new Array<BenefitDeductionDto>();
    this.selectRow = event;
  }
}
