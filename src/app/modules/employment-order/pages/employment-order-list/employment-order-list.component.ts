import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ModalService, ToastService } from "../../../../shared/services";
import { AgGridInterFace } from "../../../../shared/interfaces/ag-grid.interface";
import { propertyOf } from "../../../../shared/utilities/property-of";
import { finalize } from "rxjs";
import { ConfirmInterFace } from "../../../../shared/ki-components/ki-confirmation/confirm.interface";
import { Router } from "@angular/router";
import { CellOperationsClickEvent } from "../../../../shared/components/ag-grid";
import { Location } from "@angular/common";
import { STEPS_BUTTONS } from "../../../../shared/models/shepherd-config";
import { EmploymentOrdersListDto } from "../../models";
import { WorkShopsFilter } from "../../../../base/models";
import { TourService } from "../../../../shared/services/tour.service";
import { EmploymentOrderService } from "../../services/employment-order.service";
import { EmploymentOrderFormModalComponent } from "../../components/templates";

@Component({
  selector: "app-employment-order-list",
  templateUrl: "./employment-order-list.component.html",
  styleUrls: ["./employment-order-list.component.scss"],
  providers: [EmploymentOrderService],
})
export class EmploymentOrdersListComponent implements OnInit {
  columnsDefault: AgGridInterFace[] = [
    {
      field: propertyOf<EmploymentOrdersListDto>("row_NO"),
      headerName: "row_NO",
      hide: true,
    },
    {
      field: propertyOf<EmploymentOrdersListDto>("workShopId"),
      hide: true,
    },
    {
      field: propertyOf<EmploymentOrdersListDto>("employeeId"),
      hide: true,
    },
    {
      field: propertyOf<EmploymentOrdersListDto>("id"),
      hide: true,
    },
    {
      field: propertyOf<EmploymentOrdersListDto>("fullEmployeeName"),
      headerName: "نام کارمند",
    },
    {
      field: propertyOf<EmploymentOrdersListDto>("employmentTypeName"),
      headerName: "نوع استخدام",
    },
    {
      field: propertyOf<EmploymentOrdersListDto>("organizationPostName"),
      headerName: "واحد سازمانی",
    },
    {
      field: propertyOf<EmploymentOrdersListDto>("organizationUnitName"),
      headerName: "نوع استخدام ",
    },
    {
      field: propertyOf<EmploymentOrdersListDto>("paymentLocationName"),
      headerName: "محل پرداخت",
    },
    {
      field: propertyOf<EmploymentOrdersListDto>("persianStartDate"),
      headerName: "تاریخ",
    },
  ];
  rowDataDefault = new Array<EmploymentOrdersListDto>();
  selectRow = new Array<EmploymentOrdersListDto>();
  isShowLoadingDelete: boolean = false;
  isShowLoadingRefrash: boolean = false;
  constructor(
    private _employmentOrdersService: EmploymentOrderService,
    private _modalService: ModalService,
    private _tourService: TourService,
    private _router: Router,
    private _toastService: ToastService,
    private readonly _location: Location
  ) {}
  ngOnInit(): void {
    this.getList();
  }
  getList() {
    let model = new WorkShopsFilter();
    this.isShowLoadingRefrash = true;
    this._employmentOrdersService.getAll(model).subscribe({
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

  onToolsSelected() {
    this._router.navigateByUrl("salary/change-page/pageName");
  }
  cancelClickHandler() {
    this._location.back();
  }
  newWorkShpps(isEdit: boolean = false) {
    let entryId = null;
    if (isEdit) {
      entryId = this.selectRow[0].id;
    }
    this._modalService
      .open(EmploymentOrderFormModalComponent, "lg", { entryId: entryId }, true)
      .then((value) => {
        this.getList();
      })
      .catch((err) => {});
  }
  removeCell() {
    const params: ConfirmInterFace = {
      acceptText: "بله",
      declineText: "خیر",
      description: "آیا از عملیات مورد نظر اطمینان دارید؟",
      title:
        "حذف" + " " + `"${this.selectRow[0].fullEmployeeName.toUpperCase()}"`,
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

  onDeleteItem(item: EmploymentOrdersListDto) {
    this.isShowLoadingDelete = true;
    this._employmentOrdersService
      .delete(item.id, item.employeeId)
      .pipe(
        finalize(() => {
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
  onSelectedRowsChangeEvent(event: Array<EmploymentOrdersListDto>) {
    this.selectRow = new Array<EmploymentOrdersListDto>();
    this.selectRow = event;
  }
  onRefrashSelected() {
    this.getList();
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
