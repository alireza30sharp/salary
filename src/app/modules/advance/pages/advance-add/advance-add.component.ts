import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
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
import { AdvanceService } from "../../services/advance.service";

import { AdvanceDto } from "../../models";
@Component({
  selector: "app-advance-add",
  templateUrl: "./advance-add.component.html",
  styleUrls: ["./advance-add.component.scss"],
  providers: [AdvanceService],
})
export class advanceAddComponent implements OnInit {
  employeList?: SelectOptionInterface<any>[];
 
  isEditMode: boolean = true;
 
 
  isShowLoadingDelete: boolean = false;
  showLoading: boolean = false;
  isShowLoadingRefrash: boolean = false;
  advanceModel = new AdvanceDto ();
  persianBirthDate: NgbDateStruct;
  cacheKeyType = cacheKeyEnum;
  constructor(
    private _changeWorkShops: ChangeWorkShopsService,
    private _toastService: ToastService,
    private _AdvanceService: AdvanceService,
    private readonly _location: Location
  ) {
    this.persianBirthDate = DateUtilies.convertDateToNgbDateStruct(
      new Date().toLocaleDateString()
    );
  }
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this._changeWorkShops.employeListData$
      .pipe(delay(100))
      .subscribe((employeList) => {
        if (employeList) {
          this.employeList = employeList;
        }
      });
   

  }


  onRefrashSelected() {}
  saveCellHandeler(formData: AdvanceDto) {
   
  }

  cancelClickHandler() {
    this._location.back();
  }
 

}
