import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { SessionStorage } from "ngx-webstorage";
import { SessionNames } from "../../../../../shared/utilities/session-names";
import { ApiUrlService } from "../../../../../api-url.service";
import { WorkShopsFilter } from "../../work-shops/models";
import { TaxDto } from "../models";
import { Data, response } from "../../../../../shared/models";
@Injectable()
export class TaxService {
  @SessionStorage(SessionNames.WorkShopsID)
  WorkShopsID: any;
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService
  ) {}

  GetAll(filterParams?: WorkShopsFilter) {
    const defaultPageNumber = 1;
    const defaultPageSize = 20;
    // ساختن HttpParams
    let params = new HttpParams();

    // افزودن پارامترها به HttpParams بر اساس مقادیر موجود
    if (
      filterParams?.PageNumber !== undefined &&
      filterParams.PageNumber !== null
    ) {
      params = params.set("PageNumber", filterParams.PageNumber.toString());
    } else {
      params = params.set("PageNumber", defaultPageNumber.toString());
    }

    if (
      filterParams?.PageSize !== undefined &&
      filterParams.PageSize !== null
    ) {
      params = params.set("PageSize", filterParams.PageSize.toString());
    } else {
      params = params.set("PageSize", defaultPageSize.toString());
    }

    if (filterParams?.WorkShopName) {
      params = params.set("WorkShopName", filterParams.WorkShopName);
    }

    if (filterParams?.WorkShopCode) {
      params = params.set("WorkShopCode", filterParams.WorkShopCode);
    }

    // در صورت وجود WorkShopsID، آن را نیز به پارامترها اضافه کنید
    if (this.WorkShopsID) {
      params = params.set("WorkShopId", this.WorkShopsID.toString());
    }

    return this.$http.get<response<Data<TaxDto[]>>>(
      this.urlSvc.Tax.GetAllTaxData,
      { params: params }
    );
  }
  create(model: Partial<TaxDto>) {
    model.workShopId = this.WorkShopsID;
    return this.$http.post<response<any>>(this.urlSvc.Tax.Add, model);
  }

  delete(id?: any) {
    return this.$http.delete<response<string>>(this.urlSvc.Tax.Delete, {
      body: { workShopId: this.WorkShopsID, id: id },
    });
  }
  getById(id) {
    return this.$http.get<response<any>>(this.urlSvc.Tax.getById, {
      params: { workShopId: this.WorkShopsID, id: id },
    });
  }
  update(model: Partial<TaxDto>) {
    model.workShopId = this.WorkShopsID;
    return this.$http.put<response<any>>(this.urlSvc.Tax.Edit, model);
  }
}
