import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { ModalService, SelectListService } from "../../../../shared/services";
import { AgGridInterFace } from "../../../../shared/interfaces/ag-grid.interface";
import { propertyOf } from "../../../../shared/utilities/property-of";
import { ChangeWorkShopsService } from "../../../../services/change-work-shop.service";
import { delay, finalize } from "rxjs";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

import { numberCellFormatter_valueFormatter } from "../../../../shared/interfaces/aggrid-master";
import {
  CellEditorCheckboxComponent,
  CellEditorNumberComponent,
  CellOperationsClickEvent,
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

import { WageOrdersService } from "../../services/wage-orders.service";
import {
  actionTypeEnum,
  addWorkingTimesDetailDto,
  wageOrdersDto,
} from "../../models";
import { maskPrefixTaxRate } from "../../../../base/models/rul";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Paths } from "../../../../shared/utilities/paths";
import { ConfirmInterFace } from "../../../../shared/ki-components/ki-confirmation/confirm.interface";

@Component({
  selector: "app-monthly-performance-edit",
  templateUrl: "./monthly-performance-edit.component.html",
  styleUrls: ["./monthly-performance-edit.component.scss"],
  providers: [WageOrdersService],
})
export class MonthlyPerformanceEditComponent implements OnInit {
  employeList?: SelectOptionInterface<any>[];
  benefitDeductions?: SelectOptionInterface<any>[];
  columnsDefault: AgGridInterFace[] = [
    {
      field: propertyOf<addWorkingTimesDetailDto>("id"),
      hide: true,
    },
    {
      field: "عملیات",
      cellClass: "d-flex justify-content-center align-items-center",
      editable: false,
      width: 15,
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
              let index = this.rowDataDefault.findIndex(
                (f) => f.id === params.node.id
              );
              if (index != -1) {
                this.rowDataDefault.splice(index, 1);
                this.rowDataDefault = Object.assign([], this.rowDataDefault);
              }
              this.wageOrdersModel.deleteDetails.push(params.node?.id);
            }
          });
        },
      },
    },
    {
      headerName: "ردیف",
      valueGetter: "node.rowIndex + 1",
    },
  ];
  defaultColDef: AgGridInterFace = {
    flex: 1,

    filter: true,

    resizable: true,
  };
  editType: "fullRow";
  isEditMode: boolean = true;
  rowDataDefault = new Array<addWorkingTimesDetailDto>();
  selectRow = new Array<addWorkingTimesDetailDto>();
  isShowLoadingDelete: boolean = false;
  showLoading: boolean = false;
  isShowLoadingRefrash: boolean = false;
  wageOrdersModel = new wageOrdersDto();
  persianBirthDate: NgbDateStruct;
  wageOrderId: number = 0;
  maskPrefixTaxRate = maskPrefixTaxRate;
  listclientPrerequisits: clientPrerequisitsInterface[];
  cacheKeyType = cacheKeyEnum;
  actionTypeEnum = actionTypeEnum;
  isLoading: boolean = false;
  constructor(
    private _changeWorkShops: ChangeWorkShopsService,
    private _toastService: ToastService,
    private _wageOrdersService: WageOrdersService,
    private readonly _location: Location,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _destroyRef: DestroyRef,
    private _router: Router,
    private _modalService: ModalService
  ) {}
  ngOnInit(): void {
    this.wageOrderId = this._activatedRoute.snapshot.params["id"];
    this._getData();
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
        this.wageOrdersModel.workShopId = +workShopId;
      });
  }

  onRefrashSelected() {}
  saveCellHandeler(details: addWorkingTimesDetailDto[]) {
    this.wageOrdersModel.details = [];

    this.wageOrdersModel.details = [...details];
  }
  cancelClickHandler() {
    this._location.back();
  }

  private _getData() {
    this.isLoading = true;
    setTimeout(() => {
      this._wageOrdersService
        .getById(this.wageOrderId)
        .pipe(
          takeUntilDestroyed(this._destroyRef),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe((res) => {
          if (res.isOk) {
            this.wageOrdersModel = res.data;
            this.persianBirthDate = DateUtilies.convertDateToNgbDateStruct(
              res.data.persianStartDate
            );
            this.rowDataDefault = this.wageOrdersModel.details;
            this.wageOrdersModel.details = [];
            this.wageOrdersModel.deleteDetails = [];
          }
        });
    }, 3000);
  }
  onSelectedRowsChangeEvent(event: Array<wageOrdersDto>) {}
  clickSearchHander() {
    this.showLoading = true;
    this.wageOrdersModel.persianStartDate = DateUtilies.convertDate(
      this.persianBirthDate
    );
    if (
      this.wageOrdersModel?.details &&
      this.wageOrdersModel.details.length > 0
    ) {
      this._wageOrdersService
        .update(this.wageOrdersModel)
        .pipe(
          finalize(() => {
            this.showLoading = false;
          })
        )
        .subscribe({
          next: (res) => {
            if (res.isOk) {
              this._toastService.success(res.data.message);
              this._router.navigateByUrl(Paths.wageOrders.list().url);
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
}
