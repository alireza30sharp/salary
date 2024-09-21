import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BenefitDeductionEmployeesDto } from "../models/benefit-deduction-employees.model";
import { SessionStorage } from "ngx-webstorage";
import { SessionNames } from "../../../../shared/utilities/session-names";
import { ApiUrlService } from "../../../../api-url.service";
import { WorkShopsFilter } from "../../../../salary/models";
import { Data, response } from "../../../../shared/models";
@Injectable()
export class BenefitDeductionEmployeesService {
  @SessionStorage(SessionNames.WorkShopsID)
  WorkShopsID: any;
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService
  ) {}

  getAll(filterParams?: WorkShopsFilter) {
    let params = new HttpParams();
    // افزودن پارامترها به HttpParams بر اساس مقادیر موجود
    if (
      filterParams?.PageNumber !== undefined &&
      filterParams?.PageNumber !== "" &&
      filterParams.PageNumber !== null
    ) {
      params = params.set("PageNumber", filterParams.PageNumber.toString());
    }
    if (
      filterParams?.PageSize !== undefined &&
      filterParams?.PageSize !== "" &&
      filterParams.PageSize !== null
    ) {
      params = params.set("PageSize", filterParams.PageSize);
    }
    if (
      filterParams?.DateFrom !== undefined &&
      filterParams?.DateFrom !== "" &&
      filterParams.DateFrom !== null
    ) {
      params = params.set("DateFrom", filterParams.DateFrom.toString());
    }
    if (
      filterParams?.DateTo !== undefined &&
      filterParams?.DateTo !== "" &&
      filterParams.DateTo !== null
    ) {
      params = params.set("DateTo", filterParams.DateTo.toString());
    }
    if (
      filterParams?.DateTo !== undefined &&
      filterParams?.DateTo !== "" &&
      filterParams.DateTo !== null
    ) {
      params = params.set("DateTo", filterParams.DateTo.toString());
    }
    if (
      filterParams?.EmployeeId !== undefined &&
      filterParams?.EmployeeId !== "" &&
      filterParams.EmployeeId !== null
    ) {
      params = params.set("EmployeeId", filterParams.EmployeeId);
    }
    if (
      filterParams?.PriceTo !== undefined &&
      filterParams?.PriceTo !== "" &&
      filterParams.PriceTo !== null
    ) {
      params = params.set("PriceTo", filterParams.PriceTo);
    }
    if (
      filterParams?.PriceFrom !== undefined &&
      filterParams?.PriceFrom !== "" &&
      filterParams.PriceFrom !== null
    ) {
      params = params.set("PriceFrom", filterParams.PriceFrom);
    }
    if (this.WorkShopsID !== undefined && this.WorkShopsID !== null) {
      params = params.set("WorkShopId", this.WorkShopsID);
    }

    return this.$http.get<response<Data<any[]>>>(
      this.urlSvc.BenefitDeductionEmployees.GetBenefitDeductionEmployeesList,
      { params: params }
    );
  }
  create(model: Partial<BenefitDeductionEmployeesDto>) {
    model.workShopId = this.WorkShopsID;
    return this.$http.post<response<any>>(
      this.urlSvc.BenefitDeductionEmployees.Add,
      model
    );
  }
  delete(id) {
    return this.$http.delete<response<string>>(
      this.urlSvc.BenefitDeductionEmployees.Delete,
      {
        body: { workShopId: this.WorkShopsID, employeeId: id },
      }
    );
  }
  update(model: Partial<BenefitDeductionEmployeesDto>) {
    model.workShopId = this.WorkShopsID;
    return this.$http.put<response<any>>(
      this.urlSvc.BenefitDeductionEmployees.Edit,
      model
    );
  }

  getById(employeId) {
    return this.$http.get<response<any>>(
      this.urlSvc.BenefitDeductionEmployees.getById,
      {
        params: { WorkShopId: this.WorkShopsID, EmployeeId: employeId },
      }
    );
  }
}
