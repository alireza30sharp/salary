import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import {
  ModalService,
  SelectListService,
} from "../../../../../shared/services";
import { AgGridInterFace } from "../../../../../shared/interfaces/ag-grid.interface";
import { propertyOf } from "../../../../../shared/utilities/property-of";
import { ChangeWorkShopsService } from "../../../../../services/change-work-shop.service";
import { delay, finalize } from "rxjs";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

import { numberCellFormatter_valueFormatter } from "../../../../../shared/interfaces/aggrid-master";
import {
  CellEditorCheckboxComponent,
  CellEditorNumberComponent,
  SelectUnitComponent,
} from "../../../../../shared/components/ag-grid";
import { SelectCellRendererParams } from "../../../../../shared/components/ag-grid/select-cell-render/select-cell-render";
import { ClientPrerequisitsService } from "../../../../../services/client-prerequisits";
import {
  cacheKeyEnum,
  clientPrerequisitsInterface,
} from "../../../../../shared/models/clientPrerequisits";
import { SelectOptionInterface } from "../../../../../shared/interfaces/select-option.interface";
import { DateUtilies } from "../../../../../shared/utilities/Date";
import { ToastService } from "../../../../../shared/services";

import {
  maskPrefixTaxRate,
  monthlyList,
} from "../../../../../salary/models/rul";
import { Location } from "@angular/common";
import { AdvanceService } from "../../services/advance.service";

import { AdvanceDto } from "../../models";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { FormGroupType } from "../../../../../shared/utilities/utility-types";
import { FormFieldConfigType } from "../../../../../shared/types/form-field-config.type";
import { ListItem } from "../../../../../shared/interfaces/list-item.interface";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
@Component({
  selector: "app-advance-add",
  templateUrl: "./advance-add.component.html",
  styleUrls: ["./advance-add.component.scss"],
  providers: [AdvanceService],
})
export class advanceAddComponent implements OnInit {
  formGroup!: FormGroup<FormGroupType<Partial<AdvanceDto>>>;
  form: NgForm;
  feilds: FormFieldConfigType[] = [];
  model: Partial<AdvanceDto>;
  showLoading: boolean;

  constructor(
    private _changeWorkShops: ChangeWorkShopsService,
    private _toastService: ToastService,
    private _AdvanceService: AdvanceService,
    private readonly _location: Location,
    private readonly _formBuilder: FormBuilder,
    private readonly _destroyRef: DestroyRef
  ) {
    this.formGroup = this._formBuilder.group({});
  }
  ngOnInit(): void {
    this._initForm();
  }
  ngAfterViewInit(): void {
    // this._changeWorkShops.employeListData$
    //   .pipe(delay(100))
    //   .subscribe((employeList) => {
    //     if (employeList) {
    //       //this.employeList = employeList;
    //     }
    //   });
  }

  onRefrashSelected() {}
  saveCellHandeler(formData: AdvanceDto) {}

  cancelClickHandler() {
    this._location.back();
  }

  saveHandler() {
    this.showLoading = true;
    this._AdvanceService
      .create(this.formGroup.value)
      .pipe(
        finalize(() => {
          this.showLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          this._toastService.success(res.data.message);
          this.formGroup.reset();
          this.formGroup.markAsUntouched();
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
  onEnter(e) {}
  private _initForm() {
    this.feilds = [
      {
        type: "select",
        title: "نام کارمند",
        binding: propertyOf<AdvanceDto>("employeeId"),
        config: {
          options: [],
          bindValue: propertyOf<ListItem>("value"),
          bindLabel: propertyOf<ListItem>("label"),
          allowClear: true,
        },
        validators: [
          {
            type: Validators.required,
          },
        ],
      },

      {
        type: "select",
        title: "انتخاب ماه",
        binding: propertyOf<AdvanceDto>("month"),
        config: {
          options: monthlyList,
          bindValue: propertyOf<ListItem>("value"),
          bindLabel: propertyOf<ListItem>("label"),
          allowClear: true,
        },
        validators: [
          {
            type: Validators.required,
          },
        ],
      },
      {
        type: "select",
        title: "انتخاب سال",
        binding: propertyOf<AdvanceDto>("year"),
        config: {
          options: DateUtilies.generateYearlyList(),
          bindValue: propertyOf<ListItem>("value"),
          bindLabel: propertyOf<ListItem>("label"),
          allowClear: true,
        },
        validators: [
          {
            type: Validators.required,
          },
        ],
      },
      {
        type: "textbox",
        title: "مبلغ درخواستی",
        binding: propertyOf<AdvanceDto>("requestedAmount"),
        validators: [
          {
            type: Validators.required,
          },
        ],
      },
      {
        type: "textarea",
        title: "توضیحات",
        binding: propertyOf<AdvanceDto>("comment"),
        columnWidthNumber: 12,
      },
    ];
    this._loadEmployeOptions();
  }

  private _loadEmployeOptions() {
    const employeeIdTyped = this.feilds.find(
      (x) => x.binding === propertyOf<AdvanceDto>("employeeId")
    );
    if (employeeIdTyped.type !== "select") return;
    employeeIdTyped.config.showLoading = true;
    this._changeWorkShops.employeListData$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((res) => {
        employeeIdTyped.config.showLoading = false;
        employeeIdTyped.config.options = res;
        employeeIdTyped.config.bindValue = propertyOf<ListItem>("value");
        employeeIdTyped.config.bindLabel = propertyOf<ListItem>("label");
      });
  }
}
