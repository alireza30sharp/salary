import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { response } from "../shared/models";
import { Observable, ReplaySubject, Subject, of } from "rxjs";
import { ApiUrlService } from "../api-url.service";
import { clientPrerequisitsInterface } from "../shared/models/clientPrerequisits";
import { catchError, delay, tap } from "rxjs/operators";
import { SessionNames } from "../shared/utilities/session-names";
import { SessionStorage } from "ngx-webstorage";
import { ChangeWorkShopsService } from "./change-work-shop.service";
import { DeductionsEnum } from "../shared/models/deductions.enum";
@Injectable({ providedIn: "root" })
export class ClientPrerequisitsService {
  @SessionStorage(SessionNames.WorkShopsID)
  WorkShopsID: any;
  private cachedPrerequisits: any;
  private cachedBenefitDaductionPrerequisites: any;
  private cachedEmployeeClientPrerequisites: any;
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
            Keys: ["WorkShops"],
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

              this._changeWorkShopsService.setWorkShopsOptions(
                WorkShopsOptions
              );
            }
          }),
          catchError(this.handleError<any>("getClientPrerequisits", []))
        );
    }
  }
  //--------------
  getBenefitDaductionClientPrerequisites(forceRefresh: boolean = false) {
    // در غیر این صورت، درخواست جدید را ارسال می‌کنیم
    return this.$http
      .get<any>(
        this.urlSvc.BenefitDeduction.GetBenefitDaductionClientPrerequisites,
        {
          params: {
            WorkShopId: this.WorkShopsID,
          },
        }
      )
      .pipe(
        delay(2000),
        tap((prerequisits) => {
          this.cachedBenefitDaductionPrerequisites = prerequisits; // ذخیره نتایج در کش
          if (prerequisits.isOk && prerequisits.data) {
            let benefitDeductions = prerequisits.data
              .filter((f) => f.type == DeductionsEnum.benefits)
              .map((item) => ({
                label: item.name,
                value: item.id,
              }));
            let deductions = prerequisits.data
              .filter((f) => f.type == DeductionsEnum.deductions)
              .map((item) => ({
                label: item.name,
                value: item.id,
              }));
            this._changeWorkShopsService.setBenefitDeductionsList(
              benefitDeductions
            );
            this._changeWorkShopsService.setDeductions(deductions);
          }
        }),
        catchError(
          this.handleError<any>("cachedBenefitDaductionPrerequisites", [])
        )
      );
  }
  //----------
  getEmployeeClientPrerequisites(forceRefresh: boolean = false) {
    return this.$http
      .get<any>(this.urlSvc.Employees.GetEmployeeClientPrerequisites, {
        params: {
          WorkShopId: this.WorkShopsID,
        },
      })
      .pipe(
        tap((prerequisits) => {
          this.cachedEmployeeClientPrerequisites = prerequisits; // ذخیره نتایج در کش
          if (prerequisits.isOk && prerequisits.data) {
            let employeList = prerequisits.data.map((item) => ({
              label: item.fullName,
              value: item.id,
            }));

            this._changeWorkShopsService.setEmployeList(employeList);
          }
        }),
        catchError(
          this.handleError<any>("cachedEmployeeClientPrerequisites", [])
        )
      );
  }
  //--------------------GetOrganizationUnitClientPrerequisites
  getOrganizationUnitClientPrerequisites(forceRefresh: boolean = false) {
    return this.$http
      .get<any>(
        this.urlSvc.OrganizationUnits.GetOrganizationUnitClientPrerequisites,
        {
          params: {
            WorkShopId: this.WorkShopsID,
          },
        }
      )
      .pipe(
        tap((prerequisits) => {
          if (prerequisits.isOk && prerequisits.data) {
            let list = prerequisits.data.map((item) => ({
              label: item.unitName,
              value: item.id,
            }));

            this._changeWorkShopsService.setOrganizationUnits(list);
          }
        }),
        catchError(this.handleError<any>("setOrganizationUnits", []))
      );
  }
  //-----------GetOrganizationPostClientPrerequisites
  GetOrganizationPostClientPrerequisites(forceRefresh: boolean = false) {
    return this.$http
      .get<any>(
        this.urlSvc.OrganizationPost.GetOrganizationPostClientPrerequisites,
        {
          params: {
            WorkShopId: this.WorkShopsID,
          },
        }
      )
      .pipe(
        tap((prerequisits) => {
          if (prerequisits.isOk && prerequisits.data) {
            let list = prerequisits.data.map((item) => ({
              label: item.organizationPost,
              value: item.id,
            }));

            this._changeWorkShopsService.setOrganizationPost(list);
          }
        }),
        catchError(this.handleError<any>("setOrganizationPost", []))
      );
  }
  //GetPaymentLocationClientPrerequisites
  GetPaymentLocationClientPrerequisites(forceRefresh: boolean = false) {
    return this.$http
      .get<any>(
        this.urlSvc.PaymentLocation.GetPaymentLocationClientPrerequisites,
        {
          params: {
            WorkShopId: this.WorkShopsID,
          },
        }
      )
      .pipe(
        tap((prerequisits) => {
          if (prerequisits.isOk && prerequisits.data) {
            let list = prerequisits.data.map((item) => ({
              label: item.paymentLocation,
              value: item.id,
            }));

            this._changeWorkShopsService.setPaymentLocationId(list);
          }
        }),
        catchError(this.handleError<any>("setPaymentLocationId", []))
      );
  }
  //--
  GetEmploymentTypeClientPrerequisites(forceRefresh: boolean = false) {
    return this.$http
      .get<any>(
        this.urlSvc.EmploymentTypes.GetEmploymentTypeClientPrerequisites,
        {
          params: {
            WorkShopId: this.WorkShopsID,
          },
        }
      )
      .pipe(
        tap((prerequisits) => {
          if (prerequisits.isOk && prerequisits.data) {
            let list = prerequisits.data.map((item) => ({
              label: item.typeText,
              value: item.id,
            }));

            this._changeWorkShopsService.setEmploymentTypeData(list);
          }
        }),
        catchError(this.handleError<any>("setEmploymentTypeData", []))
      );
  }
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
