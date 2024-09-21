import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { finalize } from "rxjs";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { BenefitDeductionEmployeesService } from "../../services/benefit-deduction-employees.service";
import { AgGridInterFace } from "../../../../shared/interfaces/ag-grid.interface";
import { BenefitDeductionEmployeesDto } from "../../models";
import { propertyOf } from "../../../../shared/utilities/property-of";
import { CellOperationsClickEvent } from "../../../../shared/components/ag-grid";
import { ConfirmInterFace } from "../../../../shared/ki-components/ki-confirmation/confirm.interface";
import { Paths } from "../../../../shared/utilities/paths";
import { ModalService, ToastService } from "../../../../shared/services";
import { ChangeWorkShopsService } from "../../../../services/change-work-shop.service";
import { WorkShopsFilter } from "../../../../salary/models";
import {
  ListViewFilterDataInterFace,
  ListViewFilterInterFace,
} from "../../../../shared/interfaces/list-view-filter-config.interface";
import { ClientPrerequisitsService } from "../../../../services/client-prerequisits";
import { DateUtilies } from "../../../../shared/utilities/Date";
import { numberCellFormatter_valueFormatter } from "../../../../shared/interfaces/aggrid-master";

@Component({
  selector: "app-benefit-deduction-employees-list",
  templateUrl: "./benefit-deduction-employees-list.component.html",
  styleUrls: ["./benefit-deduction-employees-list.component.scss"],
  providers: [BenefitDeductionEmployeesService],
})
export class BenefitDeductionEmployeesListComponent implements OnInit {
  columnsDefault: AgGridInterFace[] = [
    {
      field: propertyOf<BenefitDeductionEmployeesDto>("id"),
      headerName: "row_NO",
      hide: true,
    },
    {
      field: propertyOf<BenefitDeductionEmployeesDto>("workShopId"),
      hide: true,
    },
    {
      headerName: "ردیف",
      cellRenderer: (params) => {
        if (params.node.rowPinned) {
          return "جمع کل:";
        }
        return params.node.rowIndex + 1;
      },
    },
    {
      field: "عملیات",
      cellClass: "d-flex justify-content-center align-items-center",
      editable: false,
      minWidth: 150,
      cellRenderer: CellOperationsClickEvent,
      cellRendererParams: {
        onClickRemove: (params) => {
          const param: ConfirmInterFace = {
            acceptText: "بله",
            declineText: "خیر",
            description: "آیا از عملیات مورد نظر اطمینان دارید؟",
            title:
              "حذف" +
              " " +
              `"${params.node?.benefitDeductionName.toUpperCase()}"`,
            type: "Confirm",
          };
          this._modalService.showConfirm(param, false).then((res) => {
            if (res) {
              this.onDeleteItem(params.node);
            }
          });
        },
        onClickEdit: (params) => {
          this._router.navigateByUrl(
            Paths.BenefitDeductionEmployees.edit(params.node.id).url
          );
        },
      },
    },
    {
      field: propertyOf<BenefitDeductionEmployeesDto>("benefitDeductionName"),
      headerName: "نوع",
      filter: "agTextColumnFilter",
    },

    {
      field: propertyOf<BenefitDeductionEmployeesDto>("dateAction"),
      headerName: "تاریخ",
      filter: "agTextColumnFilter",
      cellClass: "text-center",
    },
    {
      field: propertyOf<BenefitDeductionEmployeesDto>("personnelCode"),
      headerName: "کد پرسنلی",
      filter: "agTextColumnFilter",
    },
    {
      field: propertyOf<BenefitDeductionEmployeesDto>("lastName"),
      headerName: "نام کارمند",
      filter: "agTextColumnFilter",
    },

    {
      field: propertyOf<BenefitDeductionEmployeesDto>("price"),
      headerName: "مبلغ",
      filter: "agNumberColumnFilter",
      aggFunc: "sum",

      //cellEditor: CellEditorNumberComponent,
      valueFormatter: numberCellFormatter_valueFormatter,
    },
  ];
  defaultColDef: AgGridInterFace = {
    flex: 1,
    width: 150,
    filter: true,
    resizable: true,
  };

  rowDataDefault = new Array<BenefitDeductionEmployeesDto>();
  amount: any;
  selectRow = new Array<BenefitDeductionEmployeesDto>();
  isShowLoadingDelete: boolean = false;
  isShowLoadingRefrash: boolean = false;
  filterWorkShops = new WorkShopsFilter();
  configViewFilter: ListViewFilterInterFace = {
    showFromDate: true,
    showToDate: true,
    showEmployeeId: true,
    showBenefitDeduction: true,
    showFromAmount: true,
    showToAmount: true,
    showComment: true,
  };
  isVisible: boolean = false;

  modelfilter: ListViewFilterDataInterFace = {
    toDate: null,
    fromDate: null,
    fromAmount: 121,
    toAmount: 8000,
  };
  constructor(
    private _BenefitDeductionEmployeesService: BenefitDeductionEmployeesService,
    private _modalService: ModalService,
    private _changeWorkShops: ChangeWorkShopsService,
    private _toastService: ToastService,
    private readonly _location: Location,
    private _router: Router,
    private clientPrerequis: ClientPrerequisitsService
  ) {
    clientPrerequis.getEmployeeClientPrerequisites(true).subscribe((res) => {});
    clientPrerequis
      .getBenefitDaductionClientPrerequisites(true)
      .subscribe((res) => {});
    let date = DateUtilies.getTodayDateRange();
    this.modelfilter.toDate = date.toDate;
    this.modelfilter.fromDate = date.fromDate;
  }
  ngOnInit(): void {
    this._changeWorkShops.activeWorkShopsSource$.subscribe((workShopId) => {
      this.getAll(this.filterWorkShops);
    });
  }
  onRefrashSelected() {
    this.getAll(this.filterWorkShops);
  }
  cancelClickHandler() {
    this._location.back();
  }
  newWorkShpps() {
    this._router.navigateByUrl(Paths.BenefitDeductionEmployees.add().url);
  }
  getAll(model: WorkShopsFilter) {
    this.isShowLoadingRefrash = true;
    this._BenefitDeductionEmployeesService
      .getAll(model)
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
  onSelectedRowsChangeEvent(event: Array<BenefitDeductionEmployeesDto>) {
    this.selectRow = new Array<BenefitDeductionEmployeesDto>();
    this.selectRow = event;
  }
  onSearchHandelar(event: ListViewFilterDataInterFace) {
    let model = new WorkShopsFilter();
    model.PriceFrom = event.fromAmount;
    model.PriceTo = event.toAmount;
    model.EmployeeId = event.employeeId;
    model.DateFrom = DateUtilies.convertDate(event.fromDate);
    model.DateTo = DateUtilies.convertDate(event.toDate);
    this.getAll(model);
    this.filterWorkShops = Object.assign({}, model);
  }
  removeCell() {
    const params: ConfirmInterFace = {
      acceptText: "بله",
      declineText: "خیر",
      description: "آیا از عملیات مورد نظر اطمینان دارید؟",
      title:
        "حذف" +
        " " +
        `"${this.selectRow[0].benefitDeductionName.toUpperCase()}"`,
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
  onDeleteItem(item: BenefitDeductionEmployeesDto) {
    this._BenefitDeductionEmployeesService.delete(item.id).subscribe({
      next: (res) => {
        if (res.isOk) {
          this.getAll(this.filterWorkShops);
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
}
