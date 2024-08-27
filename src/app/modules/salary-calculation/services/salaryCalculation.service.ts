import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiUrlService } from "../../../api-url.service";
import { Data, response } from "../../../shared/models";

import { SessionNames } from "../../../shared/utilities/session-names";
import { SessionStorage } from "ngx-webstorage";
import { addDraftDto, deleteDto } from "../models";
@Injectable()
export class salaryCalculationService {
  @SessionStorage(SessionNames.WorkShopsID)
  WorkShopsID: any;
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService
  ) {}

  Add(model: addDraftDto) {
    model.workShopId = this.WorkShopsID;
    return this.$http.post<response<any>>(this.urlSvc.SalaryList.Add, model);
  }

  delete(deleteDto: deleteDto) {
    deleteDto.workShopId = this.WorkShopsID;
    return this.$http.delete<response<string>>(this.urlSvc.SalaryList.Delete, {
      body: deleteDto,
    });
  }
  GetMainSalaryListReport(id) {
    return this.$http.get<response<any>>(this.urlSvc.WageOrders.getById, {
      params: { workShopId: this.WorkShopsID, WageOrderId: id },
    });
  }
}
