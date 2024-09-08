import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { WorkShopsFilter } from "../../models";
import { ModalService, ToastService } from "../../../shared/services";
import { BenefitDeductionEmployeesFormModalComponent } from "../../components/templates";
import { AgGridInterFace } from "../../../shared/interfaces/ag-grid.interface";
import { propertyOf } from "../../../shared/utilities/property-of";
import { finalize } from "rxjs";
import { TourService } from "../../../shared/services/tour.service";
import { STEPS_BUTTONS } from "../../../shared/models/shepherd-config";
import { Router } from "@angular/router";
import { ConfirmInterFace } from "../../../shared/ki-components/ki-confirmation/confirm.interface";
import { BenefitDeductionEmployeesService } from "../../services/benefit-deduction-employees.service";
import { BenefitDeductionEmployeesDto } from "../../models/benefit-deduction-employees.model";
import { Location } from "@angular/common";
import { ClientPrerequisitsService } from "../../../services/client-prerequisits";
import {
  ListViewFilterDataInterFace,
  ListViewFilterInterFace,
} from "../../../shared/interfaces/list-view-filter-config.interface";
import { SumRenderer } from "../../../shared/components/ag-grid";
import { numberCellFormatter_valueFormatter } from "../../../shared/interfaces/aggrid-master";
import { DateUtilies } from "../../../shared/utilities/Date";

