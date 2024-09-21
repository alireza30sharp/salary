import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiUrlService } from "../../api-url.service";
import { WorkShopsFilter } from "../models";
import { Data, response } from "../../shared/models";
import { BenefitDeductionDto } from "../models/benefit-deduction.model";
import { SessionNames } from "../../shared/utilities/session-names";
import { SessionStorage } from "ngx-webstorage";

@Injectable()
export class BenefitDeductionService {
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService
  ) {}
  @SessionStorage(SessionNames.WorkShopsID)
  WorkShopsID: any;
  getGetBenefitsDeductionsList(params?: WorkShopsFilter) {
    let PageNumber: number = 1;
    let PageSize: number = 20;
    return this.$http.get<response<Data<BenefitDeductionDto[]>>>(
      this.urlSvc.BenefitDeduction.GetBenefitsDeductions,
      {
        params: {
          Type: 0,
          PageNumber: PageNumber,
          PageSize: PageSize,
          WorkShopId: this.WorkShopsID,
        },
      }
    );
  }
  createBenefitDeduction(model: BenefitDeductionDto) {
    model.workShopId = this.WorkShopsID;
    return this.$http.post<response<any>>(
      this.urlSvc.BenefitDeduction.Add,
      model
    );
  }
  deleteBenefitDeduction(id) {
    return this.$http.delete<response<string>>(
      this.urlSvc.BenefitDeduction.Delete,
      { body: { workShopId: this.WorkShopsID, id: id } }
    );
  }
  updateBenefitDeduction(model: BenefitDeductionDto) {
    model.workShopId = this.WorkShopsID;
    return this.$http.put<response<any>>(
      this.urlSvc.BenefitDeduction.Edit,
      model
    );
  }

  getById(id) {
    return this.$http.get<response<any>>(this.urlSvc.BenefitDeduction.getById, {
      params: { workShopId: this.WorkShopsID, id: id },
    });
  }
}
