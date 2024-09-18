import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SessionStorage } from "ngx-webstorage";
import { SessionNames } from "../../../../shared/utilities/session-names";
import { ApiUrlService } from "../../../../api-url.service";
import { WorkShopsFilter } from "../../work-shops/models";
import { Data, response } from "../../../../shared/models";
import { EmployeDto } from "../models";
@Injectable()
export class EmployesService {
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
      this.urlSvc.Employees.GetEmployeeList,
      {
        params: {
          PersonnelCode: 0,
          DisplayName: "",
          NationalCode: "",
          OrganizationUnitId: 0,
          isActive: 1,
          WorkShopId: this.WorkShopsID,
          PageNumber: PageNumber,
          PageSize: PageSize,
        },
      }
    );
  }
  create(model: Partial<EmployeDto>) {
    model.workShopId = this.WorkShopsID;
    return this.$http.post<response<any>>(this.urlSvc.Employees.Add, model);
  }
  delete(id) {
    return this.$http.delete<response<string>>(this.urlSvc.Employees.Delete, {
      body: { workShopId: this.WorkShopsID, employeeId: id },
    });
  }
  update(model: Partial<EmployeDto>) {
    model.workShopId = this.WorkShopsID;
    return this.$http.put<response<any>>(this.urlSvc.Employees.Edit, model);
  }

  getById(employeId) {
    return this.$http.get<response<any>>(this.urlSvc.Employees.getById, {
      params: { WorkShopId: this.WorkShopsID, EmployeeId: employeId },
    });
  }
}
