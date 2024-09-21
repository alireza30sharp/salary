import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SessionStorage } from "ngx-webstorage";
import { SessionNames } from "../../../../../shared/utilities/session-names";
import { ApiUrlService } from "../../../../../api-url.service";
import { Data, response } from "../../../../../shared/models";
import { WorkShopsFilter } from "../../work-shops/models";
import { EmploymentTypesDto } from "../models";
@Injectable()
export class EmploymentTypesService {
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
      this.urlSvc.EmploymentTypes.GetAllEducationEvidences,
      {
        params: {
          Id: 0,
          EmpType: "",
          WorkShopId: this.WorkShopsID,
          PageNumber: PageNumber,
          PageSize: PageSize,
        },
      }
    );
  }
  create(model: Partial<EmploymentTypesDto>) {
    model.workShopId = this.WorkShopsID;
    return this.$http.post<response<any>>(
      this.urlSvc.EmploymentTypes.Add,
      model
    );
  }
  delete(id) {
    return this.$http.delete<response<string>>(
      this.urlSvc.EmploymentTypes.Delete,
      { body: { workShopId: this.WorkShopsID, id: id } }
    );
  }
  update(model: Partial<EmploymentTypesDto>) {
    model.workShopId = this.WorkShopsID;
    return this.$http.put<response<any>>(
      this.urlSvc.EmploymentTypes.Edit,
      model
    );
  }

  getById(id) {
    return this.$http.get<response<any>>(this.urlSvc.EmploymentTypes.getById, {
      params: { workShopId: this.WorkShopsID, id: id },
    });
  }
  getWorkShopsID(): number {
    let WorkShopsID = localStorage.getItem("WorkShopsID");
    if (WorkShopsID) {
      return +WorkShopsID;
    } else return null;
  }
}
