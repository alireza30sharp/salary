import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiUrlService } from "../../api-url.service";
import { WorkShopsFilter } from "../models";
import { Data, response } from "../../shared/models";
import {
  OrganizationUnitsDto,
  OrganizationUnitsModel,
} from "../../base/models/organization-units.model";
import { SessionNames } from "../../shared/utilities/session-names";
import { SessionStorage } from "ngx-webstorage";
@Injectable()
export class OrganizationUnitsService {
  @SessionStorage(SessionNames.WorkShopsID)
  WorkShopsID: any;
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService
  ) {}

  getAllOrganizationUnits(params?: WorkShopsFilter) {
    let PageNumber: number = 0;
    let PageSize: number = 20;
    return this.$http.get<response<Data<OrganizationUnitsDto[]>>>(
      this.urlSvc.OrganizationUnits.GetAllOrganizationUnits,
      {
        params: {
          WorkShopId: this.WorkShopsID,
          PageNumber: PageNumber,
          PageSize: PageSize,
        },
      }
    );
  }
  create(model: OrganizationUnitsDto) {
    model.workShopId = this.WorkShopsID;
    return this.$http.post<response<any>>(
      this.urlSvc.OrganizationUnits.Add,
      model
    );
  }
  delete(model: OrganizationUnitsModel) {
    model.workShopId = this.WorkShopsID;
    return this.$http.delete<response<string>>(
      this.urlSvc.OrganizationUnits.Delete,
      { body: model }
    );
  }
  update(model: OrganizationUnitsDto) {
    model.workShopId = this.WorkShopsID;
    return this.$http.put<response<any>>(
      this.urlSvc.OrganizationUnits.Edit,
      model
    );
  }

  getById(id) {
    return this.$http.get<response<any>>(
      this.urlSvc.OrganizationUnits.getById,
      {
        params: { workShopId: this.WorkShopsID, id: id },
      }
    );
  }
}
