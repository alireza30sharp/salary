import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiUrlService } from "../../api-url.service";
import { WorkShopsFilter } from "../models";
import { Data, response } from "../../shared/models";
import { OrganizationPostDto } from "../models/organization-post.model";

@Injectable()
export class OrganizationPostService {
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService
  ) {}

  GetAllOrganizationPosts(params?: WorkShopsFilter) {
    let PageNumber: number = 0;
    let PageSize: number = 20;
    return this.$http.get<response<Data<any[]>>>(
      this.urlSvc.OrganizationPost.GetAllOrganizationPosts,
      {
        params: {
          Id: 0,
          Post: "",
          WorkShopId: this.getWorkShopsID(),
          PageNumber: PageNumber,
          PageSize: PageSize,
        },
      }
    );
  }
  create(model: OrganizationPostDto) {
    model.workShopId = this.getWorkShopsID();
    return this.$http.post<response<any>>(
      this.urlSvc.OrganizationPost.Add,
      model
    );
  }
  delete(id) {
    return this.$http.delete<response<string>>(
      this.urlSvc.OrganizationPost.Delete,
      { body: { workShopId: this.getWorkShopsID(), id: id } }
    );
  }
  update(model: OrganizationPostDto) {
    model.workShopId = this.getWorkShopsID();
    return this.$http.put<response<any>>(
      this.urlSvc.OrganizationPost.Edit,
      model
    );
  }

  getById(id) {
    return this.$http.get<response<any>>(this.urlSvc.OrganizationPost.getById, {
      params: { workShopId: this.getWorkShopsID(), id: id },
    });
  }
  getWorkShopsID(): number {
    let WorkShopsID = localStorage.getItem("WorkShopsID");
    if (WorkShopsID) {
      return 1;
    } else return null;
  }
}
