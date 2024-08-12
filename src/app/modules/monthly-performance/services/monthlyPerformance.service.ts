import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiUrlService } from "../../../api-url.service";
import { Data, response } from "../../../shared/models";
import {
  addDraftDto,
  addWorkingTimesDeleteDto,
  addWorkingTimesDto,
} from "../models/monthly-performance.model";
import { SessionNames } from "../../../shared/utilities/session-names";
import { SessionStorage } from "ngx-webstorage";
@Injectable()
export class MonthlyPerformanceService {
  @SessionStorage(SessionNames.WorkShopsID)
  WorkShopsID: any;
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService
  ) {}

  AddDraft(model: addDraftDto) {
    model.workShopId = this.WorkShopsID;
    return this.$http.post<response<any>>(
      this.urlSvc.WorkingTimes.AddDraft,
      model
    );
  }
  Add(model: addWorkingTimesDto) {
    model.workShopId = this.WorkShopsID;
    return this.$http.post<response<any>>(this.urlSvc.WorkingTimes.Add, model);
  }

  delete(deleteDto: addWorkingTimesDeleteDto) {
    deleteDto.workShopId = this.WorkShopsID;
    return this.$http.delete<response<string>>(
      this.urlSvc.WorkingTimes.Delete,
      {
        body: deleteDto,
      }
    );
  }
  getById(id) {
    return this.$http.get<response<any>>(this.urlSvc.WageOrders.getById, {
      params: { workShopId: this.WorkShopsID, WageOrderId: id },
    });
  }
  update(model: addWorkingTimesDto) {
    model.workShopId = this.WorkShopsID;
    return this.$http.put<response<any>>(this.urlSvc.WorkingTimes.Edit, model);
  }
}
