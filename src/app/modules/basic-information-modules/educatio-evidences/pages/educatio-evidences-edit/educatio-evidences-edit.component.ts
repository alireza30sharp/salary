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
import { FormFieldConfigType } from "../../../../../shared/types/form-field-config.type";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { GeneralFormComponent } from "../../../../../shared/components/general-form/general-form.component";
import { propertyOf } from "../../../../../shared/utilities/property-of";
import { FormGroupType } from "../../../../../shared/utilities/utility-types";
import { ActivatedRoute } from "@angular/router";
import { ToastService } from "../../../../../shared/services";
import { EducationEvidencesDto } from "../../models";
import { EducationEvidencesService } from "../../services/education-evidences.service";

@Component({
  selector: "app-educatio-evidences-edit",
  templateUrl: "./educatio-evidences-edit.component.html",
  styleUrls: ["./educatio-evidences-edit.component.scss"],
  providers: [EducationEvidencesService],
})
export class EducationEvidencesEditComponent implements OnInit {
  formGroup!: FormGroup<FormGroupType<Partial<EducationEvidencesDto>>>;
  form: NgForm;
  feilds: FormFieldConfigType[] = [];
  model: Partial<EducationEvidencesDto>;
  id: number;
  isLoading: boolean;
  showLoading: boolean;
  constructor(
    private _EducationEvidencesService: EducationEvidencesService,
    private readonly _destroyRef: DestroyRef,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _formBuilder: FormBuilder,
    private _toastService: ToastService,
    private readonly _location: Location
  ) {
    this.formGroup = this._formBuilder.group({});
  }
  ngOnInit(): void {
    this._initForm();
    this.id = this._activatedRoute.snapshot.params["id"];

    this._getData();
  }

  saveHandler() {
    this.showLoading = true;
    this.formGroup.value.workShopId = this.id;
    this._EducationEvidencesService
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
      this._EducationEvidencesService
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
        idAttr: "txtFistName",
        type: "textbox",
        title: "مدرک",
        columnWidthNumber: 6,
        binding: propertyOf<EducationEvidencesDto>("evidence"),
        validators: [
          {
            type: Validators.required,
          },
        ],
      },
      {
        type: "textbox",
        title: "ترتیب",
        binding: propertyOf<EducationEvidencesDto>("orderIndex"),
        columnWidthNumber: 6,
        validators: [
          {
            type: Validators.required,
          },
        ],
        config: {
          type: "number",
          onlyNumber: true,
        },
      },
      {
        type: "checkbox",
        title: " پیش فرض'",
        binding: propertyOf<EducationEvidencesDto>("isDefault"),
        columnWidthNumber: 3,
      },
    ];
  }
}
