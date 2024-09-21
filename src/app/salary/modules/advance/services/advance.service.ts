import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ApiUrlService } from "../../../../api-url.service";
import { Data, response } from "../../../../shared/models";
import { SessionNames } from "../../../../shared/utilities/session-names";
import { SessionStorage } from "ngx-webstorage";
import { WorkShopsFilter } from "../../../../salary/models";
import { AdvanceDto, AdvanceFilter } from "../models";
@Injectable()
export class AdvanceService {
  @SessionStorage(SessionNames.WorkShopsID)
  WorkShopsID: any;
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService
  ) {}

  //اضافه کردن رکورد
  create(model: AdvanceDto) {
    model.workShopId = this.WorkShopsID;
    return this.$http.post<response<Data<any>>>(this.urlSvc.Advance.Add, model);
  }

  //ویرایش
  update(model: AdvanceDto) {
    model.workShopId = this.WorkShopsID;
    return this.$http.put<response<any>>(this.urlSvc.Advance.Edit, model);
  }

  //حذف
  delete(id) {
    return this.$http.delete<response<string>>(this.urlSvc.Advance.Delete, {
      body: { workShopId: this.WorkShopsID, id: id },
    });
  }

  getById(Id) {
    return this.$http.get<response<any>>(this.urlSvc.Advance.getById, {
      params: { WorkShopId: this.WorkShopsID, Id: Id },
    });
  }

  getAll(filterParams?: WorkShopsFilter, advanceFilter?: AdvanceFilter) {
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

    // در صورت وجود WorkShopsID، آن را نیز به پارامترها اضافه کنید
    if (this.WorkShopsID) {
      params = params.set("WorkShopId", this.WorkShopsID.toString());
    }

    params = params.set("DateFrom", "1403/01/01".toString());
    params = params.set("DateTo", "1405/01/01".toString());

    /*
    if (
      filterParams?.DateFrom !== undefined &&
      filterParams.DateFrom !== null
    ) 
    {
      params = params.set("DateFrom", filterParams?.DateFrom);

    }
    if (
      filterParams?.DateTo !== undefined &&
      filterParams.DateTo !== null
    ) 
    {
      params = params.set("DateTo", filterParams?.DateTo);

    }
    */
    if (
      filterParams?.PriceFrom !== undefined &&
      filterParams.PriceFrom !== null
    ) {
      params = params.set("PriceFrom", filterParams?.PriceFrom);
    }

    if (filterParams?.PriceTo !== undefined && filterParams.PriceTo !== null) {
      params = params.set("PriceTo", filterParams?.PriceTo);
    }

    if (
      filterParams?.EmployeeId !== undefined &&
      filterParams.EmployeeId !== null
    ) {
      params = params.set("EmployeeId", filterParams?.EmployeeId);
    }
    debugger;
    return this.$http.get<response<Data<any[]>>>(this.urlSvc.Advance.GetAll, {
      params: params,
    });
  }
}
