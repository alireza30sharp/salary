import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiUrlService } from "../../api-url.service";
import { WorkShopsFilter } from "../models";
import { Data, response } from "../../shared/models";
import { EducationEvidencesDto } from "../models/education-evidences.model";
import { SessionNames } from "../../shared/utilities/session-names";
import { SessionStorage } from "ngx-webstorage";
@Injectable()
export class EducationEvidencesService {
  @SessionStorage(SessionNames.WorkShopsID)
  WorkShopsID: any;
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService
  ) {}

  getEducationEvidencesList(params?: WorkShopsFilter) {
    let PageNumber: number = 1;
    let PageSize: number = 20;
    return this.$http.get<response<Data<EducationEvidencesDto[]>>>(
      this.urlSvc.EducationEvidences.GetAllEducationEvidences,
      {
        params: {
          Id: 0,
          Evidence: "",
          WorkShopId: this.WorkShopsID,
        },
      }
    );
  }
  createEducationEvidences(model: EducationEvidencesDto) {
    model.workShopId = this.WorkShopsID;
    return this.$http.post<response<any>>(
      this.urlSvc.EducationEvidences.Add,
      model
    );
  }
  delete(id) {
    return this.$http.delete<response<string>>(
      this.urlSvc.EducationEvidences.Delete,
      { body: { workShopId: this.WorkShopsID, id: id } }
    );
  }
  update(model: EducationEvidencesDto) {
    model.workShopId = this.WorkShopsID;
    return this.$http.put<response<any>>(
      this.urlSvc.EducationEvidences.Edit,
      model
    );
  }

  getById(id) {
    return this.$http.get<response<any>>(
      this.urlSvc.EducationEvidences.getById,
      {
        params: { workShopId: this.WorkShopsID, id: id },
      }
    );
  }
}
