import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiUrlService } from "../../api-url.service";
import { WorkShopsFilter } from "../models";
import { Data, response } from "../../shared/models";
import { EmployeDto } from "../models/employee.model";

@Injectable()
export class EmployesService {
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService
  ) {}

  getAll(params?: WorkShopsFilter) {
    let PageNumber: number = 0;
    let PageSize: number = 20;
    return this.$http.get<response<Data<any[]>>>(
      this.urlSvc.Employees.GetEmployeeList,
      {
        params: {
          PersonnelCode: 0,
          DisplayName: "",
          NationalCode: "",
          OrganizationUnitId: 0,
          WorkShopId: this.getWorkShopsID(),
          PageNumber: PageNumber,
          PageSize: PageSize,
        },
      }
    );
  }
  create(model: EmployeDto) {
    model.workShopId = this.getWorkShopsID();
    return this.$http.post<response<any>>(this.urlSvc.Employees.Add, model);
  }
  delete(id) {
    return this.$http.delete<response<string>>(this.urlSvc.Employees.Delete, {
      body: { workShopId: this.getWorkShopsID(), employeeId: id },
    });
  }
  update(model: EmployeDto) {
    model.workShopId = this.getWorkShopsID();
    return this.$http.put<response<any>>(this.urlSvc.Employees.Edit, model);
  }

  getById(employeId) {
    return this.$http.get<response<any>>(this.urlSvc.Employees.getById, {
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
