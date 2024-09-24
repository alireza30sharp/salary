import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  ModalService,
  SelectListService,
} from "./../../../../../shared/services";
import { AgGridInterFace } from "./../../../../../shared/interfaces/ag-grid.interface";
import { propertyOf } from "./../../../../../shared/utilities/property-of";
import { ChangeWorkShopsService } from "../../../../../services/change-work-shop.service";
import { delay, finalize } from "rxjs";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

import {
  numberCellFormatter_valueFormatter,
  numberValueParser,
  timeCellFormatter,
} from "../../../../../shared/interfaces/aggrid-master";
import {
  CellEditorCheckboxComponent,
  CellEditorNumberComponent,
  CellEditorTimeComponent,
  SelectUnitComponent,
  SumRenderer,
} from "./../../../../../shared/components/ag-grid";
import { SelectCellRendererParams } from "./../../../../../shared/components/ag-grid/select-cell-render/select-cell-render";
import {
  cacheKeyEnum,
  clientPrerequisitsInterface,
} from "./../../../../../shared/models/clientPrerequisits";
import { SelectOptionInterface } from "../../../../../shared/interfaces/select-option.interface";
import { DateUtilies } from "../../../../../shared/utilities/Date";
import { ToastService } from "./../../../../../shared/services";

import { salaryCalculationService } from "../../services/salaryCalculation.service";
import {
  addDraftDto,
  addWorkingTimesDetailDto,
  addWorkingTimesDto,
} from "../../models";
import {
  maskPrefixTaxRate,
  monthlyList,
} from "../../../../../salary/models/rul";
import { Location } from "@angular/common";
import { ConfirmInterFace } from "./../../../../../shared/ki-components/ki-confirmation/confirm.interface";
@Component({
  selector: "app-salary-calculation-add",
  templateUrl: "./salary-calculation-add.component.html",
  styleUrls: ["./salary-calculation-add.component.scss"],
  providers: [salaryCalculationService],
})
export class SalaryCalculationAddComponent implements OnInit {
  employeList?: SelectOptionInterface<any>[];
  benefitDeductions?: SelectOptionInterface<any>[];
  columnsDefault: AgGridInterFace[] = [
    {
      field: propertyOf<addWorkingTimesDetailDto>("id"),
      hide: true,
    },
    {
      headerName: "ردیف",
      width: 100,
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
      cellRenderer: (params) => {
        if (params.node.rowPinned) {
          return "جمع کل:";
        }
        return params.node.rowIndex + 1;
      },
    },

    {
      field: propertyOf<addWorkingTimesDetailDto>("code"),
      headerName: "کد",
      cellClass: "text-center",
      width: 80,
    },
    {
      field: propertyOf<addWorkingTimesDetailDto>("employeeId"),
      headerName: "نام و نام   خانوادگی",
      cellEditor: SelectUnitComponent,
      cellRenderer: SelectCellRendererParams,
      cellEditorParams: {
        values: this._changeWorkShops.employeListData$,
        allowTyping: true,
        filterList: true,
        highlightMatch: true,
        valueListMaxHeight: 220,
      },
      width: 150,
    },
    {
      headerName: "",
      cellClass: "text-center",
      children: [
        {
          headerName: "totalAdvance",
          editable: true,
          cellEditor: "agNumberCellEditor",
          field: propertyOf<addWorkingTimesDetailDto>("totalAdvance"),
          cellRenderer: "agAnimateShowChangeCellRenderer",
          width: 80,
          aggFunc: "sum",
        },
        {
          field: propertyOf<addWorkingTimesDetailDto>("mozdRoozane"),
          headerName: "mozdRoozane",
          editable: true,
          cellEditor: "agNumberCellEditor",
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
      ],
    },
    {
      headerName: "mozdMahane",
      cellClass: "text-center",
      children: [
        {
          headerName: "mozdMahane",
          editable: true,
          cellEditor: "agNumberCellEditor",
          field: propertyOf<addWorkingTimesDetailDto>("mozdMahane"),
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
          field: propertyOf<addWorkingTimesDetailDto>("ezefekari"),
          headerName: "ezefekari",
          editable: true,
          cellEditor: "agNumberCellEditor",
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
      ],
    },
    {
      headerName: "مرخصی بدون حقوق",
      cellClass: "text-center",
      children: [
        {
          headerName: "haghOlad",
          editable: true,
          cellEditor: "agNumberCellEditor",
          field: propertyOf<addWorkingTimesDetailDto>("haghOlad"),
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
          field: propertyOf<addWorkingTimesDetailDto>("haghMaskan"),
          headerName: "haghMaskan",
          editable: true,
          cellEditor: "agNumberCellEditor",
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
      ],
    },
    {
      headerName: "haghBon",
      cellClass: "text-center",
      children: [
        {
          headerName: "روز",
          editable: true,
          cellEditor: "agNumberCellEditor",
          field: propertyOf<addWorkingTimesDetailDto>("haghBon"),
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
          field: propertyOf<addWorkingTimesDetailDto>("mamooriat"),
          headerName: "mamooriat",
          editable: true,
          cellEditor: "agNumberCellEditor",
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
      ],
    },
    {
      headerName: "mosaede",
      cellClass: "text-center",
      children: [
        {
          headerName: "mosaede",
          editable: true,
          cellEditor: "agNumberCellEditor",
          field: propertyOf<addWorkingTimesDetailDto>("mosaede"),
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
          field: propertyOf<addWorkingTimesDetailDto>("payeSanavat"),
          headerName: "payeSanavat",
          editable: true,
          cellEditor: "agNumberCellEditor",
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
      ],
    },
    {
      headerName: "padash",
      cellClass: "text-center",
      children: [
        {
          headerName: "padash",
          editable: true,
          cellEditor: "agNumberCellEditor",
          field: propertyOf<addWorkingTimesDetailDto>("padash"),
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
          field: propertyOf<addWorkingTimesDetailDto>("eydi"),
          headerName: "eydi",
          editable: true,
          cellEditor: "agNumberCellEditor",
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
      ],
    },
    {
      headerName: "sanavatPayanSal",
      cellClass: "text-center",
      children: [
        {
          headerName: "sanavatPayanSal",
          editable: true,
          cellEditor: "agNumberCellEditor",
          field: propertyOf<addWorkingTimesDetailDto>("sanavatPayanSal"),
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
          field: propertyOf<addWorkingTimesDetailDto>("jamMazaya"),
          headerName: "jamMazaya",
          editable: true,
          cellEditor: "agNumberCellEditor",
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
      ],
    },
    {
      headerName: "kasriKar",
      cellClass: "text-center",
      children: [
        {
          headerName: "روز",
          editable: true,
          cellEditor: "agNumberCellEditor",
          field: propertyOf<addWorkingTimesDetailDto>("kasriKar"),
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
          field: propertyOf<addWorkingTimesDetailDto>("tashilat"),
          headerName: "tashilat",
          editable: true,
          cellEditor: "agNumberCellEditor",
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
      ],
    },

    {
      field: propertyOf<addWorkingTimesDetailDto>("sayerKosoorat"),
      headerName: "sayerKosoorat",
      editable: true,
      cellEditor: "agNumberCellEditor",
      width: 80,
      aggFunc: "sum",
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      field: propertyOf<addWorkingTimesDetailDto>("jamKosoorat"),
      headerName: "jamKosoorat",
      editable: true,
      cellEditor: "agNumberCellEditor",
      width: 80,
      aggFunc: "sum",
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      field: propertyOf<addWorkingTimesDetailDto>("jamHoghogh"),
      headerName: "jamHoghogh",
      editable: true,
      cellEditor: "agNumberCellEditor",
      width: 80,
      aggFunc: "sum",
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      field: propertyOf<addWorkingTimesDetailDto>("jamHoghooghMashmool"),
      headerName: "jamHoghooghMashmool",
      editable: true,
      cellEditor: "agNumberCellEditor",
      width: 80,
      aggFunc: "sum",
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      field: propertyOf<addWorkingTimesDetailDto>("bimePardakhti"),
      headerName: "bimePardakhti",
      editable: true,
      cellEditor: "agNumberCellEditor",
      width: 80,
      aggFunc: "sum",
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      field: propertyOf<addWorkingTimesDetailDto>("maliatPardakhti"),
      headerName: "maliatPardakhti",
      editable: true,
      cellEditor: "agNumberCellEditor",
      width: 80,
      aggFunc: "sum",
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      field: propertyOf<addWorkingTimesDetailDto>("jamKhalesPardakhti"),
      headerName: "jamKhalesPardakhti",
      editable: true,
      cellEditor: "agNumberCellEditor",
      width: 80,
      aggFunc: "sum",
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
  ];
  defaultColDef: AgGridInterFace = {
    filter: false,
    suppressHeaderMenuButton: true,
    resizable: true,
    suppressSizeToFit: true,
    enableCellChangeFlash: true,
    width: 100,
  };

  editType: "fullRow";
  rowDataDefault = new Array<any>();
  selectRow = new Array<addWorkingTimesDetailDto>();
  listResult = new Array<addWorkingTimesDetailDto>();
  isShowLoadingDelete: boolean = false;
  showLoading: boolean = false;
  isShowLoadingRefrash: boolean = false;
  showLoadingDelete: boolean = false;
  persianBirthDate: NgbDateStruct;
  maskPrefixTaxRate = maskPrefixTaxRate;
  yearlyList = [];
  monthlyList = monthlyList;
  listclientPrerequisits: clientPrerequisitsInterface[];
  cacheKeyType = cacheKeyEnum;
  model: NgbDateStruct;
  addDraftDto = new addDraftDto();
  addWorkingTimesDto = new addWorkingTimesDto();
  constructor(
    private _changeWorkShops: ChangeWorkShopsService,
    private _toastService: ToastService,
    private _salaryCalculationService: salaryCalculationService,
    private readonly _location: Location,
    private _modalService: ModalService
  ) {
    this.persianBirthDate = DateUtilies.convertDateToNgbDateStruct(
      new Date().toLocaleDateString()
    );
  }
  ngOnInit(): void {
    this.yearlyList = DateUtilies.generateYearlyList();
    this.addDraftDto.month = DateUtilies.getCurrentMonth().value;
    this.addDraftDto.year = DateUtilies.getCurrentYear();
  }
  saveCellHandeler(data) {}
  ngAfterViewInit(): void {
    this._changeWorkShops.employeListData$
      .pipe(delay(100))
      .subscribe((employeList) => {
        if (employeList) {
          this.employeList = employeList;
        }
      });
  }
  handleMonthSelect(event: { month: number; year: number }) {
    console.log("Selected month:", event.month, "Selected year:", event.year);
  }
  clickSearchHander() {
    this.showLoading = true;
    this._salaryCalculationService
      .Add(this.addDraftDto)
      .pipe(
        finalize(() => {
          this.showLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          if (res.isOk) {
            this._toastService.success(res.data.message);
            this.rowDataDefault = res.data.salaryList;
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
  }

  onRefrashSelected() {}
  saveHander() {}
  selectedRowsChange(details: addWorkingTimesDetailDto[]) {
    this.selectRow = details;
  }

  cancelClickHandler() {
    this._location.back();
  }
  removeCell() {
    const params: ConfirmInterFace = {
      acceptText: "بله",
      declineText: "خیر",
      description: "آیا از عملیات مورد نظر اطمینان دارید؟",
      title: "حذف" + " " + `"${this.selectRow.map((f) => f.code).toString()}"`,
      type: "Confirm",
    };
    this._modalService.showConfirm(params, false).then((res) => {
      if (res) {
        if (this.selectRow.length) {
          let model: any = {
            deleteWorkingTimesId: this.selectRow.map((f) => {
              return { id: f.id };
            }),
            workShopId: null,
          };
          this.onDeleteItem(model);
        }
      }
    });
  }

  onDeleteItem(item: any) {
    this.showLoadingDelete = true;
    this._salaryCalculationService
      .delete(item)
      .pipe(
        finalize(() => {
          this.showLoadingDelete = false;
        })
      )
      .subscribe({
        next: (res) => {
          if (res.isOk) {
            this.clickSearchHander();
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
  onSelectedRowsChangeEvent(event: Array<any>) {}
}
