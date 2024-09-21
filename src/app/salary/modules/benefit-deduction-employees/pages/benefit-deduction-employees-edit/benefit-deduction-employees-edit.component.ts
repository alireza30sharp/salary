import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { delay, finalize } from "rxjs";
import { Location } from "@angular/common";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BenefitDeductionEmployeesService } from "../../services/benefit-deduction-employees.service";
import { BenefitDeductionEmployeesDto } from "../../models";
import { FormGroupType } from "../../../../../shared/utilities/utility-types";
import { FormFieldConfigType } from "../../../../../shared/types/form-field-config.type";
import { ToastService } from "../../../../../shared/services";
import { propertyOf } from "../../../../../shared/utilities/property-of";
import { ChangeWorkShopsService } from "../../../../../services/change-work-shop.service";
import { SelectOptionInterface } from "../../../../../shared/interfaces/select-option.interface";
import { ListItem } from "../../../../../shared/interfaces/list-item.interface";

@Component({
  selector: "app-benefit-deduction-employees-edit",
  templateUrl: "./benefit-deduction-employees-edit.component.html",
  styleUrls: ["./benefit-deduction-employees-edit.component.scss"],
  providers: [BenefitDeductionEmployeesService],
})
export class BenefitDeductionEmployeesEditComponent implements OnInit {
  formGroup!: FormGroup<FormGroupType<Partial<BenefitDeductionEmployeesDto>>>;
  form: NgForm;
  feilds: FormFieldConfigType[] = [];
  model: Partial<BenefitDeductionEmployeesDto>;
  id: number;
  isLoading: boolean;
  benefitDeductions?: SelectOptionInterface<any>[];
  employeList?: SelectOptionInterface<any>[];
  showLoading: boolean;
  constructor(
    private _BenefitDeductionEmployeesService: BenefitDeductionEmployeesService,
    private readonly _location: Location,
    private readonly _formBuilder: FormBuilder,
    private _toastService: ToastService,
    private _changeWorkShops: ChangeWorkShopsService,
    private _activatedRoute: ActivatedRoute,
    private readonly _destroyRef: DestroyRef
  ) {
    this.formGroup = this._formBuilder.group({});
    this._changeWorkShops.benefitAndDeductionsSource$
      .pipe(delay(100))
      .subscribe((benefitDeductionsData) => {
        if (benefitDeductionsData) {
          this.benefitDeductions = benefitDeductionsData;
        }
      });
    this._changeWorkShops.employeListData$
      .pipe(delay(100))
      .subscribe((employeList) => {
        if (employeList) {
          this.employeList = employeList;
        }
      });
  }
  ngOnInit(): void {
    this._initForm();
    this.id = this._activatedRoute.snapshot.params["id"];

    this._getData();
  }

  saveHandler() {
    this.showLoading = true;
    this.formGroup.value.workShopId = this.id;
    this._BenefitDeductionEmployeesService
      .update(this.formGroup.value)
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
          this._location.back();
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
  cancelClickHandler() {
    this._location.back();
  }

  private _getData() {
    this.isLoading = true;
    setTimeout(() => {
      this._BenefitDeductionEmployeesService
        .getById(this.id)
        .pipe(
          takeUntilDestroyed(this._destroyRef),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe((res) => {
          if (res.isOk) {
            this.model = res.data;
          }
        });
    }, 3000);
  }

  private _initForm() {
    this.feilds = [
      {
        type: "date-picker",
        invisible: true,
        title: "MARRIAGE DATE",
        binding: propertyOf<BenefitDeductionEmployeesDto>("dateAction"),
        validators: [
          {
            type: Validators.required,
          },
        ],
      },
      {
        type: "select",
        title: "نام کارمند",
        binding: propertyOf<BenefitDeductionEmployeesDto>("employeeId"),
        config: {
          options: this.employeList,
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
        title: "مزایا کسورات",
        binding: propertyOf<BenefitDeductionEmployeesDto>("benefitDeductionId"),
        config: {
          options: this.benefitDeductions,
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
        title: "از مبلغ",
        binding: propertyOf<BenefitDeductionEmployeesDto>("price"),
        config: {
          type: "number",
          onlyNumber: true,
          maskType: "separator",
        },
        validators: [
          {
            type: Validators.required,
          },
        ],
      },
      {
        type: "textarea",
        title: "توضیحات",
        binding: propertyOf<BenefitDeductionEmployeesDto>("comment"),
        columnWidthNumber: 12,
      },
    ];
  }
}
