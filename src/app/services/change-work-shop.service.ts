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
  //
  //-
  benefitDeductionsSource$ = new ReplaySubject<
    Array<WorkShopsOptionsInterFace>
  >(1);
  benefitDeductionsData$ = this.benefitDeductionsSource$.asObservable();
  //-
  private _WorkShopsOptionsSource$ = new ReplaySubject<
    Array<WorkShopsOptionsInterFace>
  >(1);
  WorkShopsOptionsData$ = this._WorkShopsOptionsSource$.asObservable();
  setWorkShopsOptions(list: Array<WorkShopsOptionsInterFace>) {
    this._WorkShopsOptionsSource$.next(list);
  }
  setEmployeList(list: Array<WorkShopsOptionsInterFace>) {
    this.employeListSource$.next(list);
  }
  setBenefitDeductionsList(list: Array<WorkShopsOptionsInterFace>) {
    this.benefitDeductionsSource$.next(list);
  }
  constructor() {}
}