@Component({
  selector: "app-benefit-deduction-employees-list",
  templateUrl: "./benefit-deduction-employees-list.component.html",
  styleUrls: ["./benefit-deduction-employees-list.component.scss"],
  providers: [BenefitDeductionEmployeesService],
})
export class BenefitDeductionEmployeesListComponent implements OnInit {
  columnsDefault: AgGridInterFace[] = [
    {
      field: propertyOf<BenefitDeductionEmployeesDto>("row_NO"),
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
      field: propertyOf<BenefitDeductionEmployeesDto>("benefitDeductionName"),
      headerName: "نوع",
      filter: "agTextColumnFilter",
    },

    {
      field: propertyOf<BenefitDeductionEmployeesDto>("dateAction"),
      headerName: "تاریخ",
      filter: "agTextColumnFilter",
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
  modelfilter: ListViewFilterDataInterFace = {
    toDate: null,
    fromDate: null,
    fromAmount: 121,
    toAmount: 8000,
  };
  isVisible: boolean = false;
  constructor(
    private _benefitDeductionEmployeesService: BenefitDeductionEmployeesService,
    private _modalService: ModalService,
    private _tourService: TourService,
    private _router: Router,
    private _toastService: ToastService,
    private clientPrerequis: ClientPrerequisitsService,

    private readonly _location: Location
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
    this.getList(this.filterWorkShops);
  }
  getList(model: WorkShopsFilter) {
    //let modelFilterBenefit =
    this.isShowLoadingRefrash = true;
    this._benefitDeductionEmployeesService.getAll(model).subscribe({
      next: (res) => {
        if (res.isOk) {
          this.rowDataDefault = res.data.data;
        }
      },
      complete: () => {
        this.isShowLoadingRefrash = false;
      },
      error: (err) => {},
    });
  }
  onSearchHandelar(event: ListViewFilterDataInterFace) {
    let model = new WorkShopsFilter();
    model.PriceFrom = event.fromAmount;
    model.PriceTo = event.toAmount;
    model.EmployeeId = event.employeeId;
    model.DateFrom = DateUtilies.convertDate(event.fromDate);
    model.DateTo = DateUtilies.convertDate(event.toDate);
    this.getList(model);
    this.filterWorkShops = Object.assign({}, model);
  }
  cancelClickHandler() {
    this._location.back();
  }
  onToolsSelected() {
    this._router.navigateByUrl("salary/change-page/pageName");
  }
  newWorkShpps(isEdit: boolean = false) {
    let entryId = null;
    if (isEdit) {
      entryId = this.selectRow[0].id;
    }
    this._modalService
      .open(
        BenefitDeductionEmployeesFormModalComponent,
        "lg",
        { entryId: entryId },
        true
      )
      .then((value) => {
        this.getList(this.filterWorkShops);
      })
      .catch((err) => {});
  }
  removeCell() {
    const params: ConfirmInterFace = {
      acceptText: "بله",
      declineText: "خیر",
      description: "آیا از عملیات مورد نظر اطمینان دارید؟",
      title: "حذف" + " " + `"${this.selectRow[0].dateAction.toUpperCase()}"`,
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
    this.isShowLoadingDelete = true;
    this._benefitDeductionEmployeesService
      .delete(item.id)
      .pipe(
        finalize(() => {
          this.isShowLoadingDelete = false;
        })
      )
      .subscribe({
        next: (res) => {
          if (res.isOk) {
            this.getList(this.filterWorkShops);
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
  onSelectedRowsChangeEvent(event: Array<BenefitDeductionEmployeesDto>) {
    this.selectRow = new Array<BenefitDeductionEmployeesDto>();
    this.selectRow = event;
  }
  onRefrashSelected() {
    this.getList(this.filterWorkShops);
  }
  startTour() {
    const steps = [
      {
        attachTo: {
          element: ".strong",
          on: "bottom",
        },
        id: "WorkShop",
        buttons: [STEPS_BUTTONS.next],
        classes: "custom-class-name-1 custom-class-name-2",
        title: "لیست تمام گارگاه نسبت به گارگاه انتخابی بالا",
        text: ` در این لیست شما تمام کارگاه های رو میبینید که از منو بالا انتخاب کرده اید`,
      },
      {
        attachTo: {
          element: ".ESc",
          on: "bottom",
        },
        id: "WorkShop",
        buttons: [STEPS_BUTTONS.back, STEPS_BUTTONS.next, STEPS_BUTTONS.cancel],
        classes: "custom-class-name-1 custom-class-name-2",
        title: "انصراف",
        text: `انصراف از کار که کرده اید `,
      },
      {
        attachTo: {
          element: ".tools",
          on: "bottom",
        },
        id: "WorkShop",
        buttons: [STEPS_BUTTONS.back, STEPS_BUTTONS.next, STEPS_BUTTONS.cancel],
        classes: "custom-class-name-1 custom-class-name-2",
        title: "ابزار",
        text: `tools`,
      },
      {
        attachTo: {
          element: ".refresh",
          on: "bottom",
        },
        id: "WorkShop",
        buttons: [STEPS_BUTTONS.back, STEPS_BUTTONS.next, STEPS_BUTTONS.cancel],
        classes: "custom-class-name-1 custom-class-name-2",
        title: "refresh",
        text: `refresh`,
      },
      {
        attachTo: {
          element: ".info",
          on: "bottom",
        },
        id: "WorkShop",
        buttons: [STEPS_BUTTONS.back, STEPS_BUTTONS.next, STEPS_BUTTONS.cancel],
        classes: "custom-class-name-1 custom-class-name-2",
        title: "info",
        text: `info`,
      },
      {
        attachTo: {
          element: ".print",
          on: "bottom",
        },
        id: "WorkShop",
        buttons: [STEPS_BUTTONS.back, STEPS_BUTTONS.next, STEPS_BUTTONS.cancel],
        classes: "custom-class-name-1 custom-class-name-2",
        title: "print",
        text: `print`,
      },
      {
        attachTo: {
          element: ".excel",
          on: "bottom",
        },
        id: "WorkShop",
        buttons: [STEPS_BUTTONS.back, STEPS_BUTTONS.next, STEPS_BUTTONS.cancel],
        classes: "custom-class-name-1 custom-class-name-2",
        title: "excel",
        text: `excel`,
      },
      {
        attachTo: {
          element: ".check",
          on: "bottom",
        },
        id: "WorkShop",
        buttons: [STEPS_BUTTONS.back, STEPS_BUTTONS.next, STEPS_BUTTONS.cancel],
        classes: "custom-class-name-1 custom-class-name-2",
        title: "check",
        text: `check`,
      },
      {
        attachTo: {
          element: ".trash",
          on: "bottom",
        },
        id: "WorkShop",
        buttons: [STEPS_BUTTONS.back, STEPS_BUTTONS.next, STEPS_BUTTONS.cancel],
        classes: "custom-class-name-1 custom-class-name-2",
        title: "trash",
        text: `trash`,
      },
      {
        attachTo: {
          element: ".edit",
          on: "bottom",
        },
        id: "WorkShop",
        buttons: [STEPS_BUTTONS.back, STEPS_BUTTONS.next, STEPS_BUTTONS.cancel],
        classes: "custom-class-name-1 custom-class-name-2",
        title: "edit",
        text: `edit`,
      },
      {
        attachTo: {
          element: ".plus",
          on: "bottom",
        },
        id: "WorkShop",
        buttons: [STEPS_BUTTONS.back, STEPS_BUTTONS.next, STEPS_BUTTONS.cancel],
        classes: "custom-class-name-1 custom-class-name-2",
        title: "plus",
        text: `plus`,
      },
      {
        attachTo: {
          element: ".companyName",
          on: "bottom",
        },
        id: "WorkShop",
        buttons: [STEPS_BUTTONS.back, STEPS_BUTTONS.next, STEPS_BUTTONS.cancel],
        classes: "custom-class-name-1 custom-class-name-2",
        title: "companyName",
        text: `companyName`,
      },
      {
        attachTo: {
          element: ".employerName",
          on: "bottom",
        },
        id: "WorkShop",
        buttons: [STEPS_BUTTONS.back, STEPS_BUTTONS.next, STEPS_BUTTONS.cancel],
        classes: "custom-class-name-1 custom-class-name-2",
        title: "employerName",
        text: `employerName`,
      },
      {
        attachTo: {
          element: ".workShopName",
          on: "bottom",
        },
        id: "WorkShop",
        buttons: [STEPS_BUTTONS.back, STEPS_BUTTONS.next, STEPS_BUTTONS.cancel],
        classes: "custom-class-name-1 custom-class-name-2",
        title: "workShopName",
        text: `workShopName`,
      },
      {
        attachTo: {
          element: ".isActiveString",
          on: "bottom",
        },
        id: "WorkShop",
        buttons: [STEPS_BUTTONS.back, STEPS_BUTTONS.next, STEPS_BUTTONS.cancel],
        classes: "custom-class-name-1 custom-class-name-2",
        title: "isActiveString",
        text: `isActiveString`,
      },
      {
        attachTo: {
          element: ".isDefaultString",
          on: "bottom",
        },
        id: "WorkShop",
        buttons: [STEPS_BUTTONS.back, STEPS_BUTTONS.next, STEPS_BUTTONS.cancel],
        classes: "custom-class-name-1 custom-class-name-2",
        title: "isDefaultString",
        text: `isDefaultString`,
      },
      {
        attachTo: {
          element: ".socialSecurityBranchName",
          on: "bottom",
        },
        id: "WorkShop",
        buttons: [STEPS_BUTTONS.back, STEPS_BUTTONS.next, STEPS_BUTTONS.cancel],
        classes: "custom-class-name-1 custom-class-name-2",
        title: "socialSecurityBranchName",
        text: `socialSecurityBranchName`,
      },
      {
        attachTo: {
          element: ".workShopAddress",
          on: "bottom",
        },
        id: "WorkShop",
        buttons: [STEPS_BUTTONS.back, STEPS_BUTTONS.next, STEPS_BUTTONS.cancel],
        classes: "custom-class-name-1 custom-class-name-2",
        title: "workShopAddress",
        text: `workShopAddress`,
      },
    ];
    this._tourService.addSteps(steps);
  }
}
