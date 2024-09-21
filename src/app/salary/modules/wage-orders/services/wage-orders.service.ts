import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiUrlService } from "../../../../api-url.service";
import { Data, response } from "../../../../shared/models";
import { wageOrderListDto, wageOrdersDto } from "../models/wage-orders.model";
import { SessionNames } from "../../../../shared/utilities/session-names";
import { SessionStorage } from "ngx-webstorage";
@Injectable()
export class WageOrdersService {
  @SessionStorage(SessionNames.WorkShopsID)
  WorkShopsID: any;
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService
  ) {}

  get(params?: any) {
    let PageNumber: number = 1;
    let PageSize: number = 20;
    return this.$http.get<response<Data<wageOrderListDto[]>>>(
      this.urlSvc.WageOrders.GetWageOrderListOfEmployee,
      {
        params: {
          EmployeeId: 0,
          PageNumber: PageNumber,
          PageSize: PageSize,
          WorkShopId: this.WorkShopsID,
        },
      }
    );
  }
  create(model: wageOrdersDto) {
    model.workShopId = this.WorkShopsID;
    return this.$http.post<response<any>>(this.urlSvc.WageOrders.Add, model);
  }

  delete(employeeId?: any, wageOrderId?: any) {
    return this.$http.delete<response<string>>(this.urlSvc.WageOrders.Delete, {
      body: {
        workShopId: this.WorkShopsID,
        employeeId: employeeId,
        wageOrderId: wageOrderId,
      },
    });
  }
  getById(id) {
    return this.$http.get<response<any>>(this.urlSvc.WageOrders.getById, {
      params: { workShopId: this.WorkShopsID, WageOrderId: id },
    });
  }
  update(model: wageOrdersDto) {
    model.workShopId = this.WorkShopsID;
    return this.$http.put<response<any>>(this.urlSvc.WageOrders.Edit, model);
  }
}
