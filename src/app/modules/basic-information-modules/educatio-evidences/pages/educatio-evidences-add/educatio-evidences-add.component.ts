import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { delay, finalize } from "rxjs";

import { Location } from "@angular/common";
import { ToastService } from "../../../../../shared/services";
import { GeneralFormComponent } from "../../../../../shared/components/general-form/general-form.component";
import { FormFieldConfigType } from "../../../../../shared/types/form-field-config.type";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { propertyOf } from "../../../../../shared/utilities/property-of";
import { FormGroupType } from "../../../../../shared/utilities/utility-types";
import { EducationEvidencesDto } from "../../models";
import { EducationEvidencesService } from "../../services/education-evidences.service";

@Component({
  selector: "app-educatio-evidences-add",
  templateUrl: "./educatio-evidences-add.component.html",
  styleUrls: ["educatio-evidences-add.component.scss"],
  providers: [EducationEvidencesService],
})
export class EducationEvidencesAddComponent implements OnInit {
  formGroup!: FormGroup<FormGroupType<Partial<EducationEvidencesDto>>>;
  form: NgForm;
  feilds: FormFieldConfigType[] = [];
  model: Partial<EducationEvidencesDto>;

  showLoading: boolean;
  constructor(
    private _EducationEvidencesService: EducationEvidencesService,
    private readonly _location: Location,
    private readonly _formBuilder: FormBuilder,
    private _toastService: ToastService
  ) {
    this.formGroup = this._formBuilder.group({});
    // this.formGroup.valueChanges.subscribe((values) => {
    //   this._formChangeHandler(values);
    // });
  }
  ngOnInit(): void {
    this._initForm();
  }
  ngAfterViewInit(): void {}

  saveHandler() {
    this.showLoading = true;
    this._EducationEvidencesService
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
  cancelClickHandler() {
    this._location.back();
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
  private _formChangeHandler(values: Partial<EducationEvidencesDto>) {
    setTimeout(() => {
      let valid = this.formGroup.invalid;
      console.table(valid);
    }, 0);
  }
}
