import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiUrlService } from "../../api-url.service";
import { WorkShopsFilter } from "../models";
import { Data, response } from "../../shared/models";
import { BenefitDeductionEmployeesDto } from "../models/benefit-deduction-employees.model";
import { SessionNames } from "../../shared/utilities/session-names";
import { SessionStorage } from "ngx-webstorage";
@Injectable()
export class BenefitDeductionEmployeesService {
  @SessionStorage(SessionNames.WorkShopsID)
  WorkShopsID: any;
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService
  ) {}

  getAll(params?: WorkShopsFilter) {
    let PageNumber: number = 0;
    let PageSize: number = 20;
    debugger;
    return this.$http.get<response<Data<any[]>>>(
      this.urlSvc.BenefitDeductionEmployees.GetBenefitDeductionEmployeesList,
      {
        params: {/*
          DateFrom: null,
          DateTo: null,
          EmployeeId: null,*/
          WorkShopId: this.WorkShopsID,
          PageNumber: PageNumber,
          PageSize: PageSize,
        },
      }
    );
  }
  create(model: BenefitDeductionEmployeesDto) {
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
  update(model: BenefitDeductionEmployeesDto) {
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
