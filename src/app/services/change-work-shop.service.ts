import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, ReplaySubject, Subject, of } from "rxjs";
import { ApiUrlService } from "../api-url.service";
import { catchError, tap } from "rxjs/operators";
import { WorkShopsOptionsInterFace } from "../shared/interfaces/work-shops-options.interFace";

@Injectable({ providedIn: "root" })
export class ChangeWorkShopsService {
  WorkShopsSource$ = new ReplaySubject<string>(1);
  activeWorkShopsSource$ = this.WorkShopsSource$.asObservable();
  //-
  employeListSource$ = new ReplaySubject<Array<WorkShopsOptionsInterFace>>(1);
  employeListData$ = this.employeListSource$.asObservable();
  //-مزایا
  benefitDeductionsSource$ = new ReplaySubject<
    Array<WorkShopsOptionsInterFace>
  >(1);
  benefitDeductionsData$ = this.benefitDeductionsSource$.asObservable();
  //-کسورات
  deductionsSource$ = new ReplaySubject<Array<WorkShopsOptionsInterFace>>(1);
  deductionsData$ = this.deductionsSource$.asObservable();
  //
  //-مزایا , کسورات
  benefitAndDeductionsSource$ = new ReplaySubject<
    Array<WorkShopsOptionsInterFace>
  >(1);
  benefitAndDeductionsData$ = this.benefitAndDeductionsSource$.asObservable();
  //
  private _WorkShopsOptionsSource$ = new ReplaySubject<
    Array<WorkShopsOptionsInterFace>
  >(1);
  WorkShopsOptionsData$ = this._WorkShopsOptionsSource$.asObservable();
  //---
  organizationUnitsListSource$ = new ReplaySubject<
    Array<WorkShopsOptionsInterFace>
  >(1);
  organizationUnitsData$ = this.organizationUnitsListSource$.asObservable();
  //-
  organizationPostListSource$ = new ReplaySubject<
    Array<WorkShopsOptionsInterFace>
  >(1);
  organizationPostData$ = this.organizationPostListSource$.asObservable();

  //-
  paymentLocationListSource$ = new ReplaySubject<
    Array<WorkShopsOptionsInterFace>
  >(1);
  paymentLocationIdData$ = this.paymentLocationListSource$.asObservable();
  //-
  employmentTypeSource$ = new ReplaySubject<Array<WorkShopsOptionsInterFace>>(
    1
  );
  employmentTypeData$ = this.employmentTypeSource$.asObservable();
  setWorkShopsOptions(list: Array<WorkShopsOptionsInterFace>) {
    this._WorkShopsOptionsSource$.next(list);
  }
  setEmployeList(list: Array<WorkShopsOptionsInterFace>) {
    this.employeListSource$.next(list);
  }
  setBenefitDeductionsList(list: Array<WorkShopsOptionsInterFace>) {
    this.benefitDeductionsSource$.next(list);
  }
  setOrganizationUnits(list: Array<WorkShopsOptionsInterFace>) {
    this.organizationUnitsListSource$.next(list);
  }
  setOrganizationPost(list: Array<WorkShopsOptionsInterFace>) {
    this.organizationPostListSource$.next(list);
  }
  setPaymentLocationId(list: Array<WorkShopsOptionsInterFace>) {
    this.paymentLocationListSource$.next(list);
  }
  setEmploymentTypeData(list: Array<WorkShopsOptionsInterFace>) {
    this.employmentTypeSource$.next(list);
  }
  setDeductions(list: Array<WorkShopsOptionsInterFace>) {
    this.deductionsSource$.next(list);
  }

  setbenefitAndDeductions(list: Array<WorkShopsOptionsInterFace>) {
    this.benefitAndDeductionsSource$.next(list);
  }
  constructor() {}
}
