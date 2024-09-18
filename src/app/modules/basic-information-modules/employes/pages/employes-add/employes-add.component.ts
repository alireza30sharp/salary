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
import { EmployeDto } from "../../models";
import { genderList, TypeOptions } from "../../../../../base/models/rul";
import { ListItem } from "../../../../../shared/interfaces/list-item.interface";
import { KiTabGroupComponent } from "../../../../../shared/ki-components";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { SelectOptionInterface } from "../../../../../shared/interfaces/select-option.interface";
import { DateUtilies } from "../../../../../shared/utilities/Date";
import { EmployesService } from "../../services/employes.service";

@Component({
  selector: "app-employes-add",
  templateUrl: "./employes-add.component.html",
  styleUrls: ["employes-add.component.scss"],
  providers: [EmployesService],
})
export class EmployesAddComponent implements OnInit {
  @ViewChild("tabGroup") set tabGroup(elm: KiTabGroupComponent) {
    if (elm) {
      this._tabGroup = elm;
    }
  }
  @ViewChild("companyForm") set companyForm(elm: NgForm) {
    if (elm) {
      this._companyForm = elm;
    }
  }
  _tabGroup: KiTabGroupComponent;
  @Input() submitButtonId?: string = "submit-button-employes";
  @Input() model: EmployeDto = new EmployeDto();
  _companyForm: NgForm;
  persianBirthDate: NgbDateStruct;
  genderOptions: SelectOptionInterface<number>[] = [];
  lockupsIsLoading: boolean = false;
  setFocusItem: boolean = false;
  showLoading: boolean;
  constructor(
    private _EmployesService: EmployesService,
    private readonly _location: Location,
    private readonly _formBuilder: FormBuilder,
    private _toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.genderOptions = genderList.map((item) => ({
      label: item.label,
      value: item.value,
    }));
    if (this.model.persianBirthDate) {
      this.persianBirthDate = DateUtilies.convertDateToNgbDateStruct(
        this.model.persianBirthDate
      );
    }
  }
  ngAfterViewInit(): void {
    this._updateFormTabErrorBadge();
  }

  cancelClickHandler() {
    this._location.back();
  }

  submitHandler(companyForm: any) {
    this.model.persianBirthDate = DateUtilies.convertDate(
      this.persianBirthDate
    );
    this.showLoading = true;
    this._EmployesService
      .create(companyForm.value)
      .pipe(
        finalize(() => {
          this.showLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          this._toastService.success(res.data.message);
          this.model = new EmployeDto();
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
  private _updateFormTabErrorBadge() {
    this._companyForm.valueChanges.subscribe((res) => {
      this._tabGroup.items[0].error = this._companyForm.invalid
        ? "Form_Is_Invalid"
        : null;
    });
  }
}
