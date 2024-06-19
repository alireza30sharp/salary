import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiUrlService } from "../../api-url.service";
import { WorkShopsFilter } from "../models";
import { Data, response } from "../../shared/models";
import { EmploymentOrdersDto } from "../models/employment-orders.model";

@Injectable()
export class EmploymentOrdersService {
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService
  ) {}

  getAll(params?: WorkShopsFilter) {
    let PageNumber: number = 0;
    let PageSize: number = 20;
    return this.$http.get<response<Data<any[]>>>(
      this.urlSvc.EmploymentOrders.GetAllEmploymentOrder,
      {
        params: {
          EmployeeId: 0,
          WorkShopId: this.getWorkShopsID(),
          PageNumber: PageNumber,
          PageSize: PageSize,
        },
      }
    );
  }
  create(model: EmploymentOrdersDto) {
    model.workShopId = this.getWorkShopsID();
    return this.$http.post<response<any>>(this.urlSvc.EmploymentOrders.Add, model);
  }
  delete(id) {
    return this.$http.delete<response<string>>(this.urlSvc.EmploymentOrders.Delete, {
      body: { workShopId: this.getWorkShopsID(), employeeId: id },
    });
  }
  update(model: EmploymentOrdersDto) {
    model.workShopId = this.getWorkShopsID();
    return this.$http.put<response<any>>(this.urlSvc.EmploymentOrders.Edit, model);
  }

  getById(employeId) {
    return this.$http.get<response<any>>(this.urlSvc.EmploymentOrders.getById, {
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
