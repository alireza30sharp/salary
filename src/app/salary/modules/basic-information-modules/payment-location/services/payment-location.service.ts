import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SessionStorage } from "ngx-webstorage";
import { SessionNames } from "../../../../../shared/utilities/session-names";
import { ApiUrlService } from "../../../../../api-url.service";
import { WorkShopsFilter } from "../../work-shops/models";
import { Data, response } from "../../../../../shared/models";
import { PaymentLocationDto } from "../models";
@Injectable()
export class PaymentLocationService {
  @SessionStorage(SessionNames.WorkShopsID)
  WorkShopsID: any;
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService
  ) {}

  GetAll(params?: WorkShopsFilter) {
    let PageNumber: number = 0;
    let PageSize: number = 20;
    return this.$http.get<response<Data<any[]>>>(
      this.urlSvc.PaymentLocation.GetAllPaymentLocations,
      {
        params: {
          Id: 0,
          Location: "",
          WorkShopId: this.WorkShopsID,
          PageNumber: PageNumber,
          PageSize: PageSize,
        },
      }
    );
  }
  create(model: Partial<PaymentLocationDto>) {
    model.workShopId = this.WorkShopsID;
    return this.$http.post<response<any>>(
      this.urlSvc.PaymentLocation.Add,
      model
    );
  }
  delete(id) {
    return this.$http.delete<response<string>>(
      this.urlSvc.PaymentLocation.Delete,
      { body: { workShopId: this.WorkShopsID, id: id } }
    );
  }
  update(model: Partial<PaymentLocationDto>) {
    model.workShopId = this.WorkShopsID;
    return this.$http.put<response<any>>(
      this.urlSvc.PaymentLocation.Edit,
      model
    );
  }

  getById(id) {
    return this.$http.get<response<any>>(this.urlSvc.PaymentLocation.getById, {
      params: { workShopId: this.WorkShopsID, id: id },
    });
  }
}
