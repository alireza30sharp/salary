import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiUrlService } from "../../api-url.service";
import { WorkShopsFilter } from "../models";
import { Data, response } from "../../shared/models";
import { BenefitDeductionDto } from "../models/benefit-deduction.model";
import { TaxDto } from "../models/tax.model";
import { SessionNames } from "../../shared/utilities/session-names";
import { SessionStorage } from "ngx-webstorage";
@Injectable()
export class TaxService {
  @SessionStorage(SessionNames.WorkShopsID)
  WorkShopsID: any;
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService
  ) {}
  test() {
    let params: any = {};
    let someConditionForDateFrom = null;
    let someConditionForDateTo = "asda";
    // اگر مقدار پارامتر null نیست، آن را به شیء params اضافه کنید.
    if (someConditionForDateFrom !== null) {
      params.DateFrom = someConditionForDateFrom;
    }

    if (someConditionForDateTo !== null) {
      params.DateTo = someConditionForDateTo;
    }

    return this.$http.get<any>("https://localhost:7125/WeatherForecast", {
      params: params,
    });
  }

  getTaxList(params?: WorkShopsFilter) {
    let PageNumber: number = 1;
    let PageSize: number = 20;
    return this.$http.get<response<Data<TaxDto[]>>>(
      this.urlSvc.Tax.GetAllTaxData,
      {
        params: {
          PageNumber: PageNumber,
          PageSize: PageSize,
          WorkShopId: this.WorkShopsID,
        },
      }
    );
  }
  createTax(model: TaxDto) {
    model.workShopId = this.WorkShopsID;
    return this.$http.post<response<any>>(this.urlSvc.Tax.Add, model);
  }

  delete(workShopId, id?: any) {
    return this.$http.delete<response<string>>(this.urlSvc.Tax.Delete, {
      body: { workShopId: this.WorkShopsID, id: id },
    });
  }
  getById(id) {
    return this.$http.get<response<any>>(this.urlSvc.Tax.getById, {
      params: { workShopId: this.WorkShopsID, id: id },
    });
  }
  update(model: TaxDto) {
    model.workShopId = this.WorkShopsID;
    return this.$http.put<response<any>>(this.urlSvc.Tax.Edit, model);
  }
}
