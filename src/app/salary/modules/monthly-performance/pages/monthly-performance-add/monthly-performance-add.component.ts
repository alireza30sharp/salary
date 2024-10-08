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

import { MonthlyPerformanceService } from "../../services/monthlyPerformance.service";
import {
  addDraftDto,
  addWorkingTimesDeleteDto,
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
    private _monthlyPerformanceService: MonthlyPerformanceService,
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
            this.rowDataDefault = this.processWorkingTimes(
              res.data.workingTimes
            );
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
  saveHander() {
    if (this.listResult.length > 0) {
      let model: addWorkingTimesDto = {
        addWorkingTimes: this.listResult,
        workShopId: null,
      };
      this._monthlyPerformanceService
        .Add(model)
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
  selectedRowsChange(details: addWorkingTimesDetailDto[]) {
    this.selectRow = details;
  }
  saveCellHandeler(details: addWorkingTimesDetailDto[]) {
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

      const vacationWorkShiftHours = detail.vacationWorkShiftHours
        ? Math.floor(Number(detail.vacationWorkShiftHours) / 100)
        : 0;
      const vacationWorkShiftMinutes = detail.vacationWorkShiftHours
        ? Number(detail.vacationWorkShiftHours) % 100
        : 0;

      const vacationHours = detail.vacationHours
        ? Math.floor(Number(detail.vacationHours) / 100)
        : 0;
      const vacationMinutes = detail.vacationHours
        ? Number(detail.vacationHours) % 100
        : 0;

      // فیلدهای جدید
      const absenceDays = detail.absenceDays ?? 0;
      const absanceHours = detail.absanceHours
        ? Math.floor(Number(detail.absanceHours) / 100)
        : 0;
      const absanceHoursMinutes = detail.absanceHours
        ? Number(detail.absanceHours) % 100
        : 0;

      const missionDays = detail.missionDays ?? 0;
      const missionHours = detail.missionHours
        ? Math.floor(Number(detail.missionHours) / 100)
        : 0;
      const missionMinutes = detail.missionHours
        ? Number(detail.missionHours) % 100
        : 0;

      const earnedLeaveDays = detail.earnedLeaveDays ?? 0;
      const earnedLeaveHours = detail.earnedLeaveHours
        ? Math.floor(Number(detail.earnedLeaveHours) / 100)
        : 0;
      const earnedLeaveMinutes = detail.earnedLeaveHours
        ? Number(detail.earnedLeaveHours) % 100
        : 0;

      const sickLeaveDays = detail.sickLeaveDays ?? 0;
      const sickLeaveHours = detail.sickLeaveHours
        ? Math.floor(Number(detail.sickLeaveHours) / 100)
        : 0;
      const sickLeaveMinutes = detail.sickLeaveHours
        ? Number(detail.sickLeaveHours) % 100
        : 0;

      const withOutPayLeaveDays = detail.withOutPayLeaveDays ?? 0;
      const withOutPayLeaveHours = detail.withOutPayLeaveHours
        ? Math.floor(Number(detail.withOutPayLeaveHours) / 100)
        : 0;
      const withOutPayLeaveMinutes = detail.withOutPayLeaveHours
        ? Number(detail.withOutPayLeaveHours) % 100
        : 0;

      const workDeficitDays = detail.workDeficitDays ?? 0;
      const workDeficitHours = detail.workDeficitHours
        ? Math.floor(Number(detail.workDeficitHours) / 100)
        : 0;
      const workDeficitMinutes = detail.workDeficitHours
        ? Number(detail.workDeficitHours) % 100
        : 0;

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
        vacationWorkShiftHours: vacationWorkShiftHours,
        vacationWorkShiftMinutes: vacationWorkShiftMinutes,
        vacationDays: detail.vacationDays,
        vacationHours: vacationHours,
        vacationMinutes: vacationMinutes,
        code: detail.code,
        absenceDays: absenceDays,
        absanceHours: absanceHours,
        absanceHoursMinutes: absanceHoursMinutes,
        missionDays: missionDays,
        missionHours: missionHours,
        missionMinutes: missionMinutes,
        earnedLeaveDays: earnedLeaveDays,
        earnedLeaveHours: earnedLeaveHours,
        earnedLeaveMinutes: earnedLeaveMinutes,
        sickLeaveDays: sickLeaveDays,
        sickLeaveHours: sickLeaveHours,
        sickLeaveMinutes: sickLeaveMinutes,
        withOutPayLeaveDays: withOutPayLeaveDays,
        withOutPayLeaveHours: withOutPayLeaveHours,
        withOutPayLeaveMinutes: withOutPayLeaveMinutes,
        workDeficitDays: workDeficitDays,
        workDeficitHours: workDeficitHours,
        workDeficitMinutes: workDeficitMinutes,
        id: detail.id,
      } as addWorkingTimesDetailDto;
    });
  }

  formatToHHMM(hours: number, minutes: number): string | null {
    if (hours === 0 && minutes === 0) {
      return null;
    }

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${formattedHours}${formattedMinutes}`;
  }

  processWorkingTimes(response: any[]) {
    return response.map((detail) => {
      return {
        employeeId: detail.employeeId,
        personalCode: detail.personnelCode,
        yearNum: detail.yearNum,
        monthNum: detail.monthNum,
        dayWorkShiftDays: detail.dayWorkShiftDays,
        dayWorkShiftHours: this.formatToHHMM(
          detail.dayWorkShiftHours,
          detail.dayWorkShiftMinutes
        ),
        nightWorkShiftDays: detail.nightWorkShiftDays,
        nightWorkShiftHours: this.formatToHHMM(
          detail.nightWorkShiftHours,
          detail.nightWorkShiftMinutes
        ),
        overTimeWorkShiftDays: detail.overTimeWorkShiftDays,
        overTimeWorkShiftHours: this.formatToHHMM(
          detail.overTimeWorkShiftHours,
          detail.overTimeWorkShiftMinutes
        ),
        vacationWorkShiftDays: detail.vacationWorkShiftDays,
        vacationWorkShiftHours: this.formatToHHMM(
          detail.vacationWorkShiftHours,
          detail.vacationWorkShiftMinutes
        ),
        vacationDays: detail.vacationDays,
        vacationHours: this.formatToHHMM(
          detail.vacationHours,
          detail.vacationMinutes
        ),
        code: detail.code,
        absenceDays: detail.absenceDays,
        absanceHours: this.formatToHHMM(
          detail.absanceHours,
          detail.absanceHoursMinutes
        ),
        missionDays: detail.missionDays,
        missionHours: this.formatToHHMM(
          detail.missionHours,
          detail.missionMinutes
        ),
        earnedLeaveDays: detail.earnedLeaveDays,
        earnedLeaveHours: this.formatToHHMM(
          detail.earnedLeaveHours,
          detail.earnedLeaveMinutes
        ),
        sickLeaveDays: detail.sickLeaveDays,
        sickLeaveHours: this.formatToHHMM(
          detail.sickLeaveHours,
          detail.sickLeaveMinutes
        ),
        withOutPayLeaveDays: detail.withOutPayLeaveDays,
        withOutPayLeaveHours: this.formatToHHMM(
          detail.withOutPayLeaveHours,
          detail.withOutPayLeaveMinutes
        ),
        workDeficitDays: detail.workDeficitDays,
        workDeficitHours: this.formatToHHMM(
          detail.workDeficitHours,
          detail.workDeficitMinutes
        ),
        id: detail.id,
      };
    });
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
          let model: addWorkingTimesDeleteDto = {
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

  onDeleteItem(item: addWorkingTimesDeleteDto) {
    this.showLoadingDelete = true;
    this._monthlyPerformanceService
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
