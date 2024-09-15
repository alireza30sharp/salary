import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { WorkShopsDto, WorkShopsFilter } from "../models";
import { ApiUrlService } from "../../../../api-url.service";
import { Data, response } from "../../../../shared/models";

@Injectable()
export class WorkShopsService {
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService
  ) {}

  GetAll(filter?: WorkShopsFilter) {
    let params = new HttpParams();
    if (filter.WorkShopName) {
      params = params.set("WorkShopName", filter.WorkShopName);
    }
    if (filter.WorkShopCode) {
      params = params.set("WorkShopCode", filter.WorkShopCode);
    }
    params = params.set("PageNumber", filter.PageNumber);
    params = params.set("PageSize", filter.PageSize);
    return this.$http.get<response<Data<WorkShopsDto[]>>>(
      this.urlSvc.WorkShops.GetWorkShopList,
      { params: params }
    );
  }
  create(model: Partial<WorkShopsDto>) {
    return this.$http.post<response<any>>(this.urlSvc.WorkShops.Add, model);
  }
  delete(id?: any) {
    return this.$http.delete<response<string>>(this.urlSvc.WorkShops.Delete, {
      body: { workShopId: id },
    });
  }
  getById(id?: any) {
    return this.$http.get<response<WorkShopsDto>>(
      this.urlSvc.WorkShops.GetWorkShopById,
      {
        params: { WorkShopId: id },
      }
    );
  }
  update(model: Partial<WorkShopsDto>) {
    return this.$http.put<response<any>>(this.urlSvc.WorkShops.Edit, model);
  }
}
