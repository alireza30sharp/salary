import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiUrlService } from "../../../api-url.service";
import { Data, response } from "../../../shared/models";
import { SessionNames } from "../../../shared/utilities/session-names";
import { SessionStorage } from "ngx-webstorage";
import { WorkShopsFilter } from "../../../salary/models";
import { EmploymentOrdersDto } from "../models";
@Injectable()
export class EmploymentOrderService {
  @SessionStorage(SessionNames.WorkShopsID)
  WorkShopsID: any;
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
          WorkShopId: this.WorkShopsID,
          PageNumber: PageNumber,
          PageSize: PageSize,
        },
      }
    );
  }
  create(model: EmploymentOrdersDto) {
    model.workShopId = this.WorkShopsID;
    return this.$http.post<response<any>>(
      this.urlSvc.EmploymentOrders.Add,
      model
    );
  }
  delete(id, employeeId) {
    return this.$http.delete<response<string>>(
      this.urlSvc.EmploymentOrders.Delete,
      {
        body: { workShopId: this.WorkShopsID, employeeId: employeeId, id: id },
      }
    );
  }
  update(model: EmploymentOrdersDto) {
    model.workShopId = this.WorkShopsID;
    return this.$http.put<response<any>>(
      this.urlSvc.EmploymentOrders.Edit,
      model
    );
  }

  getById(employeId) {
    return this.$http.get<response<any>>(this.urlSvc.EmploymentOrders.getById, {
      params: { WorkShopId: this.WorkShopsID, Id: employeId },
    });
  }
}
