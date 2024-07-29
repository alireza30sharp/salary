import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { response } from "../shared/models";
import { Observable, ReplaySubject, Subject, of } from "rxjs";
import { ApiUrlService } from "../api-url.service";
import { clientPrerequisitsInterface } from "../shared/models/clientPrerequisits";
import { catchError, tap } from "rxjs/operators";
import { SessionNames } from "../shared/utilities/session-names";
import { SessionStorage } from "ngx-webstorage";
import { ChangeWorkShopsService } from "./change-work-shop.service";
@Injectable({ providedIn: "root" })
export class ClientPrerequisitsService {
  @SessionStorage(SessionNames.WorkShopsID)
  WorkShopsID: any;
  private cachedPrerequisits: any;
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService,
    private _changeWorkShopsService: ChangeWorkShopsService
  ) {}

  getClientPrerequisits(
    forceRefresh: boolean = false
  ): Observable<response<clientPrerequisitsInterface[]>> {
    if (this.cachedPrerequisits && !forceRefresh) {
      // اگر داده‌ها قبلاً کش شده بود و ما نیازی به درخواست مجدد نداریم، آنها را از کش بازیابی می‌کنیم
      return of(this.cachedPrerequisits);
    } else {
      // در غیر این صورت، درخواست جدید را ارسال می‌کنیم
      return this.$http
        .get<any>(this.urlSvc.clientPrerequisits.GetClientPrerequisits, {
          params: {
            Keys: ["WorkShops", "BenefitDeductions", "Employees"],
            WorkShopId: this.WorkShopsID,
          },
        })
        .pipe(
          tap((prerequisits) => {
            this.cachedPrerequisits = prerequisits; // ذخیره نتایج در کش
            if (prerequisits.isOk && prerequisits.data) {
              let WorkShopsOptions = prerequisits.data
                .find((f) => f.cacheKey == "WorkShops")
                .cacheData.map((item) => ({
                  label: item.workShopName,
                  value: item.id,
                  isDefault: item.isDefault,
                }));
              let employeList = prerequisits.data
                .find((f) => f.cacheKey == "Employees")
                .cacheData.map((item) => ({
                  label: item.fullName,
                  value: item.id,
                }));
              let benefitDeductions = prerequisits.data
                .find((f) => f.cacheKey == "BenefitDeductions")
                .cacheData.map((item) => ({
                  label: item.name,
                  value: item.id,
                }));
              this._changeWorkShopsService.setWorkShopsOptions(
                WorkShopsOptions
              );
              this._changeWorkShopsService.setEmployeList(employeList);
              this._changeWorkShopsService.setBenefitDeductionsList(
                benefitDeductions
              );
            }
          }),
          catchError(this.handleError<any>("getClientPrerequisits", []))
        );
    }
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
