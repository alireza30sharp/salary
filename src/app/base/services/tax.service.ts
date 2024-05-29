import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiUrlService } from "../../api-url.service";
import { WorkShopsFilter } from "../models";
import { Data, response } from "../../shared/models";
import { BenefitDeductionDto } from "../models/benefit-deduction.model";
import { TaxDto } from "../models/tax.model";

@Injectable()
export class TaxService {
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService
  ) {}

  getTaxList(params?: WorkShopsFilter) {
    let PageNumber: number = 1;
    let PageSize: number = 20;
    return this.$http.get<response<Data<BenefitDeductionDto[]>>>(
      this.urlSvc.Tax.GetAllTaxData,
      {
        params: {
          PageNumber: PageNumber,
          PageSize: PageSize,
          WorkShopId: this.getWorkShopsID(),
        },
      }
    );
  }
  createTax(model: TaxDto) {
    model.workShopId = this.getWorkShopsID();
    return this.$http.post<response<any>>(this.urlSvc.Tax.Add, model);
  }

  getWorkShopsID(): number {
    let WorkShopsID = localStorage.getItem("WorkShopsID");
    if (WorkShopsID) {
      return +WorkShopsID;
    } else return null;
  }
  delete(workShopId, id?: any) {
    return this.$http.delete<response<string>>(this.urlSvc.Tax.Delete, {
      body: { workShopId: this.getWorkShopsID(), id: id },
    });
  }
  getById(id) {
    return this.$http.get<response<any>>(this.urlSvc.Tax.getById, {
      params: { workShopId: this.getWorkShopsID(), id: id },
    });
  }
  update(model: TaxDto) {
    model.workShopId = this.getWorkShopsID();
    return this.$http.put<response<any>>(this.urlSvc.Tax.Edit, model);
  }
}
