import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiUrlService } from "../../api-url.service";
import { WorkShopsFilter } from "../models";
import { Data, response } from "../../shared/models";
import { EducationFieldsDto } from "../models/education-fields.model";
import { SessionNames } from "../../shared/utilities/session-names";
import { SessionStorage } from "ngx-webstorage";
@Injectable()
export class EducationFieldsService {
  @SessionStorage(SessionNames.WorkShopsID)
  WorkShopsID: any;
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService
  ) {}

  getEducationFieldsList(params?: WorkShopsFilter) {
    let PageNumber: number = 0;
    let PageSize: number = 20;
    return this.$http.get<response<Data<any[]>>>(
      this.urlSvc.EducationFields.GetAllEducationFields,
      {
        params: {
          Id: 0,
          Field: "",
          WorkShopId: this.WorkShopsID,
          PageNumber: PageNumber,
          PageSize: PageSize,
        },
      }
    );
  }
  createEducationFields(model: EducationFieldsDto) {
    model.workShopId = this.WorkShopsID;
    return this.$http.post<response<any>>(
      this.urlSvc.EducationFields.Add,
      model
    );
  }
  delete(id) {
    return this.$http.delete<response<string>>(
      this.urlSvc.EducationFields.Delete,
      { body: { workShopId: this.WorkShopsID, id: id } }
    );
  }
  update(model: EducationFieldsDto) {
    model.workShopId = this.WorkShopsID;
    return this.$http.put<response<any>>(
      this.urlSvc.EducationFields.Edit,
      model
    );
  }

  getById(id) {
    return this.$http.get<response<any>>(this.urlSvc.EducationFields.getById, {
      params: { workShopId: this.WorkShopsID, id: id },
    });
  }
}
