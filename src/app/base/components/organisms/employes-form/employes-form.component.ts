import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Form } from "@angular/forms";
import { EmployeDto } from "../../../models/employee.model";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { SelectOptionInterface } from "../../../../shared/interfaces/select-option.interface";
import { genderList } from "../../../../../app/base/models/rul";
import { DateUtilies } from "../../../../shared/utilities/Date";

@Component({
  selector: "app-employes-form",
  templateUrl: "./employes-form.component.html",
  styleUrls: ["./employes-form.component.scss"],
})
export class EmployesFormComponent implements OnInit {
  @Input() submitButtonId?: string = "submit-button-employes";
  @Input() model: EmployeDto = new EmployeDto();
  @Output() submitCallback = new EventEmitter<EmployeDto>();
  persianBirthDate: NgbDateStruct;
  genderOptions: SelectOptionInterface<number>[] = [];

  lockupsIsLoading: boolean = false;
  setFocusItem: boolean = false;
  constructor() {}
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
    this.submitCallback.emit(this.model);
    this.setFocusItem = Object.assign({}, true);
    this.model = new EmployeDto();
  }
}
