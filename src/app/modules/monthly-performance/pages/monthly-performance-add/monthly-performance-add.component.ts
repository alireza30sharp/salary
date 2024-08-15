import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ModalService, SelectListService } from "../../../../shared/services";
import { AgGridInterFace } from "../../../../shared/interfaces/ag-grid.interface";
import { propertyOf } from "../../../../shared/utilities/property-of";
import { ChangeWorkShopsService } from "../../../../services/change-work-shop.service";
import { delay, finalize } from "rxjs";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

import {
  numberCellFormatter_valueFormatter,
  timeCellFormatter,
} from "../../../../shared/interfaces/aggrid-master";
import {
  CellEditorCheckboxComponent,
  CellEditorNumberComponent,
  CellEditorTimeComponent,
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

import { MonthlyPerformanceService } from "../../services/monthlyPerformance.service";
import {
  addDraftDto,
  addWorkingTimesDetailDto,
  addWorkingTimesDto,
} from "../../models";
import { maskPrefixTaxRate, monthlyList } from "../../../../base/models/rul";
import { Location } from "@angular/common";
@Component({
  selector: "app-monthly-performance-add",
  templateUrl: "./monthly-performance-add.component.html",
  styleUrls: ["./monthly-performance-add.component.scss"],
  providers: [MonthlyPerformanceService],
})
export class MonthlyPerformanceAddComponent implements OnInit {
  employeList?: SelectOptionInterface<any>[];
  benefitDeductions?: SelectOptionInterface<any>[];
  columnsDefault: AgGridInterFace[] = [
    {
      field: propertyOf<addWorkingTimesDetailDto>("id"),
      hide: true,
    },
    {
      headerName: "ردیف",
      valueGetter: "node.rowIndex + 1",
    },
    {
      field: propertyOf<addWorkingTimesDetailDto>("code"),
      headerName: "کد",
      editable: true,
      cellClass: "text-center",
      filter: "agNumberColumnFilter",
      cellEditor: CellEditorNumberComponent,
      valueFormatter: numberCellFormatter_valueFormatter,
    },
    {
      field: propertyOf<addWorkingTimesDetailDto>("employeeId"),
      headerName: "نام و نام خانوادگی",
      cellEditor: SelectUnitComponent,
      cellRenderer: SelectCellRendererParams,
      cellEditorParams: {
        values: this._changeWorkShops.benefitDeductionsData$,
        allowTyping: true,
        filterList: true,
        highlightMatch: true,
        valueListMaxHeight: 220,
      },
      startEditing: true,
      editable: true,
      requerd: false,
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
        },
        {
          field: propertyOf<addWorkingTimesDetailDto>("dayWorkShiftHours"),
          headerName: "ساعت",
          editable: true,
          valueFormatter: timeCellFormatter,
          cellEditor: CellEditorTimeComponent,
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
        },
        {
          field: propertyOf<addWorkingTimesDetailDto>("nightWorkShiftHours"),
          headerName: "ساعت",
          editable: true,
          valueFormatter: timeCellFormatter,
          cellEditor: CellEditorTimeComponent,
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
        },
        {
          field: propertyOf<addWorkingTimesDetailDto>("overTimeWorkShiftHours"),
          headerName: "ساعت",
          editable: true,
          valueFormatter: timeCellFormatter,
          cellEditor: CellEditorTimeComponent,
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
        },
        {
          field: propertyOf<addWorkingTimesDetailDto>("vacationHours"),
          headerName: "ساعت",
          editable: true,
          valueFormatter: timeCellFormatter,
          cellEditor: CellEditorTimeComponent,
        },
      ],
    },
  ];
  defaultColDef: AgGridInterFace = {
    flex: 1,
    filter: false,
    resizable: true,
  };
  editType: "fullRow";
  rowDataDefault = new Array<addWorkingTimesDetailDto>();
  selectRow = new Array<addWorkingTimesDetailDto>();
  listResult = new Array<addWorkingTimesDetailDto>();
  isShowLoadingDelete: boolean = false;
  showLoading: boolean = false;
  isShowLoadingRefrash: boolean = false;
  persianBirthDate: NgbDateStruct;
  maskPrefixTaxRate = maskPrefixTaxRate;
  yearlyList = [];
  listclientPrerequisits: clientPrerequisitsInterface[];
  cacheKeyType = cacheKeyEnum;
  monthlyList = monthlyList;
  model: NgbDateStruct;
  addDraftDto = new addDraftDto();
  addWorkingTimesDto = new addWorkingTimesDto();
  constructor(
    private _changeWorkShops: ChangeWorkShopsService,
    private _toastService: ToastService,
    private _monthlyPerformanceService: MonthlyPerformanceService,
    private readonly _location: Location
  ) {
    this.persianBirthDate = DateUtilies.convertDateToNgbDateStruct(
      new Date().toLocaleDateString()
    );
  }
  ngOnInit(): void {
    this.generateYearlyList();
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
        //   this.wageOrdersModel.workShopId = +workShopId;
      });
  }
  handleMonthSelect(event: { month: number; year: number }) {
    console.log("Selected month:", event.month, "Selected year:", event.year);
  }
  clickSearchHander() {
    this.showLoading = true;
    this._monthlyPerformanceService
      .AddDraft(this.addDraftDto)
      .pipe(
        finalize(() => {
          this.showLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          if (res.isOk) {
            this._toastService.success(res.data.message);
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
  save() {
    if (
      this.addWorkingTimesDto?.addWorkingTimes &&
      this.addWorkingTimesDto.addWorkingTimes.length > 0
    ) {
      this._monthlyPerformanceService
        .Add(this.addWorkingTimesDto)
        .pipe(
          finalize(() => {
            this.showLoading = false;
          })
        )
        .subscribe({
          next: (res) => {
            if (res.isOk) {
              this._toastService.success(res.data.message);
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

  saveCellHandeler(details: any[]) {
    this.listResult = details.map((detail) => {
      const dayWorkShiftHours = detail.dayWorkShiftHours
        ? Math.floor(Number(detail.dayWorkShiftHours) / 100)
        : 0;
      const dayWorkShiftMinutes = detail.dayWorkShiftHours
        ? Number(detail.dayWorkShiftHours) % 100
        : 0;

      const nightWorkShiftHours = detail.nightWorkShiftHours
        ? Math.floor(Number(detail.nightWorkShiftHours) / 100)
        : 0;
      const nightWorkShiftMinutes = detail.nightWorkShiftHours
        ? Number(detail.nightWorkShiftHours) % 100
        : 0;

      const overTimeWorkShiftHours = detail.overTimeWorkShiftHours
        ? Math.floor(Number(detail.overTimeWorkShiftHours) / 100)
        : 0;
      const overTimeWorkShiftMinutes = detail.overTimeWorkShiftHours
        ? Number(detail.overTimeWorkShiftHours) % 100
        : 0;
      console.table(this.listResult);
      return {
        employeeId: detail.employeeId,
        personalCode: detail.personalCode,
        yearNum: detail.yearNum,
        monthNum: detail.monthNum,
        dayWorkShiftDays: detail.dayWorkShiftDays,
        dayWorkShiftHours: dayWorkShiftHours,
        dayWorkShiftMinutes: dayWorkShiftMinutes,
        nightWorkShiftDays: detail.nightWorkShiftDays,
        nightWorkShiftHours: nightWorkShiftHours,
        nightWorkShiftMinutes: nightWorkShiftMinutes,
        overTimeWorkShiftDays: detail.overTimeWorkShiftDays,
        overTimeWorkShiftHours: overTimeWorkShiftHours,
        overTimeWorkShiftMinutes: overTimeWorkShiftMinutes,
        vacationWorkShiftDays: detail.vacationWorkShiftDays,
        vacationWorkShiftHours: detail.vacationWorkShiftHours,
        vacationWorkShiftMinutes: detail.vacationWorkShiftMinutes,
        vacationDays: detail.vacationDays,
        vacationHours: detail.vacationHours,
        vacationMinutes: detail.vacationMinutes,
        code: detail.code,
        id: detail.id,
      } as addWorkingTimesDetailDto;
    });
  }

  cancelClickHandler() {
    this._location.back();
  }

  onSelectedRowsChangeEvent(event: Array<any>) {}
  private generateYearlyList() {
    for (let year = 1360; year <= 1500; year++) {
      this.yearlyList.push({ label: year.toString(), value: year });
    }
  }
}