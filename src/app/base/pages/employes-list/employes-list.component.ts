import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { WorkShopsFilter } from "../../models";
import { ModalService, ToastService } from "../../../shared/services";
import { EmployesFormModalComponent } from "../../components/templates";
import { AgGridInterFace } from "../../../shared/interfaces/ag-grid.interface";
import { propertyOf } from "../../../shared/utilities/property-of";
import { finalize } from "rxjs";
import { TourService } from "../../../shared/services/tour.service";
import { STEPS_BUTTONS } from "../../../shared/models/shepherd-config";
import { Router } from "@angular/router";
import { ConfirmInterFace } from "../../../shared/ki-components/ki-confirmation/confirm.interface";
import { EmployesService } from "../../services/employes.service";
import { EmployeDto } from "../../models/employee.model";
import { Location } from "@angular/common";

@Component({
  selector: "app-employes-list",
  templateUrl: "./employes-list.component.html",
  styleUrls: ["./employes-list.component.scss"],
  providers: [EmployesService],
})
export class EmployesListComponent implements OnInit {
  columnsDefault: AgGridInterFace[] = [
    {
      field: propertyOf<EmployeDto>("row_NO"),
      headerName: "row_NO",
      hide: true,
    },
    {
      field: propertyOf<EmployeDto>("workShopId"),
      hide: true,
    },

    {
      field: propertyOf<EmployeDto>("displayName"),
      headerName: "نام و نام خانوادگی",
      filter: "agTextColumnFilter",
      headerClass: "displayName",
    },

    {
      field: propertyOf<EmployeDto>("nationalCode"),
      headerName: "کد ملی",
      filter: "agTextColumnFilter",
      headerClass: "nationalCode",
    },
  ];
  rowDataDefault = new Array<EmployeDto>();
  selectRow = new Array<EmployeDto>();
  isShowLoadingDelete: boolean = false;
  isShowLoadingRefrash: boolean = false;
  constructor(
    private _employesService: EmployesService,
    private _modalService: ModalService,
    private _tourService: TourService,
    private _router: Router,
    private readonly _location: Location
  ) {}
  ngOnInit(): void {
    this.getList();
  }
  getList() {
    let model = new WorkShopsFilter();
    this.isShowLoadingRefrash = true;
    this._employesService.getAll(model).subscribe({
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
      .open(EmployesFormModalComponent, "lg", { entryId: entryId }, true)
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
      title: "حذف" + " " + `"${this.selectRow[0].displayName.toUpperCase()}"`,
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

  onDeleteItem(item: EmployeDto) {
    this.isShowLoadingDelete = true;
    this._employesService
      .delete(item.id)
      .pipe(
        finalize(() => {
          this.isShowLoadingDelete = false;
        })
      )
      .subscribe((res) => {
        if (res.isOk) {
          this.getList();
        }
      });
  }
  onSelectedRowsChangeEvent(event: Array<EmployeDto>) {
    this.selectRow = new Array<EmployeDto>();
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
