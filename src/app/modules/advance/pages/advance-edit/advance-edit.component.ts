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

import { maskPrefixTaxRate } from "../../../../base/models/rul";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Paths } from "../../../../shared/utilities/paths";
import { ConfirmInterFace } from "../../../../shared/ki-components/ki-confirmation/confirm.interface";
import { AdvanceService } from "../../services/advance.service";
import {
  actionTypeEnum,
  wageOrderDetailDto,
  wageOrdersDto,
} from "../../../wage-orders/models";
import { AdvanceDto } from "../../models";

@Component({
  selector: "app-advance-edit",
  templateUrl: "./advance-edit.component.html",
  styleUrls: ["./advance-edit.component.scss"],
  providers: [AdvanceService],
})
export class AdvanceEditComponent implements OnInit {
  employeList?: SelectOptionInterface<any>[];
  benefitDeductions?: SelectOptionInterface<any>[];
 

  isShowLoadingDelete: boolean = false;
  showLoading: boolean = false;
  isShowLoadingRefrash: boolean = false;
  advancesModel = new AdvanceDto();
  persianBirthDate: NgbDateStruct;
  advanceId: number = 0;
  maskPrefixTaxRate = maskPrefixTaxRate;
  listclientPrerequisits: clientPrerequisitsInterface[];
  cacheKeyType = cacheKeyEnum;
  actionTypeEnum = actionTypeEnum;
  isLoading: boolean = false;
  constructor(
    private _changeWorkShops: ChangeWorkShopsService,
    private _toastService: ToastService,
    private _advanceService: AdvanceService,
    private readonly _location: Location,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _destroyRef: DestroyRef,
    private _router: Router,
    private _modalService: ModalService
  ) {}
  ngOnInit(): void {
    this.advanceId = this._activatedRoute.snapshot.params["id"];
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

      //وقتی ورکشاپ از هدر تغییر کند
    this._changeWorkShops.activeWorkShopsSource$
      .pipe(delay(100))
      .subscribe((workShopId) => {
        this.advancesModel.workShopId = +workShopId;
      });
  }

  onRefrashSelected() {}
  saveCellHandeler(formData: AdvanceDto) {      
  }

  cancelClickHandler() {
    this._location.back();
  }

  private _getData() {
    this.isLoading = true;
    setTimeout(() => {
      this._advanceService
        .getById(this.advanceId)
        .pipe(
          takeUntilDestroyed(this._destroyRef),//وقتی دیتا رو گرفتیم سرویس رو خالی می کنیم
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe((res) => {
          if (res.isOk) {
            this.advancesModel = res.data;
            this.persianBirthDate = DateUtilies.convertDateToNgbDateStruct(
              res.data.persianStartDate
            );
        
          }
        });
    }, 3000);
  }
  
}
