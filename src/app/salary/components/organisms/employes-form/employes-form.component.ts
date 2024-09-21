import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { Form, NgForm } from "@angular/forms";
import { EmployeDto } from "../../../models/employee.model";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { SelectOptionInterface } from "./../../../../shared/interfaces/select-option.interface";
import { genderList } from "../../../../../app/salary/models/rul";
import { DateUtilies } from "./../../../../shared/utilities/Date";
import { KiTabGroupComponent } from "./../../../../shared/ki-components";

@Component({
  selector: "app-employes-form",
  templateUrl: "./employes-form.component.html",
  styleUrls: ["./employes-form.component.scss"],
})
export class EmployesFormComponent implements OnInit, AfterViewInit {
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
  @Output() submitCallback = new EventEmitter<EmployeDto>();
  _companyForm: NgForm;
  persianBirthDate: NgbDateStruct;
  genderOptions: SelectOptionInterface<number>[] = [];

  lockupsIsLoading: boolean = false;
  setFocusItem: boolean = false;
  constructor(private cdr: ChangeDetectorRef) {}
  ngAfterViewInit(): void {
    this._updateFormTabErrorBadge();
  }
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
  submitHandler(companyForm: any) {
    this.model.persianBirthDate = DateUtilies.convertDate(
      this.persianBirthDate
    );
    debugger;
    this.submitCallback.emit(this.model);
    this.setFocusItem = Object.assign({}, true);
    this.model = new EmployeDto();
  }
  private _updateFormTabErrorBadge() {
    this._companyForm.valueChanges.subscribe((res) => {
      this._tabGroup.items[0].error = this._companyForm.invalid
        ? "Form_Is_Invalid"
        : null;
    });

    this.cdr.detectChanges();
  }
}
