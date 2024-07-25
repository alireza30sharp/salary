import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiUrlService } from "../../api-url.service";
import { WorkShopsFilter } from "../models";
import { Data, response } from "../../shared/models";
import { BenefitDeductionDto } from "../models/benefit-deduction.model";
import { wageOrdersDto } from "../models/wage-orders.model";

@Injectable()
export class WageOrdersService {
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService
  ) {}

  get(params?: WorkShopsFilter) {
    let PageNumber: number = 1;
    let PageSize: number = 20;
    return this.$http.get<response<Data<BenefitDeductionDto[]>>>(
      this.urlSvc.WageOrders.GetWageOrderListOfEmployee,
      {
        params: {
          EmployeeId: 0,
          PageNumber: PageNumber,
          PageSize: PageSize,
          WorkShopId: this.getWorkShopsID(),
        },
      }
    );
  }
  create(model: wageOrdersDto) {
    model.workShopId = this.getWorkShopsID();
    return this.$http.post<response<any>>(this.urlSvc.WageOrders.Add, model);
  }

  getWorkShopsID(): number {
    let WorkShopsID = localStorage.getItem("WorkShopsID");
    if (WorkShopsID) {
      return +WorkShopsID;
    } else return null;
  }
  delete(workShopId, id?: any) {
    return this.$http.delete<response<string>>(this.urlSvc.WageOrders.Delete, {
      body: { workShopId: this.getWorkShopsID(), id: id },
    });
  }
  getById(id) {
    return this.$http.get<response<any>>(this.urlSvc.WageOrders.getById, {
      params: { workShopId: this.getWorkShopsID(), id: id },
    });
  }
  update(model: wageOrdersDto) {
    model.workShopId = this.getWorkShopsID();
    return this.$http.put<response<any>>(this.urlSvc.WageOrders.Edit, model);
  }
}
