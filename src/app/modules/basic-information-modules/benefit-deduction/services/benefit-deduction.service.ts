import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SessionStorage } from "ngx-webstorage";
import { ApiUrlService } from "../../../../api-url.service";
import { SessionNames } from "../../../../shared/utilities/session-names";
import { WorkShopsFilter } from "../../work-shops/models";
import { Data, response } from "../../../../shared/models";
import { BenefitDeductionDto } from "../models";

@Injectable()
export class BenefitDeductionService {
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService
  ) {}
  @SessionStorage(SessionNames.WorkShopsID)
  WorkShopsID: any;
  GetAll(params?: WorkShopsFilter) {
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
  create(model: Partial<BenefitDeductionDto>) {
    model.workShopId = this.WorkShopsID;
    return this.$http.post<response<any>>(
      this.urlSvc.BenefitDeduction.Add,
      model
    );
  }
  delete(id) {
    return this.$http.delete<response<string>>(
      this.urlSvc.BenefitDeduction.Delete,
      { body: { workShopId: this.WorkShopsID, id: id } }
    );
  }
  update(model: Partial<BenefitDeductionDto>) {
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
