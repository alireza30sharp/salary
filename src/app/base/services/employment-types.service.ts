import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiUrlService } from "../../api-url.service";
import { WorkShopsFilter } from "../models";
import { Data, response } from "../../shared/models";
import { EmploymentTypesDto } from "../models/employment-types.model";

@Injectable()
export class EmploymentTypesService {
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService
  ) {}

  getAllEducationEvidences(params?: WorkShopsFilter) {
    let PageNumber: number = 0;
    let PageSize: number = 20;
    return this.$http.get<response<Data<any[]>>>(
      this.urlSvc.EmploymentTypes.GetAllEducationEvidences,
      {
        params: {
          Id: 0,
          EmpType: "",
          WorkShopId: this.getWorkShopsID(),
          PageNumber: PageNumber,
          PageSize: PageSize,
        },
      }
    );
  }
  create(model: EmploymentTypesDto) {
    model.workShopId = this.getWorkShopsID();
    return this.$http.post<response<any>>(
      this.urlSvc.EmploymentTypes.Add,
      model
    );
  }
  delete(id) {
    return this.$http.delete<response<string>>(
      this.urlSvc.EmploymentTypes.Delete,
      { body: { workShopId: this.getWorkShopsID(), id: id } }
    );
  }
  update(model: EmploymentTypesDto) {
    model.workShopId = this.getWorkShopsID();
    return this.$http.put<response<any>>(
      this.urlSvc.EmploymentTypes.Edit,
      model
    );
  }

  getById(id) {
    return this.$http.get<response<any>>(this.urlSvc.EmploymentTypes.getById, {
      params: { workShopId: this.getWorkShopsID(), id: id },
    });
  }
  getWorkShopsID(): number {
    let WorkShopsID = localStorage.getItem("WorkShopsID");
    if (WorkShopsID) {
      return +WorkShopsID;
    } else return null;
  }
}
