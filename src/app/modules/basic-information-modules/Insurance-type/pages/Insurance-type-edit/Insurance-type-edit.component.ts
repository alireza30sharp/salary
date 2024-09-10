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
import { InsuranceTypeService } from "../../services/Insurance-type.service";
import { FormFieldConfigType } from "../../../../../shared/types/form-field-config.type";
import { InsuranceTypDto } from "../../models/Insurance-type.model";
import { FormGroup, Validators } from "@angular/forms";
import { GeneralFormComponent } from "../../../../../shared/components/general-form/general-form.component";
import { propertyOf } from "../../../../../shared/utilities/property-of";

@Component({
  selector: "app-insurance-type-edit",
  templateUrl: "./insurance-type-edit.component.html",
  styleUrls: ["./insurance-type-edit.component.scss"],
  providers: [InsuranceTypeService],
})
export class InsuranceTypeEditComponent implements OnInit {
  @ViewChild("generalForm", { static: false })
  generalForm: GeneralFormComponent;

  feilds: FormFieldConfigType[] = [];
  model: Partial<InsuranceTypDto>;

  isLoading: boolean;
  constructor(
    private _insuranceTypeService: InsuranceTypeService,
    private readonly _destroyRef: DestroyRef
  ) {}
  ngOnInit(): void {
    this._initForm();

    // this.wageOrderId = this._activatedRoute.snapshot.params["id"];
    this._getData();
  }

  onRefrashSelected() {}

  submitHandler(event: FormGroup) {
    console.log(event);
  }
  saveHandler(data: InsuranceTypDto) {
    console.log(data);
  }
  cancelClickHandler() {
    // this._location.back();
  }

  private _getData() {
    this.isLoading = true;
    setTimeout(() => {
      this._insuranceTypeService
        .getById(12)
        .pipe(
          takeUntilDestroyed(this._destroyRef),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe((res) => {
          if (res.isOk) {
          }
        });
    }, 3000);
  }

  private _initForm() {
    this.feilds = [
      {
        idAttr: "txtFistName",
        type: "textbox",
        title: "نوع بیمه ",
        columnWidthNumber: 3,
        binding: propertyOf<InsuranceTypDto>("insuranceType"),
        validators: [
          {
            type: Validators.required,
          },
        ],
      },
      {
        type: "textbox",
        title: "ترتیب",
        binding: propertyOf<InsuranceTypDto>("orderIndex"),
        columnWidthNumber: 3,
        validators: [
          {
            type: Validators.required,
          },
        ],
        config: {
          type: "number",
          onlyNumber: true,
        },
        changeEvent: (changedValue, formGroup) => {},
      },
      {
        type: "checkbox",
        title: "پیش فرض",
        binding: propertyOf<InsuranceTypDto>("isDefault"),
        columnWidthNumber: 3,
      },
    ];
  }
}
