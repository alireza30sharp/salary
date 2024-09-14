import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { SessionStorage } from "ngx-webstorage";
import { ApiUrlService } from "../../../../api-url.service";
import { SessionNames } from "../../../../shared/utilities/session-names";
import { WorkShopsFilter } from "../../../../base/models";
import { Data, MessageSave, response } from "../../../../shared/models";
import { InsuranceTypDto } from "../models/Insurance-type.model";
@Injectable()
export class InsuranceTypeService {
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
    if (filterParams?.Id !== undefined && filterParams.Id !== null) {
      params = params.set("Id", filterParams.Id.toString());
    }
    if (
      filterParams?.InsuranceType !== undefined &&
      filterParams.InsuranceType !== null
    ) {
      params = params.set(
        "InsuranceType",
        filterParams.InsuranceType.toString()
      );
    }

    // در صورت وجود WorkShopsID، آن را نیز به پارامترها اضافه کنید
    if (this.WorkShopsID) {
      params = params.set("WorkShopId", this.WorkShopsID.toString());
    }
    return this.$http.get<response<Data<any[]>>>(
      this.urlSvc.InsuranceType.GetAll,
      { params: params }
    );
  }
  create(model: Partial<InsuranceTypDto>) {
    model.workShopId = this.WorkShopsID;
    return this.$http.post<response<MessageSave>>(
      this.urlSvc.InsuranceType.Add,
      model
    );
  }

  delete(id?: any) {
    return this.$http.delete<response<string>>(
      this.urlSvc.InsuranceType.Delete,
      {
        body: {
          workShopId: this.WorkShopsID,
          id: id,
        },
      }
    );
  }
  getById(id) {
    return this.$http.get<response<any>>(this.urlSvc.InsuranceType.getById, {
      params: { workShopId: this.WorkShopsID, Id: id },
    });
  }
  update(model: InsuranceTypDto) {
    model.workShopId = this.WorkShopsID;
    return this.$http.put<response<any>>(this.urlSvc.InsuranceType.Edit, model);
  }
}
