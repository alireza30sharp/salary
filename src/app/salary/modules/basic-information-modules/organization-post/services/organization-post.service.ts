import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SessionStorage } from "ngx-webstorage";
import { SessionNames } from "../../../../../shared/utilities/session-names";
import { ApiUrlService } from "../../../../../api-url.service";
import { WorkShopsFilter } from "../../work-shops/models";
import { Data, response } from "../../../../../shared/models";
import { OrganizationPostDto } from "../models";
@Injectable()
export class OrganizationPostService {
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
      this.urlSvc.OrganizationPost.GetAllOrganizationPosts,
      {
        params: {
          Id: 0,
          Post: "",
          WorkShopId: this.WorkShopsID,
          PageNumber: PageNumber,
          PageSize: PageSize,
        },
      }
    );
  }
  create(model: Partial<OrganizationPostDto>) {
    model.workShopId = this.WorkShopsID;
    return this.$http.post<response<any>>(
      this.urlSvc.OrganizationPost.Add,
      model
    );
  }
  delete(id) {
    return this.$http.delete<response<string>>(
      this.urlSvc.OrganizationPost.Delete,
      { body: { workShopId: this.WorkShopsID, id: id } }
    );
  }
  update(model: Partial<OrganizationPostDto>) {
    model.workShopId = this.WorkShopsID;
    return this.$http.put<response<any>>(
      this.urlSvc.OrganizationPost.Edit,
      model
    );
  }

  getById(id) {
    return this.$http.get<response<any>>(this.urlSvc.OrganizationPost.getById, {
      params: { workShopId: this.WorkShopsID, id: id },
    });
  }
}
