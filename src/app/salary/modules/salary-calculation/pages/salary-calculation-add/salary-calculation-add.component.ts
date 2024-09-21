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
      headerName: "کارکرد روزانه",
      cellClass: "text-center",
      children: [
        {
          headerName: "روز",
          editable: true,
          cellEditor: "agNumberCellEditor",
          cellEditorParams: {
            min: 0,
            max: 31,
          },
          field: propertyOf<addWorkingTimesDetailDto>("dayWorkShiftDays"),
          cellRenderer: "agAnimateShowChangeCellRenderer",
          width: 80,
          aggFunc: "sum",
        },
        {
          field: propertyOf<addWorkingTimesDetailDto>("dayWorkShiftHours"),
          headerName: "ساعت",
          editable: true,
          valueFormatter: timeCellFormatter,
          cellEditor: CellEditorTimeComponent,
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
      ],
    },
    {
      headerName: "مرخصی",
      cellClass: "text-center",
      children: [
        {
          headerName: "روز",
          editable: true,
          cellEditor: "agNumberCellEditor",
          cellEditorParams: {
            min: 0,
            max: 31,
          },
          field: propertyOf<addWorkingTimesDetailDto>("sickLeaveDays"),
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
          field: propertyOf<addWorkingTimesDetailDto>("sickLeaveHours"),
          headerName: "ساعت",
          editable: true,
          valueFormatter: timeCellFormatter,
          cellEditor: CellEditorTimeComponent,
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
          headerName: "روز",
          editable: true,
          cellEditor: "agNumberCellEditor",
          cellEditorParams: {
            min: 0,
            max: 31,
          },
          field: propertyOf<addWorkingTimesDetailDto>("withOutPayLeaveDays"),
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
          field: propertyOf<addWorkingTimesDetailDto>("withOutPayLeaveHours"),
          headerName: "ساعت",
          editable: true,
          valueFormatter: timeCellFormatter,
          cellEditor: CellEditorTimeComponent,
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
      ],
    },
    {
      headerName: "کسری کار",
      cellClass: "text-center",
      children: [
        {
          headerName: "روز",
          editable: true,
          cellEditor: "agNumberCellEditor",
          cellEditorParams: {
            min: 0,
            max: 31,
          },
          field: propertyOf<addWorkingTimesDetailDto>("workDeficitDays"),
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
          field: propertyOf<addWorkingTimesDetailDto>("workDeficitHours"),
          headerName: "ساعت",
          editable: true,
          valueFormatter: timeCellFormatter,
          cellEditor: CellEditorTimeComponent,
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
      ],
    },
    {
      headerName: "روز غیبت",
      cellClass: "text-center",
      children: [
        {
          headerName: "روز",
          editable: true,
          cellEditor: "agNumberCellEditor",
          cellEditorParams: {
            min: 0,
            max: 31,
          },
          field: propertyOf<addWorkingTimesDetailDto>("absenceDays"),
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
          field: propertyOf<addWorkingTimesDetailDto>("absanceHours"),
          headerName: "ساعت",
          editable: true,
          valueFormatter: timeCellFormatter,
          cellEditor: CellEditorTimeComponent,
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
      ],
    },
    {
      headerName: "ماموریت",
      cellClass: "text-center",
      children: [
        {
          headerName: "روز",
          editable: true,
          cellEditor: "agNumberCellEditor",
          cellEditorParams: {
            min: 0,
            max: 31,
          },
          field: propertyOf<addWorkingTimesDetailDto>("missionDays"),
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
          field: propertyOf<addWorkingTimesDetailDto>("missionHours"),
          headerName: "ساعت",
          editable: true,
          valueFormatter: timeCellFormatter,
          cellEditor: CellEditorTimeComponent,
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
      ],
    },
    {
      headerName: "شب کاری",
      cellClass: "text-center",
      children: [
        {
          headerName: "روز",
          editable: true,
          cellEditor: "agNumberCellEditor",
          cellEditorParams: {
            min: 0,
            max: 31,
          },
          field: propertyOf<addWorkingTimesDetailDto>("nightWorkShiftDays"),
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
          field: propertyOf<addWorkingTimesDetailDto>("nightWorkShiftHours"),
          headerName: "ساعت",
          editable: true,
          valueFormatter: timeCellFormatter,
          cellEditor: CellEditorTimeComponent,
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
      ],
    },
    {
      headerName: "اضافه کاری",
      cellClass: "text-center",
      children: [
        {
          headerName: "روز",
          editable: true,
          cellEditor: "agNumberCellEditor",
          cellEditorParams: {
            min: 0,
            max: 31,
          },
          field: propertyOf<addWorkingTimesDetailDto>("overTimeWorkShiftDays"),
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
          field: propertyOf<addWorkingTimesDetailDto>("overTimeWorkShiftHours"),
          headerName: "ساعت",
          editable: true,
          valueFormatter: timeCellFormatter,
          cellEditor: CellEditorTimeComponent,
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
      ],
    },
    {
      headerName: "تعطیل کاری",
      cellClass: "text-center",
      children: [
        {
          headerName: "روز",
          editable: true,
          cellEditor: "agNumberCellEditor",
          cellEditorParams: {
            min: 0,
            max: 31,
          },
          field: propertyOf<addWorkingTimesDetailDto>("vacationDays"),
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
          field: propertyOf<addWorkingTimesDetailDto>("vacationHours"),
          headerName: "ساعت",
          editable: true,
          valueFormatter: timeCellFormatter,
          cellEditor: CellEditorTimeComponent,
          width: 80,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
      ],
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
    this.addDraftDto.monthNum = DateUtilies.getCurrentMonth().value;
    this.addDraftDto.yearNum = DateUtilies.getCurrentYear();
  }
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
            this.rowDataDefault = res.data;
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
