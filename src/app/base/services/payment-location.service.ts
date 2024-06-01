import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiUrlService } from "../../api-url.service";
import { WorkShopsFilter } from "../models";
import { Data, response } from "../../shared/models";
import { PaymentLocationDto } from "../models/payment-location.model";

@Injectable()
export class PaymentLocationService {
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService
  ) {}

  GetAllPaymentLocations(params?: WorkShopsFilter) {
    let PageNumber: number = 0;
    let PageSize: number = 20;
    return this.$http.get<response<Data<any[]>>>(
      this.urlSvc.PaymentLocation.GetAllPaymentLocations,
      {
        params: {
          Id: 0,
          Location: "",
          WorkShopId: this.getWorkShopsID(),
          PageNumber: PageNumber,
          PageSize: PageSize,
        },
      }
    );
  }
  create(model: PaymentLocationDto) {
    model.workShopId = this.getWorkShopsID();
    return this.$http.post<response<any>>(
      this.urlSvc.PaymentLocation.Add,
      model
    );
  }
  delete(id) {
    return this.$http.delete<response<string>>(
      this.urlSvc.PaymentLocation.Delete,
      { body: { workShopId: this.getWorkShopsID(), id: id } }
    );
  }
  update(model: PaymentLocationDto) {
    model.workShopId = this.getWorkShopsID();
    return this.$http.put<response<any>>(
      this.urlSvc.PaymentLocation.Edit,
      model
    );
  }

  getById(id) {
    return this.$http.get<response<any>>(this.urlSvc.PaymentLocation.getById, {
      params: { workShopId: this.getWorkShopsID(), id: id },
    });
  }
  getWorkShopsID(): number {
    let WorkShopsID = localStorage.getItem("WorkShopsID");
    if (WorkShopsID) {
      return +WorkShopsID;
    } else return null;
  }
}
