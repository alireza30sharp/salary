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

import { salaryCalculationService } from "../../services/salaryCalculation.service";
import {
  addDraftDto,
  addWorkingTimesDetailDto,
  addWorkingTimesDto,
  ChangeInsuranceDisket,
  InsuranceDisketDto,
  InsuranceDisketHeader,
  taxDisketDto,
} from "../../models";
import {
  maskPrefixTaxRate,
  monthlyList,
} from "../../../../../salary/models/rul";
import { Location } from "@angular/common";
import { ConfirmInterFace } from "./../../../../../shared/ki-components/ki-confirmation/confirm.interface";
import {
  Section,
  SectionData,
} from "../../../../../shared-business/model/Section";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { FormGroupType } from "../../../../../shared/utilities/utility-types";

export enum tabType {
  SalaryList = 0,
  InsuranceDisket = 1,
  TaxDisket = 2,
}
@Component({
  selector: "app-salary-calculation-add",
  templateUrl: "./salary-calculation-add.component.html",
  styleUrls: ["./salary-calculation-add.component.scss"],
  providers: [salaryCalculationService],
})
export class SalaryCalculationAddComponent implements OnInit {
  formGroup!: FormGroup<FormGroupType<Partial<InsuranceDisketHeader>>>;

  employeList?: SelectOptionInterface<any>[];
  benefitDeductions?: SelectOptionInterface<any>[];
  //====
  columnsDefault: AgGridInterFace[] = [
    {
      field: propertyOf<addWorkingTimesDetailDto>("id"),
      hide: true,
    },
    {
      field: propertyOf<addWorkingTimesDetailDto>("code"),
      headerName: "کد",
      cellClass: "text-center",
      width: 80,
    },
    {
      headerName: "ردیف",
      width: 100,
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
      cellRenderer: (params) => {
        if (params.node.rowPinned) {
          return "";
        }
        return params.node.rowIndex + 1;
      },
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
    //=======      headerName: "اطلاعات کارکرد",

    {
      headerName: "اطلاعات کارکرد",
      cellClass: "text-center",
      children: [
        {
          headerName: "کار کردعادی",
          editable: true,
          cellEditor: "agNumberCellEditor",
          field: propertyOf<addWorkingTimesDetailDto>("mozdRoozane"),
          cellRenderer: "agAnimateShowChangeCellRenderer",
          width: 150,
          aggFunc: "sum",
        },
        {
          field: propertyOf<addWorkingTimesDetailDto>("mamooriat"),
          headerName: "ماموریت",
          editable: true,
          cellEditor: "agNumberCellEditor",
          width: 100,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
          field: propertyOf<addWorkingTimesDetailDto>("jamHoghogh"),
          headerName: "تعطیل کاری",
          editable: true,
          cellEditor: "agNumberCellEditor",
          width: 150,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
      ],
    },
    //=======      headerName: "مزایا",
    {
      headerName: "مزایا",
      cellClass: "text-center",
      children: [
        {
          headerName: "حقوق پایه",
          editable: true,
          cellEditor: "agNumberCellEditor",
          field: propertyOf<addWorkingTimesDetailDto>("bimePardakhti"),
          cellRenderer: "agAnimateShowChangeCellRenderer",
          width: 150,
          aggFunc: "sum",
        },
        {
          field: propertyOf<addWorkingTimesDetailDto>("mamooriat"),
          headerName: "پاداش",
          editable: true,
          cellEditor: "agNumberCellEditor",
          width: 100,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
          field: propertyOf<addWorkingTimesDetailDto>("jamHoghogh"),
          headerName: "حق بن",
          editable: true,
          cellEditor: "agNumberCellEditor",
          width: 100,
          aggFunc: "sum",
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
      ],
      width: 200,
    },
    //=======      headerName: "کسورات",
    {
      headerName: "کسورات",
      cellClass: "text-center",
      children: [
        {
          headerName: "تسهیلات",
          editable: true,
          cellEditor: "agNumberCellEditor",
          field: propertyOf<addWorkingTimesDetailDto>("tashilat"),
          cellRenderer: "agAnimateShowChangeCellRenderer",
          width: 200,
          aggFunc: "sum",
        },
      ],
      width: 200,
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
  //=======InsuranceDisket
  columnsInsuranceDisketDefault: AgGridInterFace[] = [
    {
      field: propertyOf<InsuranceDisketDto>("id"),
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
          return "";
        }
        return params.node.rowIndex + 1;
      },
    },
    {
      field: propertyOf<InsuranceDisketDto>("codenumber"),
      headerName: "codenumber",
      width: 80,
    },
    {
      field: propertyOf<InsuranceDisketDto>("ezafeKari_17"),
      headerName: "ezafeKari_17",
      width: 80,
    },
    {
      field: propertyOf<InsuranceDisketDto>("eydiSalane_23"),
      headerName: "eydiSalane_23",
      width: 80,
    },
  ];
  rowDataInsuranceDisketDefault = new Array<any>();
  //
  //=========TaxDisket
  columnsTaxDisketListDefault: AgGridInterFace[] = [
    {
      field: propertyOf<taxDisketDto>("id"),
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
          return "";
        }
        return params.node.rowIndex + 1;
      },
    },
    {
      field: propertyOf<taxDisketDto>("categoryName"),
      headerName: "categoryName",
      width: 80,
    },
    {
      field: propertyOf<taxDisketDto>("fullName"),
      headerName: "fullName",
      cellClass: "text-center",
      width: 100,
    },
    {
      field: propertyOf<taxDisketDto>("countryOfCitizenshipName"),
      headerName: "countryOfCitizenshipName",
      cellClass: "text-center",
      width: 100,
    },
    {
      field: propertyOf<taxDisketDto>("employmentTypeName"),
      headerName: "employmentTypeName",
      cellClass: "text-center",
      width: 100,
    },
    {
      field: propertyOf<taxDisketDto>("insuranceName"),
      headerName: "insuranceName",
      cellClass: "text-center",
      width: 100,
    },
  ];
  rowDataTaxDisketListDefault = new Array<any>();
  //=====

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
  selectedTabIndex: number = 0;
  tabType = tabType;
  feilds: SectionData[] = [];

  monthlySections: Section[] = [
    {
      columns: [
        [
          {
            title: "dsK_BIC",
            binding: propertyOf<InsuranceDisketHeader>("dsK_BIC"),
            type: "lbl",
            config: {
              separator: true,
            },
          },
          {
            title: "dsK_TROOZ",
            binding: propertyOf<InsuranceDisketHeader>("dsK_TROOZ"),
            type: "lbl",
            config: {
              separator: true,
            },
          },
          {
            title: "آدرس کارگاه",
            binding: propertyOf<InsuranceDisketHeader>("workShopAddress"),
            type: "lbl",
          },
        ],
        [
          {
            title: "کد کارگاه",
            binding: propertyOf<InsuranceDisketHeader>("dsK_TROOZ"),
            type: "lbl",
            config: {
              separator: true,
            },
          },
          {
            title: "شماره لیست",
            binding: propertyOf<InsuranceDisketHeader>("dsK_LISTNO"),
            type: "textbox",
            validators: [
              {
                type: Validators.required,
              },
            ],
            columnWidthNumber: 2,
            config: {
              onlyNumber: true,
              type: "currency",
              maskType: "separator",
            },
            changeEvent: (event) => {
              if (event == "") {
                this._toastService.error("این فیلد اجباری است");
              } else {
                this.showLoading = true;
                let model: ChangeInsuranceDisket = {
                  dsK_LISTNO: +event,
                  id: this.insuranceDisketHeader.code,
                  workShopId: 0,
                };
                this._salaryCalculationService
                  .ChangeInsuranceDisketListNumber(model)
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
                  });
              }
            },
          },
        ],
        [
          {
            title: "نام کارگاه",
            binding: propertyOf<InsuranceDisketHeader>("workShopName"),
            type: "lbl",
          },
          {
            title: "تعداد نفرات",
            binding: propertyOf<InsuranceDisketHeader>("dsK_TROOZ"),
            type: "lbl",
            config: {
              separator: true,
            },
          },
        ],
        [
          {
            title: "نام کارگاه",
            binding: propertyOf<InsuranceDisketHeader>("dsK_TROOZ"),
            type: "lbl",
          },
          {
            title: "تعداد نفرات",
            binding: propertyOf<InsuranceDisketHeader>("dsK_TROOZ"),
            type: "lbl",
            config: {
              separator: true,
            },
          },
        ],
      ],
    },
    {
      columns: [
        [
          {
            title: "جمع دستمزد روزانه",
            binding: propertyOf<InsuranceDisketHeader>("dsK_TROOZ"),
            type: "lbl",
            config: {
              separator: true,
            },
          },
          {
            title: "جمع دستمزد ماهانه",
            binding: propertyOf<InsuranceDisketHeader>("dsK_TROOZ"),
            type: "lbl",
            config: {
              separator: true,
            },
          },
          {
            title: "نرخ حق بیمه",
            binding: propertyOf<InsuranceDisketHeader>("dsK_TROOZ"),
            type: "lbl",
          },
        ],
        [
          {
            title: "جمع مزایای ماهانه مشمول",
            binding: propertyOf<InsuranceDisketHeader>("dsK_TROOZ"),
            type: "lbl",
            config: {
              separator: true,
            },
          },
          {
            title: "جمع دستمزد و مزایا ماهانه مشمول",
            binding: propertyOf<InsuranceDisketHeader>("dsK_TROOZ"),
            type: "lbl",
            config: {
              separator: true,
            },
          },
          {
            title: "جمع کل دستمزد و مزایای ماهانه",
            binding: propertyOf<InsuranceDisketHeader>("dsK_TROOZ"),
            type: "lbl",
            config: {
              separator: true,
            },
          },
        ],
      ],
    },
    {
      columns: [
        [
          {
            title: "مبلغ فیش پرداختی حق بیمه",
            binding: propertyOf<InsuranceDisketHeader>("dsK_TROOZ"),
            type: "lbl",
            config: {
              separator: true,
            },
          },
        ],
      ],
    },
  ];
  insuranceDisketHeader: InsuranceDisketHeader;

  constructor(
    private _changeWorkShops: ChangeWorkShopsService,
    private _toastService: ToastService,
    private _salaryCalculationService: salaryCalculationService,
    private readonly _location: Location,
    private _modalService: ModalService,
    private readonly _formBuilder: FormBuilder
  ) {
    this.formGroup = this._formBuilder.group({});

    this.persianBirthDate = DateUtilies.convertDateToNgbDateStruct(
      new Date().toLocaleDateString()
    );
  }
  ngOnInit(): void {
    this.yearlyList = DateUtilies.generateYearlyList();
    this.addDraftDto.month = DateUtilies.getCurrentMonth().value;
    this.addDraftDto.year = DateUtilies.getCurrentYear();
  }
  saveCellHandeler(data) {}
  selectTabHandler({ index }: { index: number }) {
    this.selectedTabIndex = index;
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
    switch (this.selectedTabIndex) {
      case this.tabType.SalaryList:
        this.salaryCalculationAdd();
        break;
      case this.tabType.InsuranceDisket:
        this.salarInsuranceDiskeAdd();
        break;
      case this.tabType.TaxDisket:
        this.salarTaxDisketAdd();
        break;
    }
    this.showLoading = true;
  }
  salaryCalculationAdd() {
    this._salaryCalculationService
      .Add(this.addDraftDto)
      .pipe(
        finalize(() => {
          this.showLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          if (res.isOk) {
            this._toastService.success(res.data.message);
            this.rowDataDefault = res.data.salaryList;
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
  salarTaxDisketAdd() {
    this._salaryCalculationService
      .TaxDisketAdd(this.addDraftDto)
      .pipe(
        finalize(() => {
          this.showLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          if (res.isOk) {
            this._toastService.success(res.data.message);
            this.rowDataTaxDisketListDefault = res.data.taxDisketList;
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
  salarInsuranceDiskeAdd() {
    this._salaryCalculationService
      .InsuranceDiskeAdd(this.addDraftDto)
      .pipe(
        finalize(() => {
          this.showLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          if (res.isOk) {
            this._toastService.success(res.data.message);
            this.insuranceDisketHeader = res.data.header;
            this.rowDataInsuranceDisketDefault = res.data.details;
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
  saveHander() {}
  selectedRowsChange(details: addWorkingTimesDetailDto[]) {
    this.selectRow = details;
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
          let model: any = {
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

  onDeleteItem(item: any) {
    this.showLoadingDelete = true;
    this._salaryCalculationService
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
