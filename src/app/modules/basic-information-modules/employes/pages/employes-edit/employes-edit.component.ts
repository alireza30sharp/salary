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
import { TypeOptions } from "../../../../../salary/models/rul";
import { ListItem } from "../../../../../shared/interfaces/list-item.interface";
import { EmployesService } from "../../services/employes.service";
import { EmployeDto } from "../../models";
import { KiTabGroupComponent } from "../../../../../shared/ki-components";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { SelectOptionInterface } from "../../../../../shared/interfaces/select-option.interface";

@Component({
  selector: "app-employes-edit",
  templateUrl: "./employes-edit.component.html",
  styleUrls: ["./employes-edit.component.scss"],
  providers: [EmployesService],
})
export class EmployesEditComponent implements OnInit {
  @ViewChild("tabGroup") set tabGroup(elm: KiTabGroupComponent) {
    if (elm) {
      this._tabGroup = elm;
    }
  }
  @ViewChild("companyForm") set companyForm(elm: NgForm) {
    if (elm) {
      this._companyForm = elm;
      this._updateFormTabErrorBadge();
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
  isLoading: boolean;
  id: number;
  constructor(
    private _EmployesService: EmployesService,
    private readonly _destroyRef: DestroyRef,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _formBuilder: FormBuilder,
    private _toastService: ToastService,
    private readonly _location: Location
  ) {}
  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params["id"];

    this._getData();
  }
  ngAfterViewInit(): void {}

  submitHandler(companyForm: any) {
    this.showLoading = true;
    this.model.id = this.id;
    this._EmployesService
      .update(this.model)
      .pipe(
        finalize(() => {
          this.showLoading = false;
        })
      )
      .subscribe({
        next: (res) => {
          this._toastService.success(res.data.message);

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
      this._EmployesService
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
  private _updateFormTabErrorBadge() {
    this._companyForm.valueChanges.subscribe((res) => {
      this._tabGroup.items[0].error = this._companyForm.invalid
        ? "Form_Is_Invalid"
        : null;
    });
  }
}
