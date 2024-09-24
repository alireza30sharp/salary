import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ModalService, ToastService } from "../../../../../shared/services";
import { AgGridInterFace } from "../../../../../shared/interfaces/ag-grid.interface";
import { propertyOf } from "../../../../../shared/utilities/property-of";
import { finalize } from "rxjs";
import { ConfirmInterFace } from "../../../../../shared/ki-components/ki-confirmation/confirm.interface";
import { Router } from "@angular/router";
import { CellOperationsClickEvent } from "../../../../../shared/components/ag-grid";
import { Location } from "@angular/common";
import { STEPS_BUTTONS } from "../../../../../shared/models/shepherd-config";
import { AdvanceFilter, AdvanceListDto } from "../../models";
import { WorkShopsFilter } from "../../../../../salary/models";
import { TourService } from "../../../../../shared/services/tour.service";
import { AdvanceService } from "../../services/advance.service";

import { Paths } from "../../../../../shared/utilities/paths";
import {
  ListViewFilterDataInterFace,
  ListViewFilterInterFace,
} from "../../../../../shared/interfaces/list-view-filter-config.interface";
import { DateUtilies } from "../../../../../shared/utilities/Date";

@Component({
  selector: "app-advance-order-list",
  templateUrl: "./advance-list.component.html",
  styleUrls: ["./advance-list.component.scss"],
  providers: [AdvanceService], //inject
})
export class AdvanceListComponent implements OnInit {
  columnsDefault: AgGridInterFace[] = [
    {
      field: propertyOf<AdvanceListDto>("row_NO"),
      headerName: "row_NO",
      hide: true,
    },
    {
      field: propertyOf<AdvanceListDto>("workShopId"),
      hide: true,
    },
    {
      field: propertyOf<AdvanceListDto>("employeeId"),
      hide: true,
    },
    {
      field: propertyOf<AdvanceListDto>("id"),
      hide: true,
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
            title: "حذف" + " " + `"${params.node?.firstName.toUpperCase()}"`,
            type: "Confirm",
          };
          this._modalService.showConfirm(param, false).then((res) => {
            if (res) {
              this.onDeleteItem(params.node);
            }
          });
        },
        onClickEdit: (params) => {
          this._router.navigateByUrl(Paths.advance.edit(params.node.id).url);
        },
      },
    },
    {
      field: propertyOf<AdvanceListDto>("requestDate"),
      headerName: "تاریخ",
    },
    {
      field: propertyOf<AdvanceListDto>("personnelCode"),
      headerName: "کد پرسنلی",
    },

    {
      field: propertyOf<AdvanceListDto>("firstName"),
      headerName: "نام",
    },
    {
      field: propertyOf<AdvanceListDto>("lastName"),
      headerName: "نام خانوادگی",
    },
    {
      field: propertyOf<AdvanceListDto>("confirmedAmount"),
      headerName: "مبلغ",
    },
  ];

  rowDataDefault = new Array<AdvanceListDto>(); //لیست از ریسپانس
  selectRow = new Array<AdvanceListDto>(); //رکورد انتخاب شده
  isShowLoadingDelete: boolean = false;
  isShowLoadingRefrash: boolean = false;
  filterWorkShops = new WorkShopsFilter();

  constructor(
    //متغیر هایی که عمومی نیست با آندرلاین مشخص بشه
    private _advanceService: AdvanceService,
    private _modalService: ModalService,
    private _tourService: TourService,
    private _router: Router,
    private _toastService: ToastService,
    private readonly _location: Location
  ) {}
  ngOnInit(): void {
    //لود اولیه
    this.getList();
  }

  configViewFilter: ListViewFilterInterFace = {
    showFromDate: true,
    showToDate: true,
    showEmployeeId: true,
    //showBenefitDeduction: true,
    showFromAmount: true,
    showToAmount: true,
    //showComment: true,
  };

  getList() {
    let model = new WorkShopsFilter();
    let advanceFilter = new AdvanceFilter();
    advanceFilter.confirmedAmount = 0;
    model.DateFrom = "1403/01/01";
    model.DateTo = "1405/01/01";

    model.Statues = 0;
    this.isShowLoadingRefrash = true;

    debugger;
    this._advanceService.getAll(model, advanceFilter).subscribe({
      next: (res) => {
        //وقتی ریسپانس میاد
        if (res.isOk) {
          this.rowDataDefault = res.data.data;
        }
      },
      complete: () => {
        //در هر صورت انجام میشه چه با خطا چه بدون خطا مثل finally
        this.isShowLoadingRefrash = false;
      },
      error: (err) => {}, //خطا خورده
    });
  }

  onToolsSelected() {
    this._router.navigateByUrl("salary/change-page/pageName");
  }
  cancelClickHandler() {
    //برگشت به صفحه قبل
    this._location.back();
  }

  newWorkShpps() {
    this._router.navigateByUrl(Paths.advance.add().url);
  }

  removeCell() {
    const params: ConfirmInterFace = {
      acceptText: "بله",
      declineText: "خیر",
      description: "آیا از عملیات مورد نظر اطمینان دارید؟",
      title: "حذف" + " " + `"${this.selectRow[0].id}"`,
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

  onDeleteItem(item: AdvanceListDto) {
    this.isShowLoadingDelete = true;
    this._advanceService
      .delete(item.id)
      .pipe(
        finalize(() => {
          //مثل کامپلیت
          this.isShowLoadingDelete = false;
        })
      )
      .subscribe({
        next: (res) => {
          if (res.isOk) {
            this.getList();
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

  onSearchHandelar(event: ListViewFilterDataInterFace) {
    let model = new WorkShopsFilter();
    model.PriceFrom = event.fromAmount;
    model.PriceTo = event.toAmount;
    model.EmployeeId = event.employeeId;
    model.DateFrom = DateUtilies.convertDate(event.fromDate);
    model.DateTo = DateUtilies.convertDate(event.toDate);
    this.getList();
    this.filterWorkShops = Object.assign({}, model);
  }

  onSelectedRowsChangeEvent(event: Array<AdvanceListDto>) {
    this.selectRow = new Array<AdvanceListDto>();
    this.selectRow = event;
  }
  onRefrashSelected() {
    this.getList();
  }
  startTour() {
    //آموزش
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
