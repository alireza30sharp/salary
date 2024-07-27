import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { response } from "../shared/models";
import { Observable, ReplaySubject, Subject, of } from "rxjs";
import { ApiUrlService } from "../api-url.service";
import { clientPrerequisitsInterface } from "../shared/models/clientPrerequisits";
import { catchError, tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class ClientPrerequisitsService {
  private cachedPrerequisits: any;
  constructor(
    private readonly $http: HttpClient,
    private readonly urlSvc: ApiUrlService
  ) {}

  getClientPrerequisits(
    forceRefresh: boolean = false,
    WorkShopId: number = 0
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
            WorkShopId: WorkShopId,
          },
        })
        .pipe(
          tap((prerequisits) => {
            this.cachedPrerequisits = prerequisits; // ذخیره نتایج در کش
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
