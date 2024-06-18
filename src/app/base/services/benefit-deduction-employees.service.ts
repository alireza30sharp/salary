import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiUrlService } from "../../api-url.service";
import { WorkShopsFilter } from "../models";
import { Data, response } from "../../shared/models";
import { BenefitDeductionEmployeesDto } from "../models/benefit-deduction-employees.model";

@Injectable()
export class BenefitDeductionEmployeesService {
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService
  ) {}

  getAll(params?: WorkShopsFilter) {
    let PageNumber: number = 0;
    let PageSize: number = 20;
    return this.$http.get<response<Data<any[]>>>(
      this.urlSvc.BenefitDeductionEmployees.GetBenefitDeductionEmployeesList,
      {
        params: {
          YearFrom: 0,
          DateFrom:new Date().toLocaleString(),
          DateTo: new Date().toLocaleString(),
          YearTo: 0,
          MonthFrom:0,
          MonthTo:0,
          WorkShopId: this.getWorkShopsID(),
          PageNumber: PageNumber,
          PageSize: PageSize,
        },
      }
    );
  }
  create(model: BenefitDeductionEmployeesDto) {
    model.workShopId = this.getWorkShopsID();
    return this.$http.post<response<any>>(this.urlSvc.BenefitDeductionEmployees.Add, model);
  }
  delete(id) {
    return this.$http.delete<response<string>>(this.urlSvc.BenefitDeductionEmployees.Delete, {
      body: { workShopId: this.getWorkShopsID(), employeeId: id },
    });
  }
  update(model: BenefitDeductionEmployeesDto) {
    model.workShopId = this.getWorkShopsID();
    return this.$http.put<response<any>>(this.urlSvc.BenefitDeductionEmployees.Edit, model);
  }

  getById(employeId) {
    return this.$http.get<response<any>>(this.urlSvc.BenefitDeductionEmployees.getById, {
      params: { WorkShopId: this.getWorkShopsID(), EmployeeId: employeId },
    });
  }
  getWorkShopsID(): number {
    let WorkShopsID = localStorage.getItem("WorkShopsID");
    if (WorkShopsID) {
      return +WorkShopsID;
    } else return null;
  }
}
