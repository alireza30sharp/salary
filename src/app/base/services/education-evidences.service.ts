import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiUrlService } from "../../api-url.service";
import { WorkShopsFilter } from "../models";
import { Data, response } from "../../shared/models";
import { EducationEvidencesDto } from "../models/education-evidences.model";

@Injectable()
export class EducationEvidencesService {
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
          WorkShopId: this.getWorkShopsID(),
        },
      }
    );
  }
  createEducationEvidences(model: EducationEvidencesDto) {
    model.workShopId = this.getWorkShopsID();
    return this.$http.post<response<any>>(
      this.urlSvc.EducationEvidences.Add,
      model
    );
  }
  delete(id) {
    return this.$http.delete<response<string>>(
      this.urlSvc.EducationEvidences.Delete,
      { body: { workShopId: this.getWorkShopsID(), id: id } }
    );
  }
  update(model: EducationEvidencesDto) {
    model.workShopId = this.getWorkShopsID();
    return this.$http.put<response<any>>(
      this.urlSvc.EducationEvidences.Edit,
      model
    );
  }

  getById(id) {
    return this.$http.get<response<any>>(
      this.urlSvc.EducationEvidences.getById,
      {
        params: { workShopId: this.getWorkShopsID(), id: id },
      }
    );
  }
  getWorkShopsID(): number {
    let WorkShopsID = localStorage.getItem("WorkShopsID");
    if (WorkShopsID) {
      return +WorkShopsID;
    } else return null;
  }
}
